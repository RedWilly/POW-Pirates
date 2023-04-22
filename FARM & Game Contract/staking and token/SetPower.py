import json
import time
from web3 import Web3
from requests.exceptions import HTTPError

# Function to send transactions with retry mechanism
def send_transaction_with_retry(transaction, retries=5, delay=10, error_delay=180):
    for attempt in range(retries):
        try:
            transaction_hash = w3.eth.sendRawTransaction(transaction.rawTransaction)
            transaction_receipt = w3.eth.waitForTransactionReceipt(transaction_hash)
            return transaction_receipt
        except HTTPError as e:
            if e.response.status_code == 429:
                time.sleep(error_delay)
            elif attempt < retries - 1:
                time.sleep(delay)
            else:
                raise e
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(delay)
                continue
            else:
                raise e
    return None

# Load ABI and contract address
with open("ABI.js") as f:
    ABI = json.load(f)

contract_address = "NFT Staking Contract Address Here"

# Set up web3
w3 = Web3(Web3.HTTPProvider("https://mainnet.ethereumpow.org")) # Replace with your RPC URL

# Load the NFT powers data
with open("nft_powers.json") as f:
    nft_powers = json.load(f)

# Set up the contract instance
contract = w3.eth.contract(address=contract_address, abi=ABI)

# Set your owner address and private key
owner_address = "Your Wallet Address"
owner_private_key = "Your Wallet Private Key"

# Dictionary to store successful and failed NFT updates
success = {}
fail = {}

# Prepare NFT IDs and powers as separate lists
nft_ids = []
nft_powers_list = []
for nft_id, power in nft_powers.items():
    nft_ids.append(int(nft_id))
    nft_powers_list.append(int(power))

# Build the setPower() transaction
transaction = contract.functions.setPower(nft_ids, nft_powers_list).buildTransaction({
    'from': owner_address,
    'gas': 150000,
    'gasPrice': w3.toWei('30', 'gwei'),
    'nonce': w3.eth.getTransactionCount(owner_address),
})

# Sign the transaction
signed_transaction = w3.eth.account.signTransaction(transaction, owner_private_key)

# Send the transaction with retry mechanism
transaction_receipt = send_transaction_with_retry(signed_transaction)

# Check if the transaction was successful
if transaction_receipt and transaction_receipt['status'] == 1:
    print("Successfully set powers for NFTs.")
    success = nft_powers
else:
    print("Failed to set powers for NFTs.")
    fail = nft_powers

# Save successful and failed updates to files
with open("success.json", "w") as f:
    json.dump(success, f)

with open("fail.json", "w") as f:
    json.dump(fail, f)
