#!/usr/bin/env node

const fs = require('fs');
const fileNames = process.argv

let rawdata = fs.readFileSync(fileNames[2]);
let { actions } = JSON.parse(rawdata);
const isBalanced = require("./modules/isBalanced");
const stringHandler = require("./modules/stringHandler");
const interpolateString = require("./modules/interpolateString")
const getData = require("./modules/getData")
const requestAction = "HTTPRequestAction"
const printAction = "PrintAction"

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









