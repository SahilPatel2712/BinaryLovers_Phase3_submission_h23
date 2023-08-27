const nodemailer = require('nodemailer');

// Function to send an email
const sendEmail = async () => {
  try {
    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Replace with your email service provider
      auth: {
        user: 'ayushdadhaniya27@gmail.com', // Replace with your email address
        pass: 'dpuxcelfkkfyeyfy', // Replace with your email password or an app-specific password
      },
    });

    // Email content
    const mailOptions = {
      from: 'ayushdadhaniya27@gmail.com', // Sender's email address
      to: 'ayushdadhaniya27@gmail.com', // Recipient's email address
      subject: 'Test Email', // Subject of the email
      text: 'This is a test email sent using Nodemailer.', // Plain text body
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Export the function
module.exports = sendEmail;
