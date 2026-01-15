/**
 * Email Templates for Astra Wellness
 * Beautiful HTML email templates with brand colors
 */

// Base email wrapper with Astra Wellness branding
export const emailWrapper = (content: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Astra Wellness</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(124, 27, 168, 0.15);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #7c1ba8 0%, #EE93FD 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">
                Astra Wellness
              </h1>
              <p style="margin: 8px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 15px;">
                Modern Mental Healthcare Platform
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-radius: 0 0 12px 12px; border-top: 1px solid #e9ecef;">
              <p style="margin: 0 0 10px 0; color: #6c757d; font-size: 14px;">
                <strong>Astra Wellness</strong><br>
                Transforming Mental Healthcare Together
              </p>
              <p style="margin: 0; color: #adb5bd; font-size: 12px;">
                This is an automated email. Please do not reply to this message.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// ============================================================================
// OTP VERIFICATION EMAIL (After Signup)
// ============================================================================

export function getOTPVerificationTemplate(name: string, otp: string) {
  return {
    subject: "Verify Your Email - Astra Wellness",
    html: emailWrapper(`
      <h2 style="margin: 0 0 20px 0; color: #212529; font-size: 26px; font-weight: 600;">
        Welcome to Astra Wellness, ${name}! 🎉
      </h2>

      <p style="margin: 0 0 20px 0; color: #495057; font-size: 16px; line-height: 1.6;">
        Thank you for joining Astra Wellness. To complete your registration and secure your account, please verify your email address.
      </p>

      <div style="background: linear-gradient(135deg, rgba(124, 27, 168, 0.1) 0%, rgba(238, 147, 253, 0.1) 100%); border-left: 4px solid #7c1ba8; padding: 24px; margin: 30px 0; border-radius: 8px;">
        <p style="margin: 0 0 16px 0; color: #7c1ba8; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
          📧 Your Verification Code
        </p>
        <div style="background-color: #ffffff; border-radius: 8px; padding: 24px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          <p style="margin: 0; font-size: 42px; font-weight: 700; color: #7c1ba8; letter-spacing: 12px; font-family: 'Courier New', monospace;">
            ${otp}
          </p>
          <p style="margin: 12px 0 0 0; color: #868e96; font-size: 13px;">
            This code expires in 10 minutes
          </p>
        </div>
      </div>

      <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 16px; margin: 25px 0; border-radius: 6px;">
        <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.5;">
          <strong>🔒 Security Notice:</strong> Never share this code with anyone. Astra Wellness staff will never ask for your verification code.
        </p>
      </div>

      <p style="margin: 30px 0 0 0; color: #495057; font-size: 16px; line-height: 1.6;">
        If you didn't create an account with Astra Wellness, please ignore this email.
      </p>

      <p style="margin: 30px 0 0 0; color: #495057; font-size: 16px;">
        Best regards,<br>
        <strong style="color: #7c1ba8;">The Astra Wellness Team</strong>
      </p>
    `),
    text: `Welcome to Astra Wellness, ${name}!\n\nYour verification code is: ${otp}\n\nThis code expires in 10 minutes.\n\nIf you didn't create an account with Astra Wellness, please ignore this email.\n\nBest regards,\nThe Astra Wellness Team`,
  };
}

// ============================================================================
// WELCOME EMAIL (After Email Verification)
// ============================================================================

export function getWelcomeTemplate(name: string, loginUrl: string) {
  return {
    subject: "Welcome to Astra Wellness - Let's Get Started! 🚀",
    html: emailWrapper(`
      <h2 style="margin: 0 0 20px 0; color: #212529; font-size: 26px; font-weight: 600;">
        🎉 Welcome Aboard, ${name}!
      </h2>

      <p style="margin: 0 0 20px 0; color: #495057; font-size: 16px; line-height: 1.6;">
        Your email has been successfully verified! We're thrilled to have you join the Astra Wellness community.
      </p>

      <div style="background: linear-gradient(135deg, rgba(124, 27, 168, 0.05) 0%, rgba(238, 147, 253, 0.05) 100%); border: 2px solid #EE93FD; padding: 24px; margin: 30px 0; border-radius: 10px;">
        <h3 style="margin: 0 0 16px 0; color: #7c1ba8; font-size: 18px; font-weight: 600;">
          ✨ What's Next?
        </h3>
        <ul style="margin: 0; padding: 0 0 0 20px; color: #495057; font-size: 15px; line-height: 1.8;">
          <li style="margin-bottom: 8px;">Complete your onboarding to set up your clinic</li>
          <li style="margin-bottom: 8px;">Create consultation rooms for your practice</li>
          <li style="margin-bottom: 8px;">Invite team members to collaborate</li>
          <li style="margin-bottom: 8px;">Start connecting with patients</li>
        </ul>
      </div>

      <table role="presentation" style="margin: 30px 0;">
        <tr>
          <td>
            <a href="${loginUrl}" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #7c1ba8 0%, #EE93FD 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(124, 27, 168, 0.3);">
              Continue to Dashboard →
            </a>
          </td>
        </tr>
      </table>

      <div style="background-color: #d1f2eb; border-left: 4px solid #28a745; padding: 16px; margin: 25px 0; border-radius: 6px;">
        <p style="margin: 0; color: #155724; font-size: 14px; line-height: 1.5;">
          <strong>💡 Pro Tip:</strong> Complete your onboarding to unlock all features including video consultations, AI-powered notes, and EHR integration.
        </p>
      </div>

      <p style="margin: 30px 0 0 0; color: #495057; font-size: 16px; line-height: 1.6;">
        If you have any questions or need assistance, our support team is here to help!
      </p>

      <p style="margin: 30px 0 0 0; color: #495057; font-size: 16px;">
        Best regards,<br>
        <strong style="color: #7c1ba8;">The Astra Wellness Team</strong>
      </p>
    `),
    text: `Welcome to Astra Wellness, ${name}!\n\nYour email has been successfully verified!\n\nWhat's next:\n- Complete your onboarding\n- Create consultation rooms\n- Invite team members\n- Start connecting with patients\n\nLogin here: ${loginUrl}\n\nBest regards,\nThe Astra Wellness Team`,
  };
}

// ============================================================================
// PASSWORD RESET EMAIL
// ============================================================================

export function getPasswordResetTemplate(name: string, otp: string) {
  return {
    subject: "Reset Your Password - Astra Wellness",
    html: emailWrapper(`
      <h2 style="margin: 0 0 20px 0; color: #212529; font-size: 26px; font-weight: 600;">
        Password Reset Request
      </h2>

      <p style="margin: 0 0 20px 0; color: #495057; font-size: 16px; line-height: 1.6;">
        Hi ${name},
      </p>

      <p style="margin: 0 0 20px 0; color: #495057; font-size: 16px; line-height: 1.6;">
        We received a request to reset the password for your Astra Wellness account. Use the code below to reset your password:
      </p>

      <div style="background: linear-gradient(135deg, rgba(124, 27, 168, 0.1) 0%, rgba(238, 147, 253, 0.1) 100%); border-left: 4px solid #7c1ba8; padding: 24px; margin: 30px 0; border-radius: 8px;">
        <p style="margin: 0 0 16px 0; color: #7c1ba8; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
          🔐 Your Password Reset Code
        </p>
        <div style="background-color: #ffffff; border-radius: 8px; padding: 24px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          <p style="margin: 0; font-size: 42px; font-weight: 700; color: #7c1ba8; letter-spacing: 12px; font-family: 'Courier New', monospace;">
            ${otp}
          </p>
          <p style="margin: 12px 0 0 0; color: #868e96; font-size: 13px;">
            This code expires in 10 minutes
          </p>
        </div>
      </div>

      <div style="background-color: #f8d7da; border-left: 4px solid #dc3545; padding: 16px; margin: 25px 0; border-radius: 6px;">
        <p style="margin: 0; color: #721c24; font-size: 14px; line-height: 1.5;">
          <strong>⚠️ Security Alert:</strong> If you didn't request a password reset, please ignore this email and ensure your account is secure. Someone may have entered your email address by mistake.
        </p>
      </div>

      <p style="margin: 30px 0 0 0; color: #495057; font-size: 16px; line-height: 1.6;">
        After entering the code, you'll be able to create a new password for your account.
      </p>

      <p style="margin: 30px 0 0 0; color: #495057; font-size: 16px;">
        Best regards,<br>
        <strong style="color: #7c1ba8;">The Astra Wellness Team</strong>
      </p>
    `),
    text: `Password Reset Request\n\nHi ${name},\n\nWe received a request to reset your password.\n\nYour reset code is: ${otp}\n\nThis code expires in 10 minutes.\n\nIf you didn't request this, please ignore this email.\n\nBest regards,\nThe Astra Wellness Team`,
  };
}

// ============================================================================
// TEAM INVITATION EMAIL
// ============================================================================

export function getTeamInvitationTemplate(
  inviterName: string,
  clinicName: string,
  role: string,
  inviteUrl: string
) {
  return {
    subject: `You've been invited to join ${clinicName} on Astra Wellness`,
    html: emailWrapper(`
      <h2 style="margin: 0 0 20px 0; color: #212529; font-size: 26px; font-weight: 600;">
        🎊 You've Been Invited!
      </h2>

      <p style="margin: 0 0 20px 0; color: #495057; font-size: 16px; line-height: 1.6;">
        <strong>${inviterName}</strong> has invited you to join their team at <strong style="color: #7c1ba8;">${clinicName}</strong> on Astra Wellness.
      </p>

      <div style="background: linear-gradient(135deg, rgba(124, 27, 168, 0.05) 0%, rgba(238, 147, 253, 0.05) 100%); border: 2px solid #EE93FD; padding: 24px; margin: 30px 0; border-radius: 10px;">
        <table role="presentation" style="width: 100%;">
          <tr>
            <td style="padding: 8px 0;">
              <strong style="color: #7c1ba8; font-size: 14px;">Clinic Name:</strong>
            </td>
            <td style="padding: 8px 0;">
              <span style="color: #495057; font-size: 15px;">${clinicName}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0;">
              <strong style="color: #7c1ba8; font-size: 14px;">Your Role:</strong>
            </td>
            <td style="padding: 8px 0;">
              <span style="color: #495057; font-size: 15px;">${role}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0;">
              <strong style="color: #7c1ba8; font-size: 14px;">Invited By:</strong>
            </td>
            <td style="padding: 8px 0;">
              <span style="color: #495057; font-size: 15px;">${inviterName}</span>
            </td>
          </tr>
        </table>
      </div>

      <table role="presentation" style="margin: 30px 0;">
        <tr>
          <td>
            <a href="${inviteUrl}" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #7c1ba8 0%, #EE93FD 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(124, 27, 168, 0.3);">
              Accept Invitation →
            </a>
          </td>
        </tr>
      </table>

      <div style="background-color: #d1f2eb; border-left: 4px solid #28a745; padding: 16px; margin: 25px 0; border-radius: 6px;">
        <p style="margin: 0; color: #155724; font-size: 14px; line-height: 1.5;">
          <strong>✨ What you'll get:</strong><br>
          • Access to ${clinicName}'s consultation rooms<br>
          • Collaborate with team members<br>
          • Conduct video consultations<br>
          • Use AI-powered clinical notes
        </p>
      </div>

      <p style="margin: 30px 0 0 0; color: #495057; font-size: 14px; line-height: 1.6;">
        This invitation will expire in 7 days. If you don't recognize this clinic or didn't expect this invitation, you can safely ignore this email.
      </p>

      <p style="margin: 30px 0 0 0; color: #495057; font-size: 16px;">
        Best regards,<br>
        <strong style="color: #7c1ba8;">The Astra Wellness Team</strong>
      </p>
    `),
    text: `You've been invited to join ${clinicName}!\n\n${inviterName} has invited you to join their team on Astra Wellness.\n\nClinic: ${clinicName}\nYour Role: ${role}\nInvited By: ${inviterName}\n\nAccept invitation: ${inviteUrl}\n\nThis invitation expires in 7 days.\n\nBest regards,\nThe Astra Wellness Team`,
  };
}

// ============================================================================
// TEAM MEMBER CREDENTIALS EMAIL
// ============================================================================

export function getTeamMemberCredentialsTemplate(
  name: string,
  clinicName: string,
  email: string,
  password: string,
  role: string,
  inviterName: string
) {
  const loginUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return {
    subject: `Welcome to ${clinicName} - Your Account Credentials`,
    html: emailWrapper(`
      <h2 style="margin: 0 0 20px 0; color: #212529; font-size: 26px; font-weight: 600;">
        🎉 Welcome to ${clinicName}!
      </h2>

      <p style="margin: 0 0 20px 0; color: #495057; font-size: 16px; line-height: 1.6;">
        Hi ${name},
      </p>

      <p style="margin: 0 0 20px 0; color: #495057; font-size: 16px; line-height: 1.6;">
        <strong>${inviterName}</strong> has created an account for you at <strong style="color: #7c1ba8;">${clinicName}</strong> on Astra Wellness. You can now access the platform using the credentials below.
      </p>

      <div style="background: linear-gradient(135deg, rgba(124, 27, 168, 0.05) 0%, rgba(238, 147, 253, 0.05) 100%); border: 2px solid #EE93FD; padding: 24px; margin: 30px 0; border-radius: 10px;">
        <p style="margin: 0 0 16px 0; color: #7c1ba8; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
          🔐 Your Account Details
        </p>
        <table role="presentation" style="width: 100%;">
          <tr>
            <td style="padding: 8px 0;">
              <strong style="color: #7c1ba8; font-size: 14px;">Clinic Name:</strong>
            </td>
            <td style="padding: 8px 0;">
              <span style="color: #495057; font-size: 15px;">${clinicName}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0;">
              <strong style="color: #7c1ba8; font-size: 14px;">Your Role:</strong>
            </td>
            <td style="padding: 8px 0;">
              <span style="color: #495057; font-size: 15px;">${role}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0;">
              <strong style="color: #7c1ba8; font-size: 14px;">Email:</strong>
            </td>
            <td style="padding: 8px 0;">
              <span style="color: #495057; font-size: 15px; font-family: 'Courier New', monospace;">${email}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0;">
              <strong style="color: #7c1ba8; font-size: 14px;">Password:</strong>
            </td>
            <td style="padding: 8px 0;">
              <span style="color: #495057; font-size: 15px; font-family: 'Courier New', monospace; background-color: #f8f9fa; padding: 4px 8px; border-radius: 4px;">${password}</span>
            </td>
          </tr>
        </table>
      </div>

      <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 16px; margin: 25px 0; border-radius: 6px;">
        <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.5;">
          <strong>🔒 Security Tip:</strong> We recommend changing your password after your first login. You can do this from your account settings.
        </p>
      </div>

      <table role="presentation" style="margin: 30px 0;">
        <tr>
          <td>
            <a href="${loginUrl}/login" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #7c1ba8 0%, #EE93FD 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(124, 27, 168, 0.3);">
              Login to Your Account →
            </a>
          </td>
        </tr>
      </table>

      <div style="background-color: #d1f2eb; border-left: 4px solid #28a745; padding: 16px; margin: 25px 0; border-radius: 6px;">
        <p style="margin: 0; color: #155724; font-size: 14px; line-height: 1.5;">
          <strong>✨ What you can do:</strong><br>
          • Access ${clinicName}'s consultation rooms<br>
          • Collaborate with team members<br>
          • Conduct video consultations<br>
          • Use AI-powered clinical notes
        </p>
      </div>

      <p style="margin: 30px 0 0 0; color: #495057; font-size: 16px; line-height: 1.6;">
        If you have any questions or need assistance, our support team is here to help!
      </p>

      <p style="margin: 30px 0 0 0; color: #495057; font-size: 16px;">
        Best regards,<br>
        <strong style="color: #7c1ba8;">The Astra Wellness Team</strong>
      </p>
    `),
    text: `Welcome to ${clinicName}!\n\nHi ${name},\n\n${inviterName} has created an account for you at ${clinicName} on Astra Wellness.\n\nYour Account Details:\nClinic: ${clinicName}\nRole: ${role}\nEmail: ${email}\nPassword: ${password}\n\nLogin here: ${loginUrl}/login\n\nWe recommend changing your password after your first login.\n\nBest regards,\nThe Astra Wellness Team`,
  };
}

// ============================================================================
// ROOM INVITATION EMAIL (Video Call Invitation)
// ============================================================================

export function getRoomInvitationTemplate(
  roomName: string,
  inviterName: string,
  clinicName: string,
  roomUrl: string,
  customMessage?: string
) {
  return {
    subject: `Video Call Invitation - ${roomName}`,
    html: emailWrapper(`
      <h2 style="margin: 0 0 20px 0; color: #212529; font-size: 26px; font-weight: 600;">
        📹 You've Been Invited to a Video Call
      </h2>

      <p style="margin: 0 0 20px 0; color: #495057; font-size: 16px; line-height: 1.6;">
        <strong>${inviterName}</strong> from <strong style="color: #7c1ba8;">${clinicName}</strong> has invited you to join a telehealth video consultation.
      </p>

      ${
        customMessage
          ? `
      <div style="background: linear-gradient(135deg, rgba(124, 27, 168, 0.05) 0%, rgba(238, 147, 253, 0.05) 100%); border-left: 4px solid #7c1ba8; padding: 20px; margin: 25px 0; border-radius: 8px;">
        <p style="margin: 0; color: #495057; font-size: 15px; line-height: 1.6; font-style: italic;">
          "${customMessage}"
        </p>
      </div>
      `
          : ""
      }

      <div style="background: linear-gradient(135deg, rgba(124, 27, 168, 0.05) 0%, rgba(238, 147, 253, 0.05) 100%); border: 2px solid #EE93FD; padding: 24px; margin: 30px 0; border-radius: 10px;">
        <table role="presentation" style="width: 100%;">
          <tr>
            <td style="padding: 8px 0;">
              <strong style="color: #7c1ba8; font-size: 14px;">Room Name:</strong>
            </td>
            <td style="padding: 8px 0;">
              <span style="color: #495057; font-size: 15px;">${roomName}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0;">
              <strong style="color: #7c1ba8; font-size: 14px;">Healthcare Provider:</strong>
            </td>
            <td style="padding: 8px 0;">
              <span style="color: #495057; font-size: 15px;">${clinicName}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0;">
              <strong style="color: #7c1ba8; font-size: 14px;">Invited By:</strong>
            </td>
            <td style="padding: 8px 0;">
              <span style="color: #495057; font-size: 15px;">${inviterName}</span>
            </td>
          </tr>
        </table>
      </div>

      <table role="presentation" style="margin: 30px 0;">
        <tr>
          <td>
            <a href="${roomUrl}" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #7c1ba8 0%, #EE93FD 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(124, 27, 168, 0.3);">
              Join Video Call →
            </a>
          </td>
        </tr>
      </table>

      <div style="background-color: #d1f2eb; border-left: 4px solid #28a745; padding: 16px; margin: 25px 0; border-radius: 6px;">
        <p style="margin: 0; color: #155724; font-size: 14px; line-height: 1.5;">
          <strong>💡 Before you join:</strong><br>
          • Make sure you have a stable internet connection<br>
          • Allow camera and microphone permissions when prompted<br>
          • Use a quiet, well-lit environment<br>
          • Have any relevant medical information ready
        </p>
      </div>

      <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 16px; margin: 25px 0; border-radius: 6px;">
        <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.5;">
          <strong>🔒 Privacy & Security:</strong> Your video consultation is secure and private. All communications are encrypted end-to-end.
        </p>
      </div>

      <p style="margin: 30px 0 0 0; color: #495057; font-size: 14px; line-height: 1.6;">
        If you have any technical issues or questions, please contact ${clinicName} directly.
      </p>

      <p style="margin: 30px 0 0 0; color: #495057; font-size: 16px;">
        Best regards,<br>
        <strong style="color: #7c1ba8;">The Astra Wellness Team</strong>
      </p>
    `),
    text: `You've been invited to a video call!\n\n${inviterName} from ${clinicName} has invited you to join a telehealth video consultation.\n\n${customMessage ? `Message: "${customMessage}"\n\n` : ""}Room: ${roomName}\nHealthcare Provider: ${clinicName}\nInvited By: ${inviterName}\n\nJoin here: ${roomUrl}\n\nBefore you join:\n- Stable internet connection\n- Allow camera/microphone permissions\n- Quiet, well-lit environment\n- Have medical information ready\n\nYour video consultation is secure and encrypted.\n\nBest regards,\nThe Astra Wellness Team`,
  };
}
