const axios = require('axios').default;

async function sendApplication(formData) {
    try {
        //const response = await axios.get('http://localhost:5075/applications');
        const response = await axios.post('http://localhost:5075/applications', formData);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {sendApplication}