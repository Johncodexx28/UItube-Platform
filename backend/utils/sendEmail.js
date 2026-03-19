import nodemailer from 'nodemailer';

let transporter = null;

const getTransporter = () => {
  if (transporter) return transporter;

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Email credentials are missing in environment variables (EMAIL_USER/EMAIL_PASS)');
  }

  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  return transporter;
};

// Generate a random 6-digit code
export const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendVerificationEmail = async (to, code) => {
  const mailOptions = {
    from: `"UITube" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Verify Your UITube Account',
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 24px; background: #ffffff;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="font-size: 28px; font-weight: 800; color: #1e293b; margin: 0;">
            UI<span style="color: #18c465;">Tube</span>
          </h1>
        </div>
        <h2 style="font-size: 20px; font-weight: 700; color: #1e293b; margin-bottom: 8px; text-align: center;">
          Verify your email address
        </h2>
        <p style="color: #64748b; font-size: 14px; text-align: center; margin-bottom: 32px;">
          Enter this code to complete your registration:
        </p>
        <div style="background: #f1f5f9; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 32px;">
          <span style="font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #18c465;">
            ${code}
          </span>
        </div>
        <p style="color: #94a3b8; font-size: 12px; text-align: center;">
          This code will expire in <strong>10 minutes</strong>. If you didn't create an account, you can safely ignore this email.
        </p>
      </div>
    `,
  };

  await getTransporter().sendMail(mailOptions);
};

export const sendPasswordResetEmail = async (to, code) => {
  const mailOptions = {
    from: `"UITube" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Reset Your UITube Password',
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 24px; background: #ffffff;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="font-size: 28px; font-weight: 800; color: #1e293b; margin: 0;">
            UI<span style="color: #18c465;">Tube</span>
          </h1>
        </div>
        <h2 style="font-size: 20px; font-weight: 700; color: #1e293b; margin-bottom: 8px; text-align: center;">
          Password Reset Request
        </h2>
        <p style="color: #64748b; font-size: 14px; text-align: center; margin-bottom: 32px;">
          Enter this code to reset your password:
        </p>
        <div style="background: #f1f5f9; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 32px;">
          <span style="font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #e74c3c;">
            ${code}
          </span>
        </div>
        <p style="color: #94a3b8; font-size: 12px; text-align: center;">
          This code will expire in <strong>10 minutes</strong>. If you didn't request a password reset, you can safely ignore this email.
        </p>
      </div>
    `,
  };

  await getTransporter().sendMail(mailOptions);
};
