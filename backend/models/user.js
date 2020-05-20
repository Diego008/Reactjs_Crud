const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            notEmpty: {
              msg: "Este campo não pode ser vazio",
            },
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        cidade: DataTypes.STRING,
        estado: DataTypes.STRING,
        cep: DataTypes.STRING,
        image_url: DataTypes.STRING,
        img_original_name: DataTypes.STRING,           
      },
      {
        //passando conexão com banco
        sequelize,
      }
    );    
    
    User.beforeCreate(async(user, options) => {
      const key = user.image_url;      
      user.image_url = `${process.env.APP_URL}/files/${key}`;
    })            
    
  }
}

module.exports = User;
