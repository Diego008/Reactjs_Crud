const User = require('../models/user');
const crypto = require('crypto');

module.exports = {

    //Metodo para criar usuário
    async store(req, res) {
        const { email, password, cidade, estado, cep } = req.body;

        let user = await User.findOne({ where: { email } });

        // console.log(crypto.getHashes());

        if (!user) {

            //Criptografando aes-256
            // const alg = 'aes-256-ctr';
            // const key = 'abcdabcd';

            // const cipher = crypto.createCipher(alg, key);
            // const crypted = cipher.update(password, 'utf8', 'base64');            
            //--------------------------------------------------------

            //sha512
            const crypted = crypto.createHash('sha512').update(password).digest('base64');

            //Descriptografando
            // const decipher = crypto.createDecipher(alg, key);
            // const descrypted = decipher.update(crypted, 'base64', 'utf8');
            // console.log(descrypted);
            //----------------------------------------------------------

            user = await User.create({
                email,
                password: crypted,
                cidade,
                estado,
                cep
            });

            return res.json(user);

        } else {
            return res.send(false);
        }
    },

    //Metodo para listar todos os usuários
    async index(req, res) {
        const users = await User.findAll();

        return res.json(users);
    },

    async indexOne(req, res) {
        const { id } = req.params;

        const user = await User.findOne({ id });

        return res.json(user)
    },

    async delete(req, res) {
        const { id } = req.params;

        const user = await User.findOne({ id })

        if(!user){
            return res.status(404).json({error: 'Usuario não encontrado'});
        }

        user.destroy();

        return res.json(user);
    }
}