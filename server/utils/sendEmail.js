import nodemailer from "nodemailer";

const mailSend = async (email, subject, text) => {
    try {
      let transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "dania.tabesh@gmail.com",
          pass: "Louthebird1"
        }
     });
     const mailOptions = {
      from: 'dania.tabesh@gmail.com', // Sender address
      to: email, // List of recipients
      subject: subject, // Subject line
      text: text, // Plain text body
    };
    transport.sendMail(mailOptions, function(err, info) {
      if (err) {
        //console.log(err)
      } else {
        //console.log(info);
      }
  });
    } catch (error) {
        console.log(error, "email not sent");
    }
};

export default mailSend;


/*
const mailSend = async (email, subject, text) => {
  try {
      let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: "mohamad.abdallah454@gmail.com",
            pass: "hammoudi2000",
            clientId: "390989591773-379s5ktlvomtckeu1rrrn8kn50mtvain.apps.googleusercontent.com",
            clientSecret: "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",
            refreshToken: "1//04pTTrJDcFoE3CgYIARAAGAQSNwF-L9IrkLDkgzLzKuNDiERId19Bk-vzQAwXShqHSIaxb75zBwjWhMPvGR6qhq7EXb7YwADA0vE"
          }
        });
        
        let mailOptions = {
          from: 'mohamad.abdallah454@gmail.com',
          to: email,
          subject: subject,
          text: text
        };
        
        transporter.sendMail(mailOptions, function(err, data) {
          if(err) {
              console.log('Error Occurs: ');
              console.log(err);
          } else {
              console.log('Email sent successfully');
          }
      });
  } catch (error) {
      console.log(error, "email not sent");
  }
};
*/
