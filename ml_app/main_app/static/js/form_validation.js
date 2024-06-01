const form = document.getElementById('prediction-form');
//key model input components
const ageInput = document.getElementById('age_id');
const bmiInput = document.getElementById('bmi_id');
const childrenInput = document.getElementById('children_id');
const sexInput = document.getElementById('sex_id');
const smokerInput = document.getElementById('smoker_id');
const regionInput = document.getElementById('region_id');

//error message component
const errorAgeMessage = document.getElementById('error-message-age');
const errorBMIMessage = document.getElementById('error-message-bmi');
const errorChildrenIMessage = document.getElementById('error-message-children');
const errorSexIMessage = document.getElementById('error-message-sex');
const errorSmokerIMessage = document.getElementById('error-message-smoker');
const errorRegionIMessage = document.getElementById('error-message-region');

//key buttons
const submitButton = document.getElementById('submitButton');
const clearButton = document.getElementById('clearButton');
//prediction element 
const predictionResult = document.getElementById('prediction-result');

function predictOutput() {
    const formData = new FormData(form);
    const formDataObject = {};
    for (const [key, value] of formData.entries()) {
      formDataObject[key] = value;
      console.log("key ", key, " val ",value)
    }
  
    // Send an AJAX request to the prediction endpoint
    fetch("{% url 'prediction' %}", {
      method: 'POST',
      headers: {
          'X-CSRFToken': '{{ csrf_token }}', // Include the CSRF token for Django
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' // Set the correct content type
      },
      //body: JSON.stringify(formDataObject)
      body: new URLSearchParams(formData).toString() // Convert FormData to URL-encoded form data
    })
    .then(response => response.json())
    .then(data => {
      // Repopulate the form with the prediction result
      //repopulateForm(data);
      console.log("pred ",data.prediction)
      // Update the prediction result on the page
      if (data.prediction) {
        predictionResult.innerHTML = `<span class="text-black">Insurance Premium Prediction:</span> <span class="text-green-500">${data.prediction}</span>`;
        predictionResult.classList.remove('text-red-500');
        predictionResult.classList.add('text-green-500');
      } else {
        predictionResult.textContent = 'Check inputs and try again to get Insurance Premium Prediction';
        predictionResult.classList.remove('text-green-500');
        predictionResult.classList.add('text-red-500');
      }

    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function repopulateForm(data) {
    // Update the form fields with the prediction result
    ageInput.value = data.age;
    bmiInput.value = data.bmi;
    childrenInput.value = data.children;
    sexInput.value = data.sex;

    // Update other fields as needed
}
  
//const errorMessage = document.getElementById('age_id_label');
submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const ageValid = validateAge();
    const bmiValid = validateBMI();
    const childrenValid = validateChildren();
    const sexValid = validateSex();
    const smokerValid = validateSmoker();
    const regionValid = validateRegion();


    if (ageValid && bmiValid && childrenValid && sexValid && smokerValid && regionValid) {
      console.log('All validations passed!');
      const prediction = predictOutput();
      //console.log('Prediction:', prediction);

    }

});
clearButton.addEventListener('click', function() {
    errorAgeMessage.textContent = '';
    errorBMIMessage.textContent = '';
    errorChildrenIMessage.textContent = '';
    errorSexIMessage.textContent = '';
    errorSmokerIMessage.textContent = '';
    errorRegionIMessage.textContent = '';
    predictionResult.textContent = ''
    // Clear all input fields
    form.reset();
});
// Function to store form data in localStorage
function storeFormData() {
    const formData = new FormData(form);
    const formDataObject = {};
    for (const [key, value] of formData.entries()) {
        formDataObject[key] = value;
    }
    localStorage.setItem('formData', JSON.stringify(formDataObject));
}


function validateAge() {
    const ageValue = ageInput.value.trim();
    if (ageValue === '') {
        showError(errorAgeMessage, 'Please enter your age.');
    } else if (!/^\d+$/.test(ageValue)) {
        showError(errorAgeMessage, 'Please enter a valid number.');
    } else if (parseInt(ageValue) < 18 || parseInt(ageValue) > 120) {
        showError(errorAgeMessage, 'Please enter an age between 18 and 120.');
    } else {
        showSuccess(ageInput, errorAgeMessage);
        return true;
    }
    return false
}

function validateBMI() {
    const bmiValue = bmiInput.value.trim();
    if (bmiValue === '') {
        showError(errorBMIMessage, 'Please enter your BMI.');
    } else if (!/^\d+$/.test(bmiValue)) {
        showError(errorBMIMessage, 'Please enter a valid number.');
    } else if (parseInt(bmiValue) < 1 || parseInt(bmiValue) > 50) {
        showError(errorBMIMessage, 'Please enter a BMI between 1 and 50.');
    } else {
        showSuccess(bmiInput, errorBMIMessage);
        return true;
    }
    return false;
}

function validateChildren() {
    const childrenValue = childrenInput.value.trim();
    if (childrenValue === '') {
        showError(errorChildrenIMessage, 'Please enter number of children.');
    } else if (!/^\d+$/.test(childrenValue)) {
        showError(errorChildrenIMessage, 'Please enter a valid number.');
    } else if (parseInt(childrenValue) < 1 || parseInt(childrenValue) > 20) {
        showError(errorChildrenIMessage, 'Please enter number of children between 1 and 20.');
    } else {
        showSuccess(childrenInput, errorChildrenIMessage);
        return true;
    }
    return false;
}

function validateSex() {
    const sexValue = sexInput.value.trim();
    console.log("sexValue ", sexValue)

    if (sexValue === 'Open this select menu') {
        showError(errorSexIMessage, 'Please enter a valid sex.');
    } else if (parseInt(sexValue) < 1 || parseInt(sexValue) > 2) {
        showError(errorSexIMessage, 'Error in sex input value.');
    } else {
        showSuccess(sexInput, errorSexIMessage);
        return true;
    }
    return false;
}

function validateSmoker() {
    const smokerValue = smokerInput.value.trim();
    console.log("smokerValue ", smokerValue)

    if (smokerValue === 'Open this select menu') {
        showError(errorSmokerIMessage, 'Please enter a valid smoker value.');
    } else if (parseInt(smokerValue) < 1 || parseInt(smokerValue) > 2) {
        showError(errorSmokerIMessage, 'Error in smoker input value.');
    } else {
        showSuccess(smokerInput, errorSmokerIMessage);
        return true;
    }
    return false;
}


function validateRegion() {
    const regionValue = regionInput.value.trim();
    console.log("regionValue ", regionValue)

    if (regionValue === 'Open this select menu') {
        showError(errorRegionIMessage, 'Please enter a valid sex.');
    } else if (parseInt(regionValue) < 1 || parseInt(regionValue) > 4) {
        showError(errorRegionIMessage, 'Error in region input value.');
    } else {
        showSuccess(regionInput, errorRegionIMessage);
        return true;
    }
    return false;
}


function showError(input, message) {
    input.textContent = message;
    //ageInput.classList.add('bg-red-100');
    input.classList.add('bg-red-100', 'transition', 'duration-500', 'ease-in-out');
    input.setAttribute('aria-invalid', 'true');
    // Remove the green background after 1 seconds
    setTimeout(() => {
        input.classList.remove('bg-red-100');
        input.classList.add('bg-gray-100');
    }, 1000);
}

function showSuccess(input, error_msg) {
    error_msg.textContent = '';
    input.classList.add('bg-green-100', 'transition', 'duration-500', 'ease-in-out');
    input.setAttribute('aria-invalid', 'false');
    // Remove the green background after 1 seconds
    setTimeout(() => {
        input.classList.remove('bg-green-100');
        input.classList.add('bg-gray-100');
    }, 1000);
}

// Function to load form data from localStorage
function loadFormData() {
    const storedFormData = localStorage.getItem('formData');
    if (storedFormData) {
    const formDataObject = JSON.parse(storedFormData);
    ageInput.value = formDataObject.age;
    bmiInput.value = formDataObject.bmi;
    childrenInput.value = formDataObject.children;
    sexInput.value = formDataObject.sex;
    smokerInput.value = formDataObject.smoker;
    regionInput.value = formDataObject.region;

    // Load other fields as needed
    }
}

// Call the loadFormData function when the page loads
window.addEventListener('load', loadFormData);