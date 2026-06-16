
const nodemailer = require('nodemailer')

// step-1: Create a transport
let mail = async (email, username) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER || 'annepuvishal89@gmail.com',
            pass: process.env.GMAIL_APP_PASSWORD || '' // app password
        }

    })
      
    // compose a message
    let message = {
        from: 'annepuvishal89@gmail.com',
        to: email,
        subject: 'Account creation',
        text: `hi ${username} your account creation successfully`,
        html: '<b>registration</b>'
    }

    // step-3: Send a mail
    await transporter.sendMail(message)
    console.log('email sent')
}
module.exports = mail