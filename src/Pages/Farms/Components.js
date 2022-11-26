import useIsMountedRef from "../../Hooks/useIsMounted";
import {useContext, useEffect, useState} from "react";
import {StateContext} from "../../Contexts/StateContext";
import {toast} from "react-toastify";
import PropTypes from "prop-types";
import {
    Alert,
    Button, Dialog,
    DialogContent, DialogTitle,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    OutlinedInput
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import {formatLongNumber} from "./index";
import {ethers} from "ethers";
import eToNumber from "../../utils/number.utils";
/* global BigInt */


export const UnStakeDialog = ({ open, setOpen,balance, decimals,withdraw }) => {
    const stateContext = useContext(StateContext);
    const isMounted = useIsMountedRef();
    const [value, setValue] = useState("0");
    const [useMax, setUseMax] = useState(false);
    const [busy, setBusy] = useState(false);
    const [inError, setInError] = useState("");
    const [waitingForNetwork, setWaitingForNetwork] = useState(false);

    useEffect(() => {
        if (
            !useMax &&
            Number(value) * 10 ** decimals > Number(balance)
        ) {
            setInError("Exceeded Balance");
        } else {
            setInError(undefined);
        }
    }, [value, useMax]);

    const handleUnstake = async () => {
        setBusy(true);
        const amount = useMax
            ? balance
            : ethers.BigNumber.from(BigInt(value * 10 ** decimals));
        const signer = window.ethereum ? new ethers.providers.Web3Provider(window.ethereum).getSigner() : null;
        withdraw(signer, amount)
            .then(() => {
                setBusy(false);
                setOpen(false);
                toast.success("UnstakedStaked successfully");
            })
            .catch((e) => {
                setBusy(false);
                setOpen(false);
                toast.error(e.message);
            });
    };
    return (
        <AmountDialog
            decimals={decimals}
            title={waitingForNetwork ? "Reading On Chain Data..." : "UnStake"}
            value={value}
            inError={inError}
            maxDescription="Current Stake"
            maxAmount={balance}
            setUseMax={setUseMax}
            setValue={setValue}
            busy={busy}
            handleAction={handleUnstake}
            open={open}
            setOpen={setOpen}
        />
    );
}

export const StakeDialog = ({ open, setOpen,balance, decimals,deposit }) => {
    const stateContext = useContext(StateContext);
    const isMounted = useIsMountedRef();
    const [value, setValue] = useState("0");
    const [useMax, setUseMax] = useState(false);
    const [busy, setBusy] = useState(false);
    const [inError, setInError] = useState("");
    const [waitingForNetwork, setWaitingForNetwork] = useState(false);

    useEffect(() => {
        if (
            !useMax &&
            Number(value) * 10 ** decimals > Number(balance)
        ) {
            setInError("Exceeded Balance");
        } else {
            setInError(undefined);
        }
    }, [value, useMax]);

    const handleDeposit = async () => {
        setBusy(true);
        const amount = useMax
            ? balance
            : ethers.BigNumber.from(BigInt(value * 10 ** decimals));
        const signer = window.ethereum ? new ethers.providers.Web3Provider(window.ethereum).getSigner() : null;
        deposit(signer, amount)
            .then(() => {
                setBusy(false);
                setOpen(false);
                toast.success("Staked successfully");
            })
            .catch((e) => {
                setBusy(false);
                setOpen(false);
                toast.error(e.message);
            });
    };

    return (
        <AmountDialog
            decimals={decimals}
            title={waitingForNetwork ? "Reading On Chain Data..." : "Stake"}
            value={value}
            inError={inError}
            maxAmount={balance}
            setUseMax={setUseMax}
            setValue={setValue}
            busy={busy}
            handleAction={handleDeposit}
            open={open}
            setOpen={setOpen}
        />
    );
};

StakeDialog.prototype = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    decimals: PropTypes.number.isRequired,
    setNotification: PropTypes.func.isRequired,
};
/**
 *
 * @param title
 * @param decimals
 * @param inError
 * @param value
 * @param setValue
 * @param setUseMax
 * @param maxAmount
 * @param setOpen
 * @param open
 * @param handleAction
 * @param busy
 * @returns {JSX.Element}
 * @constructor
 */
export const AmountDialog = ({
                                 title,
                                 decimals,
                                 inError,
                                 value,
                                 setValue,
                                 maxDescription,
                                 setUseMax,
                                 maxAmount,
                                 setOpen,
                                 open,
                                 handleAction,
                                 busy,
                             }) => {
    return (
        <Dialog
            fullWidth
            maxWidth={"xs"}
            open={open}
            onClose={() => {
                setOpen(false);
                setValue("0");
            }}
            sx={{
                backgroundColor: "#27144555",
                "& .MuiDialog-paper": {
                    backgroundColor: "#271445",
                }
            }}
            PaperProps={{
                style: {
                    backgroundColor: "#271445",
                },
            }}
        >
            <DialogTitle
                sx={{
                    backgroundColor: "#271445",
                }}
            >{title}</DialogTitle>

            <DialogContent dividers sx={{
                backgroundColor: "#271445",
            }}>
                <Alert
                    severity={"info"}
                    style={{
                        marginTop: 6,
                        marginBottom: 24,
                    }}
                >{(maxDescription ? maxDescription  : 'Current Balance') + `: ${
                    maxAmount ? ethers.utils.formatUnits(maxAmount, Number(decimals)) : "0"
                }`}</Alert>
                <FormControl
                    error={!!inError}
                    fullWidth
                    color={
                        "primary"
                    } /*className={clsx(classes.margin, classes.textField)}*/
                    variant="outlined"

                >
                    <InputLabel>Amount</InputLabel>
                    <OutlinedInput
                        label={"Amount"}
                        type={"number"}
                        fullWidth
                        value={value}
                        onChange={(event) => {
                            setValue(
                                Number(event.target.value) || Number(event.target.value) === 0
                                    ? event.target.value
                                    : value
                            );
                            setUseMax(false);
                        }}
                        onFocus={() => {
                            if (value == 0) {
                                setValue("");
                            }
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <Button
                                    style={{ color: "#fe009c" }}
                                    onClick={() => {
                                        setValue("" + ethers.utils.formatUnits(maxAmount, Number(decimals)));
                                        setUseMax(true);
                                    }}
                                >
                                    Use Max
                                </Button>
                            </InputAdornment>
                        }
                        labelWidth={64}
                    />
                </FormControl>
                {inError && (
                    <Alert severity={"error"} style={{ marginTop: 6, marginBottom: 6 }}>
                        {inError}
                    </Alert>
                )}
                <Grid container spacing={2} style={{ marginTop: 6 }}>
                    <Grid item xs={6}>
                        <Button
                            variant={"contained"}
                            fullWidth
                            color={"primary"}
                            disabled={busy || !!inError || !value || Number(value) === 0}
                            onClick={handleAction}
                        >
                            {busy && <CircularProgress size={24}/>}
                            {title}
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            color={"primary"}
                            variant={"contained"}
                            fullWidth
                            disabled={busy}
                            onClick={() => {
                                setOpen(false);
                                setValue("0");
                            }}
                            text={"Cancel"}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

AmountDialog.prototype = {
    title: PropTypes.string.isRequired,
    decimals: PropTypes.number.isRequired,
    inError: PropTypes.string.isRequired || PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    setUseMax: PropTypes.func.isRequired,
    maxAmount: PropTypes.string.isRequired,
    setOpen: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    handleAction: PropTypes.func.isRequired,
    busy: PropTypes.bool.isRequired,
};


