const http = require('http')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const { AppDataSource } = require('./src/models/dataSource');
const { routers } = require('./src/routers');

const app = express()

app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(routers);

app.get("/ping", async(req, res) => {
  try {
    return res.status(200).json({"message": "pong"})
  } catch (err) {
    console.log(err)
  }
})

const server = http.createServer(app) // express app 으로 서버를 만듭니다.

const start = async () => { // 서버를 시작하는 함수입니다.
  try {
    await AppDataSource.initialize().then(() => {
      console.log("Data Source has been initialized!")
    })

    server.listen(8000, () => console.log(`Server is listening on 8000`))
  } catch (err) { 
    console.error(err)
  }
}

start()