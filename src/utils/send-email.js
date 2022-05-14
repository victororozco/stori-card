'use strict';
import nodemailer from 'nodemailer';
import { GMAIL_USER, GMAIL_PASS } from '../config';

async function sendEmail({
  from = '"Victor Orozco" <vorozco.dev@gmail.com>',
  to,
  subject,
  text,
  html,
  attachments
}) {
  // let transporter = nodemailer.createTransport({
  //   host: 'email-smtp.us-east-1.amazonaws.com',
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
  //   auth: {
  //     user: 'AWS-user',
  //     pass: 'AWS-pass'
  //   }
  // });

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    requireTLS: true,
    secure: false, // true for 465, false for other ports
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
    attachments
  });

  console.info('Message sent: %s', info.messageId);

  return info;
}

export default sendEmail;
