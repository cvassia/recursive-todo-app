import nodemailer from "nodemailer";

export default async function (context) {
  const payload = context.req.body ? JSON.parse(context.req.body) : {};

  try {
    // configure transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // TLS on port 587
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USERNAME,
      to: payload.email || process.env.SUBMIT_EMAIL,
      subject: "Welcome to Recursive To-Do App 🎉",
      text: "Thanks for signing up!",
      html: "<h1>Welcome!</h1><p>We’re glad you joined!!</p>",
    });

    return context.res.send("Email sent", 200);
  } catch (err) {
    console.error("Email error:", err);
    return context.res.send(`Error: ${err.message}`, 500);
  }
}
