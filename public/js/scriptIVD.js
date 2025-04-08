document.addEventListener('DOMContentLoaded', function() {
    // Get all buttons with the specified class
    const cambiarButtons = document.querySelectorAll('.btn-cambiar-materia');
    // Add click event listener to each button
    cambiarButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Get the form ID from the data attribute
        const formId = this.getAttribute('data-form-id');
        const formulario = document.getElementById(formId);
        // Toggle the display of the form
        if (formulario.style.display === 'none') {
            formulario.style.display = 'block';
        } else {
            formulario.style.display = 'none';
        }
    });
});

// Handle all form submissions
const forms = document.querySelectorAll('.form-cambio-materia');
forms.forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        // Get the input field within this specific form
        const materiaInput = this.querySelector('.input-materia');
        const materiaValue = materiaInput.value.trim();

        // Check if the input is empty
        if (materiaValue === '') {
        // Show error message if input is empty
            alert('Por favor, ingrese la materia antes de enviar la solicitud.');
        return; // Stop the function execution
        }

        // If we get here, input is not empty
        console.log('Solicitud de cambio para materia:', materiaValue);

        // Show confirmation message
        alert('Solicitud enviada correctamente. Espere respuesta de coordinadores.');

        // Reset the form and hide it
        this.reset();
        this.style.display = 'none';
    });
});
});

function visibleToggle() {
    var x = document.getElementById("passwordInput");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')