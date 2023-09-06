const http = require('http')
const express = require('express')
const { DataSource } = require('typeorm');
const app = express();

app.use(express.json()) // for parsing application/json

const server = http.createServer(app) // express app 으로 서버를 만듭니다.

const start = async () => { // 서버를 시작하는 함수입니다.
  try {
    server.listen(8000, () => console.log(`Server is listening on 8000`))
  } catch (err) { 
    console.error(err)
  }
}

start();

app.get("users", async(req, res) => {
  try {
    
  } catch(error) {
    console.log(error);
  }

}

)
