const { AppDataSource } = require('./dataSource')

const getUserInfoByEmail = async (email) => {
	console.log('03. dao connected')
	const userData = await AppDataSource.query(`
		SELECT id, email FROM users WHERE email='${email}';
`)
  return userData
}

const createUser = async (email, password) => {
	const newUser = await AppDataSource.query(`
		INSERT INTO users (
			password,
			email,
			name
		)
		VALUES (
			'${password}', 
			'${email}',
			'이소헌'
		)
	`)
	return newUser
}

module.exports = {
	getUserInfoByEmail,
	createUser
}