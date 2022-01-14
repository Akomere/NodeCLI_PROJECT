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
const urlString = actions[1].options.url
console.log(urlString)
const baseUrl = ""
let requestObject = {}
var eventVal = {}




const index = (obj, i) => (
    obj[i]
)

const urlHandler = () => {

    let newString = ''
    let idx = 0
    let words = []

    while (idx < urlString.length) {
        if (urlString[idx] == '{' && urlString[idx + 1] == '{') {
            let j = idx + 2
            while (urlString[j] != '}') {
                j++
            }
            console.log(urlString[j])

            let param = urlString.slice(idx + 2, j)
            let list = param.split('.')


            words.push(list)
            console.log(words)
            idx = j + 2



        }
        else {
            newString += urlString[idx]
            idx++
            console.log(newString)
        }


    }
}

const getData = async (link, name = "") => {

    // if (eventVal.length !== 0) {
    //     eval(name + " = eventVal.name");
    // }
    try {
        const response = await axios.get(
            link
        );
        eventVal[name] = response.data

        let result = 'location.longitude'.split('.').reduce(index, eventVal)
        console.log(result)


        // console.log("event")
    } catch (err) {
        console.error(err);
    }
}

const actionHandler = async () => {
    for (let i = 0; i < 1; i++)
        switch (actions[i].type) {
            case requestAction:
                const { options: { url } } = actions[i]
                actionName = actions[i].name
                getData(url, actionName)
                console.log(eventVal)

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

    console.log(eventVal)

}


actionHandler()


///////////////////////////////////
//split the url at the '?' val to get base url
//use brackets to store object strings and split them at '.'
//






