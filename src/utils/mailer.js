const nodemailer = require("nodemailer");
const { emailApp, passwordApp, urlApp } = require("../config/env");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailApp,
    pass: passwordApp,
  },
});

async function sendVerificationEmail(userEmail, username, token) {
  const link = `${urlApp}/verify-email?token=${token}`;

  const mailOptions = {
    from: emailApp,
    to: userEmail,
    subject: "Verify your email",
    html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Welcome, ${username} 👋</h2>
      <p>Click the button below to verify your email address:</p>
      <a href="${link}" 
         style="background-color: #4CAF50; color: white; padding: 10px 20px; 
                text-decoration: none; border-radius: 5px;">
        Verify Email
      </a>
      <p>If the button doesn’t work, copy and paste this link into your browser:</p>
      <p><a href="${link}">${link}</a></p>
    </div>`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendVerificationEmail };
