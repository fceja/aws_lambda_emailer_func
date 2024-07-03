import type { SendMailOptions, SentMessageInfo, Transporter } from "nodemailer";
import { createTransport } from "nodemailer";

// return transporter object with configs for email service provider
const getTransporter = () => {
  const transportData = {
    service: process.env.EMAIL_FORWARDING_SERVICE,
    auth: {
      user: process.env.EMAIL_FORWARDING_SERVICE_ACCOUNT_EMAIL,
      pass: process.env.EMAIL_FORWARDING_SERVICE_ACCOUNT_PASSWORD,
    },
  };

  try {
    const transport = createTransport(transportData);

    return transport;
  } catch (error) {
    console.log("error: ", error);
    return { error: error };
  }
};

// return object with email properties to be sent
const getMailOptions = (emailFormatStr: String) => ({
  to: process.env.RECIPIENT_EMAIL,
  subject: process.env.RECIPIENT_EMAIL_SUBJECT,
  text: `${emailFormatStr}`,
});

// send email
const sendEmail = (
  mailOptions: SendMailOptions,
  transporter: Transporter | any
) => {
  return new Promise<void>((resolve, reject) => {
    transporter.sendMail(
      mailOptions,
      (error: Error | null, info: SentMessageInfo) => {
        if (error) {
          reject(error);
        } else {
          console.log("Email send: " + info.response);
          resolve();
        }
      }
    );
  });
};

export const executeSendEmail = (emailFormatStr: String) => {
  try {
    // init objects to send email
    const mailOptionsObj = getMailOptions(emailFormatStr);
    const transporterObj = getTransporter();

    // invoke send email
    const response = sendEmail(mailOptionsObj, transporterObj);

    return { response: response };
  } catch (error) {
    console.error(error);
    return { response: null };
  }
};
