const User = require('../models/user');

module.exports = {

    //Metodo para criar usuário
    async store(req, res) {
        const {email, password, cidade, estado, cep} = req.body;        

        const user = await User.create({email, password, cidade, estado, cep});

        return res.json(user);
    },

    //Metodo para listar todos os usuários
    async index(req, res){
        const users = await User.findAll();

        return res.json(users);
    }
}