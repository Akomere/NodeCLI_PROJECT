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
const printActioin = "PrintAction"
// let location = {}
// const urlString = actions[1].options.url
const baseUrl = ""
let requestObject = {}


const getData = async (link) => {

    try {
        const response = await axios.get(
            link
        );

        location = response.data
        // console.log(location)
        
        return response.data
    } catch (err) {
        console.error(err);
    }
}

const actionHandler = async () => {
    for (let i = 0; i <= actions.length - 1; i++)
        switch (actions[i].type) {
            case requestAction:
                const { options: { url } } = actions[i]
                // console.log(url)
                let response = await getData(url)
                // console.log(response)

                eval(`${actions[i].name}` + " = response");
                let myObject = {}
                
                console.log(eval(`${actions[i].name}`));


                const { longitude, latitude } = location
                // console.log(location)
                break;
            case printActioin:
                console.log("PRINT")
                break;

            default:
                break;
        }
}


actionHandler()


///////////////////////////////////
//split the url at the ? val

// for (let idx = 0; idx < urlString.length; idx++){
//     if (urlString[idx] == '{' && urlString[idx+1] == '{'  )
//     console.log("json object")

// }


