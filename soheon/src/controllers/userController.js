const { userService } = require('../services')

const signUp = async (req, res) => {
  try {
		console.log('01. controller connected')
		const me = req.body
		const { email, password } = me

			if (email === undefined || password === undefined) {
				const error = new Error(`KEY_ERROR:${key}_IS_MISSING`)
				error.statusCode = 400
				throw error
			}
			await userService.signUp(email, password)

			console.log('04.controller file after user service funcion call')
    // 5. send response to FRONTEND
		return res.status(201).json({
			"message": "userCreated" 
		})
	} catch (error) {
    console.log("ERROR: ", error.message)
    return res.status(error.statusCode).json({
      "message": error.message
    })
	}
}

module.exports = {
	signUp
}