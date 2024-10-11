// 로그인 성공 시 처리
function loginSuccess() {
  // Login 버튼을 아이콘으로 교체
  showUserIcon();
}

// Login 버튼을 아이콘으로 교체하는 함수
function showUserIcon() {
  const loginBtn = document.getElementById('loginBtn');
  
  if (loginBtn) {
    loginBtn.innerHTML = '<img src="/images/icon.png" alt="User Icon" class="user-icon" />'; // 이미지로 아이콘 표시
    loginBtn.classList.remove('btn', 'btn-outline-light'); // 기존 클래스 제거
    loginBtn.style.border = 'none'; // 필요에 따라 스타일 변경
  }
}

// 페이지 로드 시 로그인 상태 확인
document.addEventListener('DOMContentLoaded', function () {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  
  // 로그인 상태라면 아이콘으로 표시
  if (isLoggedIn === 'true') {
    showUserIcon();
  }
});

window.addEventListener('DOMContentLoaded', (event) => {
  const loginBtn = document.getElementById('loginBtn');
  const searchBar = document.getElementById('searchBar');

  // 로그인 버튼이 보이는 상태 (id가 없는 상태)
  if (loginBtn.style.display !== 'none') {
    searchBar.style.marginRight = '5px'; // Login 버튼이 있을 때
  } else {
    searchBar.style.marginRight = '60px'; // User Icon만 있을 때
  }
});