const axios = require('axios');
const { NotExtended } = require('http-errors');

const getCordinate = async (address) => {
    try {

        const token = process.env.MAPBOX_KEY
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            address
          )}.json?access_token=${token}`
        const res = await axios.get(url);
        const data = res.data.features


        if(data.length === 0){
            throw new Error("There is no result for your search")
        }

        // console.log(data[0])
        return data[0]

    } catch (err){ // err is an Error object
        throw err
    }
}

module.exports = getCordinate