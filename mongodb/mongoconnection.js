
const mongo = require('./mongoose')

module.exports = async () => {
    await mongo().then( async (mongoose) => {
        try {
            console.log('Connected Successfully !!!')
        }
        finally{
            // mongoose.connection.close()
        }
    })
} 