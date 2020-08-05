const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');


const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);



const generateHTML = (filename, options = {}) => {
  const html = pug.renderFile(`${__dirname}/../views/email/${filename}.pug`, options);
  const inlined = juice(html);
  return inlined;
};

exports.send = async (options) => {
  const html = generateHTML(options.filename, options);
  const text = htmlToText.fromString(html);

  const mailOptions = {
    from: `ibrahim masry <noreply@ibrahimasry.com>`,
    to: options.user.email,
    subject: options.subject,
    html,
    text
  };
  return sgMail.send(mailOptions);
};
