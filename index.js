#!/usr/bin/env node


const axios = require("axios");
const fs = require('fs');
const { url } = require("inspector");
// const path = require('path');
// let rawdata = fs.readFileSync(path.resolve(__dirname, 'student.json'));
// let student = JSON.parse(rawdata);
// console.log(student);

const fileNames = process.argv

let rawdata = fs.readFileSync(fileNames[2]);
let { actions } = JSON.parse(rawdata);

const requestAction = "HTTPRequestAction"
const printAction = "PrintAction"
// let location = {}
// const urlString = actions[1].options.url
// console.log(urlString)


const interpolateString = (stringVal, param) => {
    console.log(param)
    for (let i = 0; i < param.length; i++) {
        stringVal = stringVal.replace('}', param[i])
    }
    // console.log(stringVal)
    //console.log(param)
    return stringVal
}

const isBalanced = (inputString) => {
    let stack = []
    for (let i = 0; i < inputString.length; i++) {
        if (inputString[i] == '{') {
            stack.push(inputString[i])
            continue;
        } else if (inputString[i] == '}' && stack.length == 0) {
            console.log("empty stack but there is closing bracket")
            return false;
        } else if (inputString[i] == '}') {
            stack.pop()
        }
    }
    return (stack.length == 0)
}

const index = (obj, i) => (
    obj && obj[i]
)

const stringHandler = (urlString, eventObj) => {
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
            console.log("check for undefined")
            console.log(values)
            idx = j + 1
        }
        else {
            newString += urlString[idx]
            idx++
            // console.log(newString, values)
        }
    }
    if (values.some(item => item === undefined)) {
        newString = newString.replace(/}/gi, '')
        // newString.replace(/}/g,'')
        return newString
    }

    return interpolateString(newString, values)
}

const getData = async (link, name = "", eventData) => {
    try {
        const response = await axios.get(
            link
        );
        eventData[name] = response.data
        return eventData
    } catch (err) {
        console.error(err);
    }
}

const actionHandler = async () => {
    var eventVal = {}

    for (let i = 0; i < actions.length; i++) {
        switch (actions[i].type) {
            case requestAction:
                const { options: { url } } = actions[i]
                actionName = actions[i].name
                if (!url.includes('{{')) {
                    //peform normal get request
                    eventVal = await getData(url, actionName, eventVal)

                } else {
                    //handle url and peform get request
                    console.log("enter second get request")
                    console.log(url)
                    let interpolatedUrl = stringHandler(url, eventVal)
                    // console.log(interpolatedUrl)
                    eventVal = await getData(interpolatedUrl, actionName, eventVal)
                }
                break;
            case printAction:
                console.log(eventVal)
                const { options: { message } } = actions[i]
                const balanced = isBalanced(message)
                console.log(balanced)
                if (!balanced) {
                    console.log(message)
                } else {
                    let interpolatedString = stringHandler(message, eventVal)
                    console.log(interpolatedString)
                }
                break;
            default:
                break;
        }
    }
  
}
actionHandler()







