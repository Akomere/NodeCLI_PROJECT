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