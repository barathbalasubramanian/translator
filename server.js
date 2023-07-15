
const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
const add = require('./data/savedata')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const subscriptionKey = '79e67b0bf4b3446685d32df08bd0bf91';
const endpoint = 'api.cognitive.microsofttranslator.com';

const translateMessage = async (message, targetLanguage) => {
  try {
    const url = `https://${endpoint}/translate?api-version=3.0&to=${targetLanguage}`;

    const response = await axios.post(url, [{
      Text: message
    }], {
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Ocp-Apim-Subscription-Region': 'southeastasia',
        'Content-Type': 'application/json'
      }
    });

    console.log('Translated message:', response.data[0].translations[0].text);
    return  response.data[0].translations[0].text
  } catch (error) {
    console.error('Error:', error.response.data.error.message);
  }
};


app.post('/', async (req, res) => {
    const message = req.body.text;
    const targetLanguage = req.body.target
    translated = await translateMessage(message, targetLanguage);
    console.log(translated)
    res.json({ trans : translated });

    // save to db
    add(message,translated)

});


const PORT = process.env.PORT || 8080;
app.listen(8080 , () => { console.log(`Running on PORT : ${ PORT } `) })