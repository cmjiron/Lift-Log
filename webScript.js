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

const formsData = []; // Array to store form data
document.addEventListener('DOMContentLoaded', function () {
  const createNewWorkoutButton = document.getElementById('saveWorkoutButton');
  // const exerciseList = document.getElementById('exerciseList');

  createNewWorkoutButton.addEventListener('click', function () {
    //   // Get input values from the form
    //   const exerciseInput = document.getElementById('exercise');
    //   const setsInput = document.getElementById('sets');
    //   const repsInput = document.getElementById('reps');

    //   const exerciseValue = exerciseInput.value;
    //   const setsValue = setsInput.value;
    //   const repsValue = repsInput.value;

    //   // Clear the input fields
    //   exerciseInput.value = '';
    //   setsInput.value = '';
    //   repsInput.value = '';
    const ulElement = document.getElementById('exerciseList');
    const forms = ulElement.querySelectorAll('form');
    forms.forEach((form) => {
      const formData = new FormData(form);
      const exercise = formData.get('exercise');
      const sets = formData.get('sets');
      const reps = formData.get('reps');
      formsData.push({ exercise, sets, reps });
    });

    fetch('http://localhost:3000/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formsData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response from server:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
});