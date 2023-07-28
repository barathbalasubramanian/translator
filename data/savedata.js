
const userSchema = require('../schemas/model')
const connectToMongoDB = require('../mongodb/mongoconnection')

module.exports = async (text,translatetext, targetLang) => {
    await connectToMongoDB()
    const user = {
        text: text,
        translatetext: translatetext,
        targetLang: targetLang
    }
    console.log(user)
    // await new userSchema(user).save()
  
    console.log('Saved')
}