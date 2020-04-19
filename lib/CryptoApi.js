const axios = require('axios');
const colors = require('colors');

class CryptoApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.nomics.com/v1/currencies/ticker';
  }

  async getPriceData(coin, cur) {
    try {

      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: cur,
      })
      
      const res = await axios.get(`${this.baseUrl}?key=${this.apiKey}&ids=${coin}&convert=${cur}`)

      let output = '';
      res.data.forEach(coin => {
        output += `Coin: ${coin.symbol.yellow} (${coin.name}) | Price: ${formatter.format(coin.price).green} | Rank: ${coin.rank.blue} \n`;
      });

      return output;

    } catch (err) {
      handleApiError(err)
    }
  }
}

function handleApiError(err) {
  if(err.response.status === 401) {
    throw new Error('Your API key is invalid - Go to https://nomics.com')
  } else if (err.response.status === 404) {
    throw new Error('Your API key is not responding')
  } else {
    throw new Error('Something went wrong')
  }
}

module.exports = CryptoApi;