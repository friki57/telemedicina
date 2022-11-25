var nodemailer = require('nodemailer');
const crypto = require('crypto');

module.exports = (email,bd,id)=>
{
console.log("correooooooooooooooooooooooo")
  const auth = {
    user: 'telemedicinaunifranz@gmail.com',
    pass: 'bgfnivhvouxpwpht'
  }
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    requireTLS: true,
    auth: {
        user: 'telemedicinaunifranz@gmail.com',
        pass: 'bgfnivhvouxpwpht'
    }
  });
  // import generateHash from 'random-hash';
  // const hash =  generateHash({ length: 6 });
  var hash = crypto.randomBytes(3).toString('hex');
  console.log(hash)
  var mailOptions = {
    from: auth.user,
    to: email,
    subject: 'Verifica tu dirección de correo en Telemedicina',
    text: 'Ingrese la clave para verificar su correo en el sitio de telemdicina: ' + hash
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    //   bd.cruds.crudUsuario.modificar(id,{hash, nombres:"luis"},()=>
    //   {
    //     console.log('hash ingresado:' + hash)
    //   });
    }
  });
  return hash;
}
