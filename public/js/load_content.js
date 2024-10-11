// 모달의 콘텐츠를 불러오는 함수
function loadModalContent(modalId, htmlFile, jsFile) {
  // 모달의 HTML 콘텐츠를 fetch로 불러오기
  fetch(htmlFile)
    .then(response => response.text())
    .then(html => {
      // 모달 본문에 HTML 내용 삽입
      document.querySelector(`#${modalId} .modal-body`).innerHTML = html;

      // 모달 띄우기
      new bootstrap.Modal(document.getElementById(modalId)).show();

      // 동적으로 JavaScript 파일 로드 (필요할 경우)
      if (jsFile) {
        const script = document.createElement('script');
        script.src = jsFile;  // 외부 스크립트 경로
        document.body.appendChild(script);  // 스크립트 실행
      }
    })
    .catch(err => console.warn(`Failed to load ${htmlFile}:`, err));
}

// 모달을 여는 버튼을 처리하는 함수
function setupModalButton(buttonId, modalId, htmlFile, jsFile) {
  // 페이지 로드 완료 후 버튼에 이벤트 리스너 추가
  document.addEventListener('DOMContentLoaded', function () {
    const modalButton = document.getElementById(buttonId);
    if (modalButton) {
      modalButton.addEventListener('click', function (event) {
        event.preventDefault();
        loadModalContent(modalId, htmlFile, jsFile);
      });
    }
  });
}