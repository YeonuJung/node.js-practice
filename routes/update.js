// 모듈과 변수 선언
const express = require("express");
const mysql = require("./mysqlconn");

// 라우터 객체 생성
const router = express.Router();

router.get("/", function (request, response) {
  response.render("update");
});

// 페이지 라우트
router.get("/:id", function (request, response) {
  mysql.query(
    "SELECT * FROM postTable WHERE 번호뒷자리 = ?",
    [request.params.id],
    function (error, results) {
      if (!error) {
        response.render("update", { item: results[0] });
      } else {
        console.log("Error");
      }
    }
  );
});

router.post("/:id", function (request, response) {
  let body = request.body;

  mysql.query(
    "UPDATE postTable SET 제목=?, 문의내용=? WHERE 번호뒷자리=?",
    [body.제목, body.문의내용, request.params.id],
    function (error, results) {
      if (!error) {
        console.log("edit-post");
        response.redirect("/");
      } else {
        console.log("Error");
      }
    }
  );
});

module.exports = router;
