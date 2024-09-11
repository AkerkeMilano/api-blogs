import nodemailer from "nodemailer"


export const emailSender = {
    sendEmail(email: string, code: string) {
        return new Promise((resolve, reject) => {
            const regHTML = `
            <h1>Thank for your registration</h1>
            <p>To finish registration please follow the link below:
                <a href='https://somesite.com/confirm-email?code=${code}'>complete registration</a>
            </p>
            `; 
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                user: "akky.bauyrzhankyzy@gmail.com",
                pass: "onqj vbju uwxx furg"
                },
            });

            transporter.sendMail({
                from: "akky.bauyrzhankyzy@gmail.com",
                to: email,
                subject: 'Welcome to our website',
                html: regHTML
            }, (error, info) => {
                if(error) return reject(error)
                
                return resolve(info)
            })
        })
    }
}