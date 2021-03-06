const User = require("../models/user");
const crypto = require("crypto");
const paginate = require('express-paginate');
const {Sequelize} = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  //Metodo para criar usuário
  async store(req, res) {
    // try {
      console.log(req.file);
      const { email, password, cidade, estado, cep } = req.body;
      const {key} = req.file;      

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
          img_original_name: key,
          // image_url: `${process.env.APP_URL}/files/${key}`                  
        });

        return res.json(user);
      }else{
        return res.status(400).send(false);
      }
    // } catch (err) {
    //   return res.status(400).send(false);
    // }
  },

  //Metodo para listar todos os usuários
  async index(req, res) {
    const text = req.params.find;    
    
    const users = await User.findAll({
      where: {
        email: {
          [Op.like]: `%${text}%`         
        }
      }
    });

    if(users){
      return res.json(users);
    }else{
      return res.send(false);
    }     

  },

  async pagination(req, res, next) {
    
    User.findAndCountAll({
      limit: req.query.limit, 
      offset: req.query.limit * (req.params.page - 1),
      order: [
        ['ID', 'DESC']
      ]
    })
      .then(results => {
        const itemCount = results.count;
        const pageCount = Math.ceil(results.count / req.query.limit);

        res.json({
          users: results.rows,
          pageCount,
          itemCount,
          pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
        });
    }).catch(err => next(err))

  },

  //Metodo para retornar um usuário
  async edit(req, res) {
    const { id } = req.params;
    const { email, password, cidade, estado, cep } = req.body;

    const userExists = await User.findOne({ where: { id } });

    if (userExists) {

      const crypted = crypto.createHash("sha512").update(password).digest("base64");

      user = await User.update(
        {
          email,
          password: crypted,
          cidade,
          estado,
          cep,
        }, { where: { id } } );

      return res.json(user);

    } else {
      return res.send(false);
    }


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
