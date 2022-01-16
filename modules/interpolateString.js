//this function inserts values of refrenced event data object properties back into input message or url string with '}' place holders

module.exports = interpolateString = (stringVal, param) => {
    for (let i = 0; i < param.length; i++) {
        stringVal = stringVal.replace('}', param[i])
    }
    return stringVal
}