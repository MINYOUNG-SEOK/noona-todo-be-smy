const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
require("dotenv").config();

const app = express();
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;

app.use(bodyParser.json());
app.use(cors());

app.use("/api", indexRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const mongoURI = MONGODB_URI_PROD;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.log("DB connection fail", err);
  });

app.listen(process.env.PORT || 4000, () => {
  console.log("server on 4000");
});

// 2. 로그인
// 이메일 패스워드를 입력해서 보냄
// 데이터베이스에 해당 이메일과 패스워드를 가진 유저가 있는지 확인
// 없으면 로그인 실패
// 있다면 유저정보 + 토큰 보내기
// 프론트엔드에서는 이 정보를 저장

// 1. 라우터 설정
// 2. 이메일 패스워드 정보 읽어오기
// 3. 이메일을 가지고 유저정보 가져오기
// 4. 이 유저에 디비에 있는 패스워드와 프론트엔드가 보낸 패스워드가 동일한지 비교
// 5. 맞다면 토큰 발행
// 6. 아니면 에러메세지 보냄
// 7. 응답으로 유저정보 + 토큰 보냄
