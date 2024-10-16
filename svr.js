const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const static = require('serve-static');
const dbconfig = require('./config/dbconfig.json');
const nunjucks = require('nunjucks');
const session = require('express-session');

const app = express();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: dbconfig.host,
  user: dbconfig.user,
  password: dbconfig.password,
  database: dbconfig.database,
  debug: false
});

app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname+'/public'));
app.use(session({
  secret: 'secretkey1',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    maxAge: 60000
  }
}));

app.use((req, res, next) => {
    
  res.locals.id = '';
  res.locals.name = '';

  if(req.session.member) {
    res.locals.id = req.session.member.id;
    res.locals.name = req.session.member.name;
  }
  next();
});


let now = new Date();
now = `${now.getUTCFullYear()}-${now.getMonth()+1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;


app.get('/', (req, res) => {
  pool.getConnection((err, conn) => {

    if (err) {
      conn.release();
      return;
    }

    const exec = conn.query('select * from board',
      (err, result) => {
        conn.release();
        console.log('실행된 SQL: ' + exec.sql);

        if (err) {
          console.log('SQL 실행시 오류 발생');
          console.dir(err);

          res.writeHead('200', { 'Content-Type': 'text/html; charset=utf-8' });
          res.write('<h1>SQL query 실행 실패</h1>');
          res.end();
          return;
        }

        if (result) {
          res.render('index', {questions: result});
        }
        else {
          console.log('Inserted 실패');

          res.writeHead('200', { 'Content-Type': 'text/html; charset=utf-8' });
          res.write('<h1>사용자 추가 실패</h1>');
          res.end();

        }


      }
    );
  });
});
app.get('/login', (req, res) => {
  res.render('login');
});


app.get('/adduser', (req, res) => {
  res.render('adduser');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/update', (req, res) => {

  pool.getConnection((err, conn) => {

    if (err) {
      conn.release();
      console.log('Mysql getConnection error. aborted');
      return;
    }

    var b_id = req.query.b_id;

    const exec = conn.query(`select * from board left join comment on board.b_id = comment.c_b_id where b_id='${b_id}'`,
      (err, result) => {
        conn.release();

        if (err) {
          console.log('SQL 실행시 오류 발생');
          console.dir(err);
          return;
        }

        if (result) {
          console.log(result);
          res.render('update', {pageinfo: result});
        }
        else {
          console.log('실패');
        }
      }
    );
        
  });
});


app.get('/delete', (req, res) => {
  pool.getConnection((err, conn) => {

    if (err) {
      conn.release();
      console.log('Mysql getConnection error. aborted');
      return;
    }

    var b_id = req.query.b_id;

    const exec = conn.query(`delete from board where b_id='${b_id}'`,
      (err, result) => {
        conn.release();

        if (err) {
          console.log('SQL 실행시 오류 발생');
          console.dir(err);
          return;
        }

        const exec2 = conn.query(`delete from comment where c_b_id='${b_id}'`,
          (err, result) => {
            conn.release();

            if (err) {
              console.log('SQL 실행시 오류 발생');
              console.dir(err);
              return;
            }
                
            res.send('<script>alert(\'삭제되었습니다.\'); location.href=\'/board\';</script>');
          }
        );
      });
  });
});







app.post('/process/register', (req, res) => {

  const paramTitle = req.body.b_title;
  const paramContent = req.body.b_content;
  const paramID = req.session.member.id;

  pool.getConnection((err, conn) => {

    if (err) {
      conn.release();
      console.log('Mysql getConnection error. aborted');
      res.writeHead('200', { 'Content-type': 'text/html; charset = utf8' });
      res.write('<h1>서버 연결 실패</h1>');
      res.end();
      return;
    }
    console.log(paramID);
    const exec = conn.query('insert into board (b_title, b_content, b_upload_date, b_u_id) values (?, ?, ?, ?)',
      [paramTitle, paramContent, now, paramID],
      (err, result) => {
        conn.release();
        console.log('실행된 SQL: ' + exec.sql);

        if (err) {
          console.dir(err);
          res.writeHead('200', { 'Content-Type': 'text/html; charset=utf-8' });
          res.write('<h1>SQL query 실행 실패</h1>');
          res.end();
          return;
        }

        if (result) {
          res.send('<script>alert(\'게시 성공!\'); location.href=\'/\';</script>');

          return;
        }
        else {
          res.writeHead('200', { 'Content-Type': 'text/html; charset=utf-8' });
          res.write('<h1>게시 실패</h1>'+rows.length);
          res.end();
          return;
        }
      });
  });
});



app.post('/process/login', (req, res) => {

  console.log('/process/login 호출됨' + req);

  const paramId = req.body.username;
  const paramPassword = req.body.password;

  console.log('로그인 요청' + paramId + ' ' + paramPassword);

  pool.getConnection((err, conn) => {

    if (err) {
      conn.release();
      console.log('Mysql getConnection error. aborted');
      res.writeHead('200', { 'Content-type': 'text/html; charset = utf8' });
      res.write('<h1>서버 연결 실패</h1>');
      res.end();
      return;
    }

    const exec = conn.query('select `id`, `name` from `users` where `id`=? and `password`= SHA2(?,256)',
      [paramId, paramPassword],
      (err, rows) => {
        conn.release();
        console.log('실행된 SQL: ' + exec.sql);

        if (err) {
          console.dir(err);
          res.writeHead('200', { 'Content-Type': 'text/html; charset=utf-8' });
          res.write('<h1>SQL query 실행 실패</h1>');
          res.end();
          return;
        }

        if (rows.length > 0) {
          console.log('아이디 [%s], 패스워드가 일치하는 사용자 [%s] 찾음', paramId, rows[0].name);
          console.log(rows[0]);
          req.session.member = rows[0];
          res.send('<script>alert(\'로그인 성공!\'); location.href=\'/\';</script>');
          return;
        }
        else {
          console.log('아이디 [%s], 패스워드가 일치없음', paramId);
          res.send('<script>alert(\'로그인 실패. 아이디와 패스워드를 확인하세요.\'); location.href=\'/\';</script>');
          return;
        }
      });
  });
});


app.get('/process/logout', (req, res) => {

  req.session.member = null;
  res.send('<script>alert(\'로그아웃 되었습니다\'); location.href=\'/\';</script>');

});



app.post('/signup', (req, res) => {
  const paramId = req.body.username;
  const paramPassword = req.body.password;

  pool.getConnection((err, conn) => {

    if (err) {
      conn.release();
      console.log('Mysql getConnection error. aborted');
      res.writeHead('200', { 'Content-type': 'text/html; charset = utf8' });
      res.write('<h1>서버 연결 실패</h1>');
      res.end();
      return;
    }

    console.log('데이터베이스 연결 끈 얻었음');

    const exec = conn.query('insert into users (id, password) values (?, SHA2(?,256))',
      [paramId, paramPassword],
      (err, result) => {
        conn.release();
        console.log('실행된 SQL: ' + exec.sql);

        if (err) {
          console.log('SQL 실행시 오류 발생');
          res.send('<script>alert(\'회원가입 실패. 다른 아이디를 이용하세요\'); location.href=\'/\';</script>');
          return;
        }

        if (result) {
          console.dir(result);
          res.send('<script>alert(\'회원가입 완료.\'); location.href=\'/\';</script>');
        }
        else {
          console.log('Inserted 실패');
          res.send('<script>alert(\'회원가입 실패.\'); location.href=\'/\';</script>');

        }
      }
    );
  });

});




app.get('/forum', (req, res) => {
  pool.getConnection((err, conn) => {

    if (err) {
      conn.release();
      console.log('Mysql getConnection error. aborted');
      return;
    }

    var b_id = req.query.b_id;

    const exec = conn.query(`select * from board left join comment on board.b_id = comment.c_b_id where b_id='${b_id}'`,
      (err, result) => {
        conn.release();

        if (err) {
          console.log('SQL 실행시 오류 발생');
          console.dir(err);
          return;
        }

        if (result) {
          console.log(result);
          res.render('forum_page', {question: result});
        }
        else {
          console.log('실패');
        }
      }
    );
        
  });
});


app.post('/process/register_comment', (req, res) => {

  const paramContent = req.body.c_content;
  var b_id = req.query.b_id;
  const paramID = req.session.member.id;

  pool.getConnection((err, conn) => {

    if (err) {
      conn.release();
      console.log('Mysql getConnection error. aborted');
      return;
    }


    const exec = conn.query('insert into comment (c_b_id, c_u_id, c_write_date, c_content) values (?, ?, ?, ?)',
      [b_id, paramID, now, paramContent],
      (err, result) => {
        conn.release();

        if (err) {
          console.dir(err);
          return;
        }

        if (result) {
          res.send(`<script>alert('댓글 입력 완료!'); location.href='/forum?b_id=${b_id}';</script>`);
          return;
        }
        else {
          return;
        }
      });
  });
});


app.get('/delete_comment', (req, res) => {

  var c_id = req.query.c_id;
  var b_id = req.query.b_id;
  console.log(b_id);
  console.log(c_id);

  pool.getConnection((err, conn) => {

    if (err) {
      conn.release();
      console.log('Mysql getConnection error. aborted');
      return;
    }


    const exec = conn.query(`delete from comment where c_id='${c_id}'`,
      (err, result) => {
        conn.release();

        if (err) {
          console.log('SQL 실행시 오류 발생');
          console.dir(err);
          return;
        }
                
        res.send(`<script>alert('댓글이 삭제되었습니다.'); location.href='/page?b_id=${b_id}';</script>`);
      }
    );
  });
});

app.post('/process/update', (req, res) => {

  const paramTitle = req.body.b_title;
  const paramContent = req.body.b_content;
  console.log(req.query.b_id);
  var b_id = req.query.b_id;

  pool.getConnection((err, conn) => {

    if (err) {
      conn.release();
      console.log('Mysql getConnection error. aborted');
      return;
    }


    const exec = conn.query('update board set b_title = ?, b_content = ? where b_id = ?',
      [paramTitle, paramContent, b_id],
      (err, result) => {
        conn.release();

        if (err) {
          console.dir(err);
          return;
        }

        if (result) {
          console.log(b_id);
          res.send(`<script>alert('게시물 수정 완료!'); location.href='/forum?b_id=${b_id}';</script>`);
          return;
        }
        else {
          return;
        }
      });
  });
});












app.listen(3000, () => {
  console.log('Listening on port 3000');
});



