const express = require('express');
const nunjucks = require('nunjucks');

const app = express();
const PORT = 3000;

//nunjucks 설정
nunjucks.configure('views',{
autoescape: true,
  express: app,
  noCache: true,
});

//정적 파일을 서비스하기 위한 설정
app.use(express.static('public'));

//라우트 설정
app.get('/', (req, res) => {
    res.render('index.html');
});

app.listen(PORT,() => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
