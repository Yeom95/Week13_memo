document.addEventListener('DOMContentLoaded', () => {
    const editButton = document.getElementById('edit-button');
    const saveButton = document.getElementById('save-button');
    const description = document.getElementById('question-description');
    const details = document.getElementById('question-details');
    const editDescription = document.getElementById('edit-description');
    const editDetails = document.getElementById('edit-details');
    const updateForm = document.getElementById('update-form');
    const updatedDescription = document.getElementById('updated-description');
    const updatedDetails = document.getElementById('updated-details');

    // Edit 버튼 클릭 시 텍스트 영역 표시
    editButton.addEventListener('click', () => {
        // 숨겨진 textarea를 표시하고 기존 내용을 채워넣음
        //editDescription.style.display = 'block';
        details.style.display = 'none'; // 기존 내용을 숨김
        editDetails.style.display = 'block';
        saveButton.style.display = 'inline-block';
        editButton.style.display = 'none';

        // 현재 내용을 textarea에 복사
        //editDescription.value = description.textContent.trim();
        editDetails.value = details.textContent.trim();
    });

    // Save 버튼 클릭 시 내용 전송
    saveButton.addEventListener('click', () => {
        // 필수 값이 입력되지 않았는지 체크
        //editDescription.value.trim() === '' || 
        if (editDetails.value.trim() === '') {
            alert('Title과 Content는 필수 입력 항목입니다.');
            return; // 폼을 제출하지 않음
        }

        // textarea의 값을 form hidden input으로 복사
        //updatedDescription.value = editDescription.value;
        updatedDetails.value = editDetails.value;

        // Form을 submit해서 POST 요청
        updateForm.submit();
    });
});