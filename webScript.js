document.addEventListener('DOMContentLoaded', function () {
  // Get the form element
  var form = document.getElementById('dayForm');

  // Get the textarea element
  var messageInput = form.querySelector('#day');

  // Set the default text
  var defaultText = "Day 1";
  messageInput.value = defaultText;

  // Add an event listener for form submission
  form.addEventListener('submit', function (event) {
    // If the user hasn't changed the text, use the default text as the submitted value
    if (messageInput.value === defaultText) {
      messageInput.value = defaultText;
    }
    // Otherwise, the user's input will be submitted
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Get references to the button, form template, and the ul element
  const addItemButton = document.getElementById('createNewWorkoutButton');
  const formTemplate = document.getElementById('exerciseTemplate');
  const itemList = document.getElementById('exerciseList');

  // Add a click event listener to the button
  addItemButton.addEventListener('click', function () {
    // Clone the form template
    const clone = formTemplate.cloneNode(true);

    // Remove the 'display: none;' style to make it visible
    clone.style.display = 'block'; // or 'block', 'inline', etc., based on your needs

    // Append the clone to the ul element
    itemList.appendChild(clone);
  });
});

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('saveWorkoutButton').addEventListener('click', function () {
    document.querySelectorAll('form').forEach((form, index) => {
      const formData = new FormData(form);

      fetch('/submit', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(`Response from Form ${index + 1}:`, data);
        })
        .catch((error) => {
          console.error(`Error from Form ${index + 1}:`, error);
        });
    });
  });
});