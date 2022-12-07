const axios = require('axios');

export const handler = async (event) => {
    const response = await axios({
      method: 'get',
      url: 'https://www.edx.org/page-data/learn/machine-learning/page-data.json',
      responseType: 'json'
    });
    return {
        statusCode: 200,
        body: JSON.stringify(response)
    }
}
