const User = require('../models/user');

module.exports = {

    //Metodo para criar usuário
    async store(req, res) {
        const { email, password, cidade, estado, cep } = req.body;

        let user = await User.findOne({ where: { email: email } });

        if(!user){
            user = await User.create({ email, password, cidade, estado, cep });

            return res.json(user);

        } else {
            return res.send(false);
        }      
    },

    //Metodo para listar todos os usuários
    async index(req, res) {
        const users = await User.findAll();

        return res.json(users);
    }
}