#!/usr/bin/env node
const axios = require("axios");
const fs = require('fs');
const fileNames = process.argv

let rawdata = fs.readFileSync(fileNames[2]);
let { actions } = JSON.parse(rawdata);
const isBalanced = require("./modules/isBalanced");
const stringHandler = require("./modules/stringHandler");
const interpolateString = require("./modules/interpolateString")
// const stringHandler = require("./modules/stringHandler")
// import { isBalanced } from "./bracketBalancer/isBalanced";


const requestAction = "HTTPRequestAction"
const printAction = "PrintAction"


// const interpolateString = (stringVal, param) => {
//     for (let i = 0; i < param.length; i++) {
//         stringVal = stringVal.replace('}', param[i])
//     }
//     return stringVal
// }

// const index = (obj, i) => (
//     obj && obj[i]
// )

// const stringHandler = (urlString, eventObj) => {
//     let newString = ''
//     let idx = 0
//     let values = []
//     while (idx < urlString.length) {

//         if (urlString[idx] == '{' && urlString[idx + 1] == '{') {
//             let j = idx + 2
//             while (urlString[j] != '}') {
//                 j++
//             }
//             let param = urlString.slice(idx + 2, j)
//             let interpolatedValue = param.split('.').reduce(index, eventObj)
//             values.push(interpolatedValue)
//             idx = j + 1
//         }
//         else {
//             newString += urlString[idx]
//             idx++
//         }
//     }
//     if (values.some(item => item === undefined)) {
//         newString = newString.replace(/}/gi, '')
//         return newString
//     }
//     // return interpolateString(newString, values)
//     return [newString, values]
// }

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
                    eventVal = await getData(url, actionName, eventVal)

                } else {
                    //handle url and peform get request
                    // let interpolatedUrl = stringHandler(url, eventVal)

                    let [inputString , valueArr] = stringHandler(url, eventVal)
                    let interpolatedUrl = interpolateString(inputString, valueArr)
                    eventVal = await getData(interpolatedUrl, actionName, eventVal)
                }
                break;
            case printAction:
                const { options: { message } } = actions[i]
                const balanced = isBalanced(message)
                if (!balanced) {
                    console.log(message)
                } else {
                    // let interpolatedString = stringHandler(message, eventVal)
                    let [inputString, valueArr] = stringHandler(message, eventVal)
                    let interpolatedString = interpolateString(inputString, valueArr)
                    console.log(interpolatedString)
                }
                break;
            default:
                break;
        }
    }

}
actionHandler()









