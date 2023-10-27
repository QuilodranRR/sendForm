const nodemailer = require('nodemailer');
const pdfMake = require('pdfmake/build/pdfmake');
const pdfFonts = require('pdfmake/build/vfs_fonts');

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const enviarMail = async () => {
    // Configurar el transporte de correo
    const config = {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'ricardoquilodran28@gmail.com',
            pass: 'ziaj mkqj cntz fipo' // Asegúrate de usar tu contraseña real
        }
    };

    // Crear el transporte de correo
    const transport = nodemailer.createTransport(config);

    // Construir el PDF con pdfmake
    const pdfContent = {
        content: [
            {
                text: 'Contenido del PDF aquí',
                // Puedes personalizar el contenido como necesites
            },
        ]
    };

    const pdfDoc = pdfMake.createPdf(pdfContent);

    // Generar el PDF y obtener su contenido como un Buffer
    pdfDoc.getBuffer(async (buffer) => {
        // Crear el mensaje de correo
        const mensaje = {
            from: 'ricardo.quilodran24@gmail.com',
            to: 'ricardoquilodran28@gmail.com',
            subject: 'Enviando correo de prueba',
            text: 'Envío de correos desde nodemailer con PDF adjunto.',
            attachments: [
                {
                    filename: 'archivo_adjunto.pdf',
                    content: buffer // Contenido del PDF
                }
            ]
        };

        // Enviar el correo
        try {
            const info = await transport.sendMail(mensaje);
            console.log('Correo enviado:', info);
        } catch (error) {
            console.error('Error al enviar el correo:', error);
        }
    });
};

enviarMail();

