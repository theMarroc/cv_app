const nodemailer = require("nodemailer");

exports.sendOffer = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message)
        return res.status(400).json("Faltan datos");

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "marcolionel99@gmail.com",
                pass: "gcgqlljtmxstphim"
            }
        });

        const mailOptions = {
            from: email,
            to: "scalzomarco98@gmail.com",
            subject: `Nueva oferta laboral de ${name}`,
            text: message
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json("Oferta enviada con éxito");
    } catch (err) {
        console.error("Error detallado Nodemailer:", err);
        res.status(500).json("Error de correo: " + (err.message || "desconocido"));
    }
};