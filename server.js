const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');

const app = express();
const PORT = 3000;

const questions = [
  { id:1346546,title: 'Publishing my work without advisor', description: '0 Answers • 0 Votes • 0 Views', meta: 'Asked 23m ago' },
  { id:4896536,title: 'Choosing your research area', description: '5 Answers • 12 Votes • 727 Views', meta: 'Asked 2h ago' },
  { id:9849866,title: 'Is independent research a good long term goal for a bachelor’s degree?', description: '2 Answers • 7 Votes • 438 Views', meta: 'Asked 3h ago' },
  { id:9849465,title: 'How may I calculate Research Contribution as Per UGC rules?', description: '0 Answers • 12 Votes • 727 Views', meta: 'Asked 8h ago' }
];

const top_users = [
  { name: 'Simoka', points: '2,175 Points' },
  { name: 'Felipe del', points: '2,083 Points' },
  { name: 'Israel Lima', points: '1,792 Points' }
];

const hot_questions = [
  { text: "What's the appropriate word to say you're dazzled by a nice smell?" },
  { text: "How to structure a good research paper?" },
  { text: "How can I improve my academic writing skills?" }
];

const users = [
  { username: 'admin', password: 'password123' },
  { username: 'user1', password: 'qwerty' },
  { username: 'testuser', password: '123456' }
];

// Nunjucks 설정
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  noCache: true
});

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));
//POST에서 폼 데이터 파싱용
app.use(express.urlencoded({ extended: true }));

// 라우트 설정
app.get('/', (req, res) => {
  res.render('index.html', {
    questions,
    top_users,
    hot_questions
  });
});

// 포럼 페이지 라우팅 (URL로부터 받은 ID를 이용하여 렌더링)
app.get('/forum/:id', (req, res) => {
  const questionId = parseInt(req.params.id, 10); // URL 파라미터로부터 ID를 받아옴
  const question = questions.find(q => q.id === questionId); // 해당 ID의 질문을 찾음

  // 찾은 질문을 렌더링할 때 전달
  res.render('forum_page.njk', { question });
});

// 로그인 처리 라우트
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.send(`<h1>Welcome, ${user.username}!</h1>`); // 로그인 성공시 메시지 출력
  } else {
    res.send('<h1>Login failed. Invalid username or password.</h1>'); // 로그인 실패 시 메시지 출력
  }
});

// 회원가입 처리 라우트
app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  // 사용자 중복 확인
  const existingUser = users.find(u => u.username === username && u.password === password);

  if (existingUser) {
    res.send('<h1>Username or email already exists. Please choose another one.</h1>');
  } else {
    // 새로운 사용자 추가
    users.push({ username, password });
    res.send(`<h1>Welcome, ${username}! You have successfully signed up.</h1>`);
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});