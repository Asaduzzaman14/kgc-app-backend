export const resetPasswordTemplate = (name: string, token: string): string => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border: 1px solid #dddddd;
      border-radius: 8px;
      overflow: hidden;
    }
    .header {
      background-color: #3daa48;
      color: #ffffff;
      padding: 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px;
    }
    .content p {
      font-size: 16px;
      color: #333333;
      margin-bottom: 20px;
    }
    .token {
      display: inline-block;
      font-size: 20px;
      font-weight: bold;
      color: #ffffff;
      background-color: #28a745;
      padding: 10px 20px;
      border-radius: 5px;
      text-align: center;
    }
    .footer {
      background-color: #f9f9f9;
      color: #555555;
      text-align: center;
      padding: 10px;
      font-size: 14px;
      border-top: 1px solid #eeeeee;
    }
    .footer a {
      color: #007bff;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Password Reset Request</h1>
    </div>
    <div class="content">
      <p>Hi, <strong>${name}</strong>,</p>
      <p>You requested to reset your password. Use the code below to reset your password:</p>
      <span class="token">${token}</span>
      <p>This token is valid for <strong>5 minutes</strong>.</p>
      <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
      <p>Thank you,</p>
      <p><strong>Khagrachari Plus</strong></p>
    </div>
     <div class="footer">
      <p>If you have any questions, visit our <a href="https://khagrachariplus.com/">Support Center</a>.</p>
    </div>
  </div>
</body>
</html>
`;
