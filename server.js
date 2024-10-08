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

// Nunjucks 설정
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  noCache: true
});

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

// 라우트 설정
app.get('/', (req, res) => {
  res.render('index.njk', {
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});