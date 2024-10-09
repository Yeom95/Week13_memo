//id가 signupBtn인 버튼을 눌렀을 때, signup 페이지가 모달로 나오는 함수
/*document.addEventListener('DOMContentLoaded', function () {
    setupModalButton('signupBtn', 'signupModal', '/sign_up.html', '/js/sign_up.js');
});*/

document.addEventListener('DOMContentLoaded', function () {
    const signupButton = document.getElementById('signupBtn');
    console.log(document.getElementById('signupBtn'));
    const signupModal = document.getElementById('signupModal');
    const closeModal = document.getElementById('closeModal');

    // Sign Up 버튼 클릭 시 모달 열기
    signupButton.addEventListener('click', function (event) {
        event.preventDefault();
        signupModal.showModal();  // dialog 모달을 열기
    });

    // Close 버튼 클릭 시 모달 닫기
    closeModal.addEventListener('click', function () {
        signupModal.close();  // dialog 모달을 닫기
    });
});