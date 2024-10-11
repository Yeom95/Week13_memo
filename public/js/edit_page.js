document.addEventListener('DOMContentLoaded', () => {
  const editButton = document.getElementById('edit-button');
  const saveButton = document.getElementById('save-button');

  // Elements for editing title and content
  const title = document.getElementById('question-title');
  const editTitle = document.getElementById('edit-title');
  const details = document.getElementById('question-details');
  const editDetails = document.getElementById('edit-details');

  // Edit 버튼 클릭 시
  editButton.addEventListener('click', () => {
    // 제목 편집
    title.style.display = 'none'; // 기존 제목 숨김
    editTitle.style.display = 'block'; // 제목을 입력할 input 표시

    // 내용 편집
    details.style.display = 'none'; // 기존 내용을 숨김
    editDetails.style.display = 'block'; // 편집 textarea를 표시

    // 버튼 변경
    saveButton.style.display = 'inline-block'; // Save 버튼 표시
    editButton.style.display = 'none'; // Edit 버튼 숨김
  });

  // Save 버튼은 form의 submit으로 자동 처리되므로 추가 JS는 필요 없음
});