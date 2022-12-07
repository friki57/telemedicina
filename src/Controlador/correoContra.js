var nodemailer = require("nodemailer");
const crypto = require("crypto");

module.exports = (email, bd) => {
  console.log("correooooooooooooooooooooooo");
  const auth = {
    user: "telemedicinaunifranz@gmail.com",
    pass: "bgfnivhvouxpwpht",
  };
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    requireTLS: true,
    auth: {
      user: "telemedicinaunifranz@gmail.com",
      pass: "bgfnivhvouxpwpht",
    },
  });
  bd.cruds.crudUsuario.buscar({correo:{tipo: 'igual',valor: email}}, (usuario)=>
  {

    var contra = usuario[0].contra
      var mailOptions = {
        from: auth.user,
        to: email,
        subject: "Recuperación de contraseña en Telemedicina.com",
        text:
          "Tu contraseña es: " +
          contra,
      };
    
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
  })
};
