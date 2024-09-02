import nodemailer from "nodemailer"

export const emailSender = {
    async sendEmail(email: string, subject: string, message: string) {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "akky.bauyrzhankyzy@gmail.com",
              pass: "onqj vbju uwxx furg"
            },
          });

        const info = await transporter.sendMail({
            from: "akky.bauyrzhankyzy@gmail.com",
            to: email,
            subject: subject,
            html: message
        })
        return info
    }
}