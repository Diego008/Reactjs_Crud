const {Model, DataTypes} = require('sequelize');

  class User extends Model{
    static init(sequelize){
      super.init({        
        email: DataTypes.STRING,
        password: DataTypes.STRING,
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