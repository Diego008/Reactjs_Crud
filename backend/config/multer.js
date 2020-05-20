const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const storageTypes = {
    local: multer.diskStorage({
        //destino da imagem
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', 'tmp', 'uploads'))
        },

        //criando hash no prefixo do nome do arquivo para evitar arquivos duplicados que podem ser subidos
        //juntos
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(err);

                file.key = `${hash.toString('hex')}-${file.originalname}`.split(" ").join("");

                cb(null, file.key)
            })
        }
    }),
}

module.exports = {
    dest: path.resolve(__dirname, '..', 'tmp', 'uploads'),
    storage: storageTypes['local'],

    //definindo tamanho da imagem
    limits: {
        fileSize: 4 * 1024 * 1024
    },

    //criando array com os tipos permitidos
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ];

        if(allowedMimes.includes(file.mimetype)){
            cb(null, true);
        }else{
            cb(new Error("Invalid file type."));
        }
    }
}