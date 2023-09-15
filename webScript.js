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
  })
});

/*-------------------------------------------------------------------Create New Workout----------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function () {
  const createNewWorkoutButton = document.getElementById('saveWorkoutButton');
  createNewWorkoutButton.addEventListener('click', function () {
    const formsData = [];
    const ulElement = document.getElementById('exerciseList');
    const workoutTitle = document.getElementById('workoutTitle').value;
    const forms = ulElement.querySelectorAll('form');
    forms.forEach((form) => {
      const formData = new FormData(form);
      const exercise = formData.get('exercise');
      const sets = formData.get('sets');
      const reps = formData.get('reps');
      formsData.push({ exercise, sets, reps });
    });
    const workoutData = { workoutTitle, formsData };

    const token = localStorage.getItem('jwtToken');
    fetch('http://localhost:3000/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify(workoutData),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log('Response from server:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
});

/*-------------------------------------------------------------------Get Saved Workouts----------------------------------------------------------------------------- */
const token = localStorage.getItem('jwtToken'); // Retrieve the JWT token from where you store it (e.g., local storage)

if (token) {
  fetch('http://localhost:3000/savedWorkouts', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token, // Include the JWT token in the headers
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the received data (items related to the signed-in user)
      console.log('Received items:', data.items);
      const savedWorkoutsButtonContainer = document.getElementById('savedWorkoutsButtonContainer');

      // Loop through the data and create a button for each item
      data.items.forEach((item) => {
        const button = document.createElement('button');
        button.textContent = item.title; // Set the button label using the data
        savedWorkoutsButtonContainer.appendChild(button); // Append the button to the container
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
} else {
  // Handle the case where the user is not authenticated or the token is missing
  console.error('User not authenticated');
}



/*-------------------------------------------------------------------Register New User----------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function () {
  const createAccountButton = document.getElementById('createAccountButton');
  createAccountButton.addEventListener('click', function (event) {
    event.preventDefault();
    const formsData = [];
    const form = document.getElementById('registerForm');
    const formData = new FormData(form);
    const fname = formData.get('fname');
    const lname = formData.get('lname');
    const username = formData.get('username');
    const password = formData.get('password');
    const email = formData.get('email');
    formsData.push({ fname, lname, username, password, email });

    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formsData),
    }).then((response) => response.json())
      .then((data) => {
        console.log('Response from server:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
});

/*---------------------------------------------------------------------------Login------------------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function () {
  const loginButton = document.getElementById('loginButton');
  loginButton.addEventListener('click', function (event) {
    event.preventDefault();
    const formsData = [];
    const form = document.getElementById('loginForm');
    const formData = new FormData(form);
    const username = formData.get('username');
    const password = formData.get('password');
    formsData.push({ username, password });

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formsData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data !== null) {
          if (data.message) {
            console.log('Login message:', data.message);
          }

          if (data.token) {
            console.log('Received token:', data.token);
            localStorage.setItem('jwtToken', data.token);
          }

          window.location.href = 'https://cmjiron.github.io/Lift-Log/index.html'; // Replace with your desired URL
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
});