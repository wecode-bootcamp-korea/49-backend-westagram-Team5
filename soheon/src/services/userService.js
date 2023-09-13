const jwt = require('jsonwebtoken')
const { userDao } = require('../models')

const signUp = async (email, password) => {
    console.log('02. user service connected')

    // (필수) 비밀번호가 너무 짧을 때
    if (password.length <= 8) {
      const error = new Error("PASSWORD_MUST_BE_LONGER_THAN_8")
      error.statusCode = 400
      throw error
    }

    // (심화, 진행) 이메일이 중복되어 이미 가입한 경우
    // 1. 유저가 입력한 Email인 'shlee@wecode.co.kr'이 이미 우리 DB에 있는지 확인한다.
    const [existingUser] = await userDao.getUserInfoByEmail(email)

    if (existingUser) { // existing user 이용해서 판별`
      const error = new Error("DUPLICATED_EMAIL_ADDRESS")
      error.statusCode = 400
      throw error
    }

    const newUser = userDao.createUser(email, password)
  return newUser
}

const logIn = async(req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password

    console.log("=========================")
    console.log("=========LOG_IN=========")
    console.log("email: ", email)
    console.log("password: ", password)
    console.log("=========================")

    const requiredKeys = {email, password}

    Object.keys(requiredKeys).map((key) => {
      if (requiredKeys[key] === undefined) {
        const error = new Error(`KEY_ERROR:${key}_IS_MISSING`)
        error.statusCode = 400
        throw error
      }
    })

    const [existingUser] = await myDataSource.query(`
      SELECT id, email, password FROM users WHERE email='${email}';
    `)

    if (!existingUser) { // existing user 이용해서 판별`
      const error = new Error("USER_DOES_NOT_EXIST")
      error.statusCode = 400
      throw error
    }

    if (existingUser.password !== password) {
      const error = new Error("INVALID_PASSWORD")
      error.statusCode = 400
      throw error
    }

    // 1. use library allowing generating token
    // 2. {"id": 10} // 1hour
    const token = jwt.sign({userId : existingUser.id}, 'scret_key')
    // 3. signature

    console.log("LOGIN_SUCCESS")
    return res.status(200).json({ 
      "message" : "LOGIN_SUCCESS",
      "accessToken" : token
    })

  } catch (error) {
    console.log("ERROR: ", error.message)
    return res.status(error.statusCode).json({
      "message": error.message
    })
  }
}

const getUsers = async(req, res) => {
	try {
    // Database Source 변수를 가져오고.
    // SELECT id, name, password FROM users;
    const userData = await myDataSource.query(`
      SELECT id, name, email FROM USERssssS;
    `)

    // FRONT 전달
    return res.status(200).json({
      "users": userData
    })
	} catch (error) {
		console.log(error)
    return res.status(500).json({
      "message": error.message 
    })
	}
}

const deleteUser = async(req, res) => {
  try {

  } catch (err) {
    console.log(err)
  }
}

const updateUser = async(userId, email) => {
  return userDao.updateUser(id, email) 
}

module.exports = {
	"signUp": signUp,
	"logIn": logIn,
	"getUsers" : getUsers,
	"deleteUser" : deleteUser,
	"updateUser" : updateUser
}