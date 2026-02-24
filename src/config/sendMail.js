const nodemailer = require('nodemailer');

exports.sendmail= async(subject,text)=>{
    try{
        const Mail_id = process.env.Mail_id;
        const Mail_pass= process.env.Mail_id_pass;
        const Admin_email = process.env.Admin_email;

        const transporter= await nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:Admin_email,
                pass:Mail_pass
            }
        });

        const mailOption = {
            to:Mail_id,
            from:Admin_email,
            subject:subject,
            text:text
        }

        await transporter.sendMail(mailOption);

        return true;

    }catch(error){
        console.error(error.message)
return false;
    }
}