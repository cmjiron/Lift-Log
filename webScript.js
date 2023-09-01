document.addEventListener('DOMContentLoaded', function() {
  // Get the form element
  var form = document.getElementById('dayForm');
  
  // Get the textarea element
  var messageInput = form.querySelector('#day');
  
  // Set the default text
  var defaultText = "Day 1";
  messageInput.value = defaultText;
  
  // Add an event listener for form submission
  form.addEventListener('submit', function(event) {
    // If the user hasn't changed the text, use the default text as the submitted value
    if (messageInput.value === defaultText) {
      messageInput.value = defaultText;
    }
    // Otherwise, the user's input will be submitted
  });
});