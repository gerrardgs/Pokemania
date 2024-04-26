const inputs = document.querySelectorAll(".input");

function focusFunc() {
    let parent = this.parentNode;
    parent.classList.add("focus");
}

function blurFunc() {
    let parent = this.parentNode;
    if (this.value == "") {
    parent.classList.remove("focus");
    }
}

inputs.forEach((input) => {
    input.addEventListener("focus", focusFunc);
    input.addEventListener("blur", blurFunc);
});

/* alert */
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');

    // Event listener for form submission
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Show alert when the form is submitted
        showAlert();
    })
    });

// Function to show alert
function showAlert() {
    // Create the alert element
    const alertBox = document.createElement('div');
    alertBox.classList.add('custom-alert');
    alertBox.innerHTML = `
        <div class="alert-content">
            <p>The Message Has Been Sent</p>
            <button onclick="goBack()">Back</button>
        </div>
    `;
    document.body.appendChild(alertBox);
}
// Function to go back
function goBack() {
    // Reload the contact page
    window.location.href = './contact.html';
    console.log("TEST");
}
