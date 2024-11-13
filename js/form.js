const inputName =  document.querySelector('#name');
const inputPhone =  document.querySelector('#phone');
const inputEmail = document.querySelector('#email');
const inputMessage = document.querySelector('#message');
const btnSubmit = document.querySelector('#btn-submit');
const divSpinner = document.querySelector('#div-spinner');
const form = document.querySelector('#form');

inputName.addEventListener('blur', validate);
inputPhone.addEventListener('blur', validate);
inputEmail.addEventListener('blur', validate);
inputMessage.addEventListener('blur', validateTextArea);
form.addEventListener('submit', submitForm);


window.addEventListener('beforeunload', () => {
    form.reset();
});


const formObj = {
    name: '',
    phone: '',
    email: '',
    message: ''
}


checkFormInfo();


function validate(event) {
    if(event.target.value.trim() === '') {
        showAlert('Este campo no puede ir vacío', event.target.parentElement);
        formObj[event.target.name] = '';
        checkFormInfo()
        return
    }

    if(event.target.id === 'name' && !validateName(event.target.value)) {
        showAlert('El nombre es demasiado largo o no es válido', event.target.parentElement);
        formObj[event.target.name] = '';
        checkFormInfo()
        return
    }

    if(event.target.id === 'phone' && !validatePhone(event.target.value)) {
        showAlert('El número debe de ser de 9 dígitos y debe ser válido', event.target.parentElement);
        formObj[event.target.name] = '';
        checkFormInfo()
        return
    }

    if(event.target.id === 'email' && !validateEmail(event.target.value)) {
        showAlert('Email no válido', event.target.parentElement)
        formObj[event.target.name] = '';
        checkFormInfo()
        return
    }

    formObj[event.target.name] = event.target.value.trim().toLowerCase();
    
    checkFormInfo();
}

function validateTextArea(event) {
    if(event.target.value.length > 400) {
        showAlert('Máximo 400 caracteres', event.target.parentElement)
        formObj[event.target.name] = '';
        return
    }
    
    formObj[event.target.name] = event.target.value.trim().toLowerCase();
    checkFormInfo()
};

function validateName(name) {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü' -]{1,40}$/;
    const result = regex.test(name);
    return result;
};

function validatePhone(phone) {
    const regex = /^[6789]\d{8}$/;
    const result = regex.test(phone);
    return result;
};

function validateEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const result = regex.test(email);
    return result;
};

function showAlert(message, reference) {
    cleanAlert(reference);

    const error = document.createElement('p');
    error.textContent = message;
    error.classList.add('error');

    reference.appendChild(error);

    setTimeout(() => {
        error.remove();
    }, 4000);
};

function cleanAlert(reference) {
    const cleanMessage = reference.querySelector('.error');

    if(cleanMessage) {
        cleanMessage.remove();
    }
}

function checkFormInfo() {
    const requiredFields = Object.keys(formObj).filter(key => key !== 'message');
    const allRequiredFilled = requiredFields.every(key => formObj[key] !== '');

    if(allRequiredFilled) {
        btnSubmit.classList.remove('disabled');
        btnSubmit.disabled = false;
    } else {
        btnSubmit.classList.add('disabled');
        btnSubmit.disabled = true;
    }
}

function submitForm(event) {
    event.preventDefault();

    divSpinner.classList.remove('hide-spinner');

    setTimeout(() => {
        divSpinner.classList.add('hide-spinner');

        Swal.fire({
            title: "Gracias por contactar conmigo",
            text: "En breve recibirás llegará un correo con instrucciones",
            icon: "success",
            confirmButtonText: "Genial!"
        });

        formObj.name = ''
        formObj.phone = ''
        formObj.email = ''
        formObj.message = ''

        form.reset()

        checkFormInfo();
    }, 3000);
}