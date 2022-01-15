module.exports =  isBalanced = (inputString) => {
    let stack = []
    for (let i = 0; i < inputString.length; i++) {
        if (inputString[i] == '{') {
            stack.push(inputString[i])
            continue;
        } else if (inputString[i] == '}' && stack.length == 0) {
            return false;
        } else if (inputString[i] == '}') {
            stack.pop()
        }
    }
    return (stack.length == 0)
}


