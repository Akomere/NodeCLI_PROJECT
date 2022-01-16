//this function peforms get request of new event data and updates the event data object with the action name as key

const axios = require("axios");

module.exports = getData = async (link, name = "", eventData) => {
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