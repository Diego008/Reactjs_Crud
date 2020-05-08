module.exports = {
  username: 'root',
  password: process.env.PASSWORD_DB,
  database: 'crudreactjs',
  host: 'localhost',
  dialect: 'mysql',
  port: '3306',
  define: {
    timestamps: true
  }
}