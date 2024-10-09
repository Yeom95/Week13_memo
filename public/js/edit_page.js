document.getElementById('edit-button').addEventListener('click', function() {
    // Toggle display of the description and the textarea for editing
    const description = document.getElementById('question-description');
    const editDescription = document.getElementById('edit-description');
    
    const details = document.getElementById('question-details');
    const editDetails = document.getElementById('edit-details');
    
    const editButton = document.getElementById('edit-button');
    const saveButton = document.getElementById('save-button');

    // Show textarea, hide the description
    description.style.display = 'none';
    editDescription.style.display = 'block';
    editDescription.value = description.innerText; // Populate textarea with current description

    details.style.display = 'none';
    editDetails.style.display = 'block';
    editDetails.value = details.innerText; // Populate textarea with current details

    // Hide the Edit button, show the Save button
    editButton.style.display = 'none';
    saveButton.style.display = 'inline-block';
});

document.getElementById('save-button').addEventListener('click', function() {
    // Get the edited text from the textarea
    const editDescription = document.getElementById('edit-description').value;
    const editDetails = document.getElementById('edit-details').value;

    // Update the displayed description and details with the edited content
    document.getElementById('question-description').innerText = editDescription;
    document.getElementById('question-details').innerText = editDetails;

    // Hide the textarea, show the updated content
    document.getElementById('edit-description').style.display = 'none';
    document.getElementById('question-description').style.display = 'block';

    document.getElementById('edit-details').style.display = 'none';
    document.getElementById('question-details').style.display = 'block';

    // Show the Edit button again, hide the Save button
    document.getElementById('edit-button').style.display = 'inline-block';
    document.getElementById('save-button').style.display = 'none';
});