// 모듈과 변수 선언
const express = require("express");
const mysql = require("./mysqlconn");

// 라우터 객체 생성
const router = express.Router();

router.get("/:id", function (request, response) {
    response.render("password");
  });

router.post("/:id", function (request, response) {
let body = request.body;
    mysql.query(
        "SELECT * FROM postTable WHERE 번호뒷자리 = ?",
        [request.params.id],
        function (error, results) {
          if (!error && results[0].비밀번호 == body.비밀번호) {
            response.redirect("/delete/" +  results[0].번호뒷자리);
          } else {
            console.log("Error");
            response.send(
                `<script>
                  alert('비밀번호가 틀렸습니다.');
                  location.href='/password2/${results[0].번호뒷자리}';
                </script>`
              );
          }
        }
      );
  });



module.exports = router;