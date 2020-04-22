const {Model, DataTypes} = require('sequelize');

  class User extends Model{
    static init(sequelize){
      super.init({        
        email:{ 
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
         validate: {
           notEmpty: {
             msg: "Este campo não pode ser vazio"
           },
         }
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false          
        },
        cidade: DataTypes.STRING,
        estado: DataTypes.STRING,
        cep: DataTypes.STRING
      }, {
        //passando conexão com banco
        sequelize
      })
    }
  }

  module.exports = User;