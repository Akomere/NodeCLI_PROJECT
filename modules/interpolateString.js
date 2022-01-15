module.exports = interpolateString = (stringVal, param) => {
    for (let i = 0; i < param.length; i++) {
        stringVal = stringVal.replace('}', param[i])
    }
    return stringVal
}