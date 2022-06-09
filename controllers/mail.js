import nodemailer from "nodemailer";

export const sendEmail = async (mailInfo) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "stmp",
      host: "mail.fidelisadvocates.org",
      name: "do_not_reply@fidelisadvocates.org",
      port: 587,
      secureConnection: false,
      auth: {
        user: "do_not_reply@fidelisadvocates.org",
        pass: "PASSIONwithpain@2020",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const info = await transporter.sendMail(mailInfo);
    return info;
  } catch (error) {
    return error;
  }
};
