export const formatBytes = (bytes: number, decimals = 2): string => {
    if (bytes == 0) return "0";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export const formatTokens = (amount: string, decimalPoints = 4): string => {
    const decimals = 18;
    const tenPower = BigInt("1000000000000000000");
    const value = BigInt(amount);
    let fraction = (value % tenPower).toString();
    while (fraction.length < decimals) {
        fraction = "0" + fraction;
    }

    // Strip trailing 0
    // @ts-ignore
    fraction = fraction.match(/^([0-9]*[1-9]|0)(0*)/)[1];

    const whole = (value / tenPower).toString();

    // TODO: Should round better last decimal
    return whole + "." + fraction.substring(0, decimalPoints);
};

export const formatToGb = (amount: number): number => {
    const oneGb = BigInt(1000000000);
    const value = BigInt(amount);
    const numberValue = parseInt((value / oneGb).toString());
    return numberValue;
};
