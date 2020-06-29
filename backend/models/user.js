const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

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
      user.image_url = `${process.env.APP_URL}/files/${user.img_original_name}`;
    });    
    
    User.afterDestroy(async(user, options) => {
      if(user.image_url !== null){
        promisify(fs.unlink)(
          path.resolve(__dirname, "..", "tmp", "uploads", user.img_original_name)
        );
      }      
    });

    // User.addHook('afterDestroy', async(user, options) => {
    //   if(user.image_url !== null){        
    //    await promisify(fs.unlink)(
    //       path.resolve(__dirname, "..", "tmp", "uploads", user.img_original_name)
    //     );
    //   } 
    // })
    
  }
}

module.exports = User;
