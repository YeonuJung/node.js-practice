// 모듈과 변수 선언
var express = require("express");
var mysql = require("./mysqlconn");

var router = express.Router();

// 페이지 라우트
router.get("/:id", function (request, response) {
  mysql.query(
    "DELETE FROM postTable WHERE 번호뒷자리=?",
    [request.params.id],
    function (error, results) {
      if (!error) {
        console.log("삭제 완료");
        response.redirect("/");
      } else {
        console.log("Error");
      }
    }
  );
});

module.exports = router;
