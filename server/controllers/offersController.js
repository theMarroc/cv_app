exports.sendOffer = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json("Faltan datos");
    }

    try {
        const resendApiKey = process.env.RESEND_API_KEY || "re_YNj9o8cE_FEG1Yse8bbhvAY8whVVKxKsi";
        const contactEmail = process.env.CONTACT_EMAIL || "marcolionel99@gmail.com";

        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${resendApiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                from: "onboarding@resend.dev",
                to: contactEmail,
                subject: `Nueva oferta de trabajo: ${name}`,
                html: `
                    <h3>Nueva Propuesta de Trabajo</h3>
                    <p><strong>De:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Mensaje:</strong></p>
                    <p>${message}</p>
                `
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Error de Resend:", data);
            throw new Error(data.message || "Error al enviar por Resend");
        }

        res.status(200).json("Oferta enviada con éxito");
    } catch (err) {
        console.error("Error final de correo:", err);
        res.status(500).json("Error de correo: " + (err.message || "desconocido"));
    }
};