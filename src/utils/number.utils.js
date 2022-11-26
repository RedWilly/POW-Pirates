function eToNumber(num, decimals) {
    let sign = "";
    if ((num += "").charAt(0) == "-") {
        num = num.substring(1);
        sign = "-"
    }
    let arr = num.split(/[e]/gi);
    let dot = (0.1).toLocaleString().substr(1, 1);
    if (arr.length < 2) {
        return sign + num.substring(0, num.indexOf(dot) + 1 + (decimals ? decimals : num.length));
    }

    let n = arr[0],
        exp = +arr[1],
        w = (n = n.replace(/^0+/, "")).replace(dot, ""),
        pos = n.split(dot)[1] ? n.indexOf(dot) + exp : w.length + exp,
        L = pos - w.length,
        // eslint-disable-next-line no-undef
        s = "" + BigInt(w);
    w =
        exp >= 0
            ? L >= 0
                ? s + "0".repeat(L)
                : r()
            : pos <= 0
                ? "0" + dot + "0".repeat(Math.abs(pos)) + s
                : r();
    L = w.split(dot);
    if ((L[0] == 0 && L[1] == 0) || (+w == 0 && +s == 0)) {
        w = 0;
    }

    return sign + w.substring(0, w.indexOf(dot) + decimals ? decimals : w.length);

    function r() {
        return w.replace(new RegExp(`^(.{${pos}})(.)`), `$1${dot}$2`);
    }
}

export default eToNumber;