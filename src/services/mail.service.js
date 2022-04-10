import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SMTP_HOST,
  port: process.env.EMAIL_SMTP_PORT,
  secure: process.env.NODE_ENV !== 'development',
  auth: {
    user: process.env.EMAIL_SMTP_USERNAME,
    pass: process.env.EMAIL_SMTP_PASSWORD,
  },
});
const sendActivationMail = async (to, link) => {
  await transporter.sendMail({
    from: process.env.EMAIL_SMTP_USERNAME,
    to: to,
    subject: 'Activate account ' + process.env.API_URL,
    text: '',
    html: `
      <div>
       <h1>Click to the link</h1>
       <a href="${link}">${link}</a>
      </div>
    
    `,
  });
};

export default sendActivationMail;
