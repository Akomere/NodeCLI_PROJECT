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

let requestObject = {}





const index = (obj, i) => (
    obj[i]
)
const insertParam = (stringValue, paramArr) => {
    let idx = 0
    let i = 0;

    while (i < stringValue.length) {
        if (stringValue[i] === '=') {
            //insert string
            stringValue = [stringValue.slice(0, i+1), paramArr[idx], stringValue.slice(i+1)].join('');
            idx++
        }
        i++
    }

    return stringValue
}

const urlHandler = (urlString, eventObj) => {
    let newString = ''
    let idx = 0
    let values = []
    while (idx < urlString.length) {
        if (urlString[idx] == '{' && urlString[idx + 1] == '{') {
            let j = idx + 2
            if (urlString[j] === '}' && urlString[j + 1] != '}') {
                let emptyString = ""
                return emptyString
            }
            while (urlString[j] != '}') {
                j++
            }
            let param = urlString.slice(idx + 2, j)
            let interpolatedValue = param.split('.').reduce(index, eventObj)
            values.push(interpolatedValue)
            // console.log(words)
            idx = j + 2
        }
        else {
            newString += urlString[idx]
            idx++
            // console.log(newString, values)
        }
    }
    return insertParam(newString, values)
}

const getData = async (link, name = "", eventData) => {

    // if (eventVal.length !== 0) {
    //     eval(name + " = eventVal.name");
    // }
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
    for (let i = 0; i < 2; i++) {
        switch (actions[i].type) {
            case requestAction:
                const { options: { url } } = actions[i]
                actionName = actions[i].name
                if (i === 0) {
                    //peform normal get request
                    eventVal = await getData(url, actionName, eventVal)

                } else {
                    //handle url and peform get request
                    let interpolatedUrl = urlHandler(url, eventVal)
                    console.log(interpolatedUrl)
                    eventVal = await getData(interpolatedUrl, actionName, eventVal)
                }


                // const {longitude} = location
                // console.log(actions[i+1])

                // const myUrl = actions[1].options.url
                // // console.log(myUrl)
                // try {
                //     const response = await axios.get(
                //         myUrl
                //     );
                //     result = response.data
                //     console.log(result) 

                // } catch (err) {
                //     console.error(err);
                // }
                // const { longitude, latitude } = location
                // console.log(location)
                break;
            case printAction:
                console.log("PRINT")
                break;

            default:
                break;
        }
    }
    // console.log(eventVal)
}


actionHandler()


///////////////////////////////////
//split the url at the '?' val to get base url
//use brackets to store object strings and split them at '.'
//






