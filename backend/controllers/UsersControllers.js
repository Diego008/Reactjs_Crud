const User = require("../models/user");
const crypto = require("crypto");

module.exports = {
  //Metodo para criar usuário
  async store(req, res) {
    try {
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
        const crypted = crypto
          .createHash("sha512")
          .update(password)
          .digest("base64");

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
          cep,
        });

        return res.json(user);
      }
    } catch (err) {
      return res.status(400).send(false);
    }
  },

  //Metodo para listar todos os usuários
  async index(req, res) {
    const users = await User.findAll({      
      order: [["ID", "ASC"]],
    });

    return res.json(users);

  },

  async pagination(req, res) {
    let limit = 2;
    let offset = 0;

    const countAllUsers = await User.findAndCountAll(); 
    let page = req.params.page;   
    let pages = Math.ceil(countAllUsers.count / limit);
    offset = limit * (page - 1);


    const users = await User.findAll({
      limit: limit,   
      offset: offset,   
      order: [["ID", "ASC"]]
    });

    return res.json({ users, 'count': countAllUsers.count, pages });

  },

  //Metodo para retornar um usuário
  async indexOne(req, res) {
    const { id } = req.params;

    const user = await User.findOne({ where: { id } });

    return res.json(user);
  },

  //Metodo para deletar usuário
  async delete(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "Usuario não encontrado" });
    }

    user.destroy();

    return res.json();
  },
};
