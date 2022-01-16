module.exports = stringHandler = (urlString, eventObj) => {
    const index = (obj, i) => (
        obj && obj[i]
    )
    let newString = ''
    let idx = 0
    let values = []
    while (idx < urlString.length) {

        if (urlString[idx] == '{' && urlString[idx + 1] == '{') {
            let j = idx + 2
            while (urlString[j] != '}') {
                j++
            }
            let param = urlString.slice(idx + 2, j)
            let interpolatedValue = param.split('.').reduce(index, eventObj)
            values.push(interpolatedValue)
            idx = j + 1
        }
        else {
            newString += urlString[idx]
            idx++
        }
    }
    if (values.some(item => item === undefined)) {
        newString = newString.replace(/}/gi, '')
        
        return [newString, values]
    }
    return [newString, values]
}