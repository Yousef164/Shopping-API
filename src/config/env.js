require("dotenv").config();

module.exports = {
    port: process.env.PORT || 5000,

    mongoURL: process.env.MONGO_URL,

    jwtSecret: process.env.JWT_SECRET,

    emailApp: process.env.EMAIL_APP,
    passwordApp: process.env.PASSWORD_APP,
    urlApp: process.env.URL_APP
}