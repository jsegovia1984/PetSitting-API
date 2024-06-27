const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const sendMail = async (email, subject, text) => {
    try {
	console.log(email + subject + text);
        console.log(process.env.MAIL_USER + process.env.MAIL_PW)











const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'eleonore.denesik@ethereal.email',
        pass: 'ChxmaQ94wj6nQFVXMu'
    }
});













   //     const transporter = nodemailer.createTransport({
///            service: 'gmail',
     //       host: "smtp.gmail.com",
       //     port: 465,
         //   secure: true,
          //  auth: {
            ///    user: process.env.MAIL_USER,
          //      pass: process.env.MAIL_PW,
           // },

   //         tls: {
//		 rejectUnauthorized: false
//	    },

 	//	  connectionTimeout: 30000, // 30 segundos
	//	  greetingTimeout: 30000, // 30 segundos
	//	  socketTimeout: 30000 // 30 segundos

//        });


        const mailOptions = {
            from: process.env.MAIL_USER2,
            to: email,
            subject,
            text,
        };
    //    console.log(mailOptions)

        const info = await transporter.sendMail(mailOptions);

	transporter.sendMail(mailOptions, (error, info) => {
	  if (error) {
	    console.error('❌ Error:', error.message);
	  } else {
	    console.log('✅ Email sent:', info.response);
	  }
	});

        console.log(`Email sent: ${info.response}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    sendMail,
};
