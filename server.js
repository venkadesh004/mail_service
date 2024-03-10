const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

require("dotenv").config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());    

const transporter = nodemailer.createTransport(
  `smtps://${process.env.APP_MAIL}:${process.env.APP_PASSWORD}@smtp.gmail.com`
);

app.post("/sendMail", (req, res) => {

  const { to_mail, main_message, to_name } = req.body;

  const mailOptions = {
    from: `'${process.env.FROM_NAME}' <${process.env.APP_MAIL}>`,
    to: to_mail,
    subject: "Payment Verification for TECHUTSAV2024",
    text: `Hello ${to_name},\n${main_message}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.status(400).json({ err: "Failed to Send Mail" });
    }
    res.status(200).json({ msg: "success" });
  });
});

app.listen(3000, () => {
  console.log("Server started in PORT 3000");
});
