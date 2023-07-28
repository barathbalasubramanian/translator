const mongoose = require('mongoose');

const reqtsring = {
    type:String,
    required: true
}

const userSchema = mongoose.Schema( {
    text: reqtsring,
    translatetext: reqtsring,
    targetLang: reqtsring
})

module.exports = mongoose.model('users', userSchema)
