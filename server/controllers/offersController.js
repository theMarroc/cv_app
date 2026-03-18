const nodemailer = require("nodemailer");

exports.sendOffer = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message)
        return res.status(400).json("Faltan datos");

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_USER || "marcolionel99@gmail.com",
                pass: process.env.SMTP_PASS || "gcgqlljtmxstphim"
            },
            family: 4, 
            logger: true, // Ayuda a debugear si sigue fallando
            debug: true,
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: email,
            to: process.env.CONTACT_EMAIL || "scalzomarco98@gmail.com",
            subject: `Nueva oferta laboral de ${name}`,
            text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json("Oferta enviada con éxito");
    } catch (err) {
        console.error("Error detallado Nodemailer:", err);
        res.status(500).json("Error de correo: " + (err.message || "desconocido"));
    }
};