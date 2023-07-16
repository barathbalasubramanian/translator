
const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
const add = require('./data/savedata')
const connectToMongoDB = require('./mongodb/mongoconnection')
const userSchema = require('./schemas/model')


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


app.post('/' , async (req, res) => {
    const message = req.body.text;
    const targetLanguage = req.body.target
    
    await connectToMongoDB()
    try {
      const results = await userSchema.find({text: message });
      if (results.length) {
        console.log(results[0].translatetext , '  Already there')
        res.json({ trans : results[0].translatetext });
      }
      else {
        console.log('yet to save')
        // save to db
        translated = await translateMessage(message, targetLanguage);
        add(message,translated)
        res.json({ trans : translated });
      }
    } catch (error) {
      console.error(error);
    }
});


const PORT = process.env.PORT || 8080;
app.listen(8080 , () => { console.log(`Running on PORT : ${ PORT } `) })