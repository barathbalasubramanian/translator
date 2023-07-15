
const userSchema = require('../schemas/model')
const connectToMongoDB = require('../mongodb/mongoconnection')

module.exports = async (text,translatetext) => {
    await connectToMongoDB()
    const user = {
        text: text,
        translatetext: translatetext
    }
    await new userSchema(user).save()
  
    console.log('Saved')
}