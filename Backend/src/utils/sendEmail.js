const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {

    const transporter = nodemailer.createTransport({
        service: "Gmail", // You can also use "Outlook", "Yahoo", or a custom SMTP
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: `"Your App Name" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log(` Email sent to ${to}`);
    } catch (err) {
        console.error(" Error sending email:", err);
        throw error;
    }
};

module.exports = sendEmail;
