document.addEventListener('DOMContentLoaded', function () {
  // loginBtn 버튼 선택
  const loginButton = document.getElementById('loginBtn');

  // loginBtn 클릭 이벤트 리스너 추가
  loginButton.addEventListener('click', function (event) {
    event.preventDefault();
    
    // login.html의 내용을 모달에 로드
    fetch('/login.html')
      .then(response => response.text())
      .then(html => {
        document.querySelector('#loginModal .modal-body').innerHTML = html;
        const loginModalInstance = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModalInstance.show();

        const signupModalInstance = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
        if(signupModalInstance){
          loginModalInstance.hide();
        }

        // 이제 로그인 모달이 로드된 후, signupBtn을 찾음
        const signupButton = document.querySelector('#signupBtn');  // 로그인 모달에 있는 signupBtn을 찾음
        
        if (signupButton) {
          signupButton.addEventListener('click', function (event) {
            event.preventDefault();
            
            // sign_up.html의 내용을 모달에 로드
            fetch('/sign_up.html')
              .then(response => response.text())
              .then(html => {
                document.querySelector('#signupModal .modal-body').innerHTML = html;
                new bootstrap.Modal(document.getElementById('signupModal')).show();

                // 로그인 모달 숨기기
                $('#loginModal').modal('hide');

                const backLink = document.getElementById('backLink');

                backLink.addEventListener('click', function(event) {
                  event.preventDefault();

                  // 회원가입 모달 숨기기
                  const signupModalInstance = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
                  if (signupModalInstance) {
                    signupModalInstance.hide();
                  }

                  // 로그인 모달 다시 표시하기
                  const loginModalInstance = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
                  if(!loginModalInstance){
                    loginModalInstance = new bootstrap.Modal(document.getElementById('loginModal'));
                  }
                  loginModalInstance.show();
                    
                });
              })
              .catch(err => console.warn('Failed to load signup page:', err));
          });
        }
      })
      .catch(err => console.warn('Failed to load login page:', err));
  });
});