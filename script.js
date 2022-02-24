const username = document.querySelector('#username');
const pass = document.querySelector('#password');
const pass2 = document.querySelector('#password2');
const email = document.querySelector('#email');
const clearBtn = document.querySelector('.clear');
const sendBtn = document.querySelector('.send');
const popup = document.querySelector('.popup');

const showError = (input, msg) => {
  const showBox = input.parentElement;
  const errorMsg = showBox.querySelector('.error-text');
  showBox.classList.add('error');
  errorMsg.textContent = msg;
};

const clearError = (el) => {
  const showBox = el.parentElement;
  showBox.classList.remove('error');
};

const checkForm = (input) => {
  input.forEach((el) => {
    if (el.value === '') {
      showError(el, el.placeholder);
    } else {
      clearError(el);
    }
  });
};

const checkLength = (input, min) => {
  console.log();
  if (input.value.length < min) {
    showError(
      input,
      `${input.previousElementSibling.innerHTML.slice(
        0,
        -1
      )} requried min ${min} signs`
    );
  }
};

const checkPassword = (pass1, pass2) => {
  if (pass1.value !== pass2.value) {
    showError(pass2, 'Password is not the same!');
  }
};

const checkEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(email.value)) {
    clearError(email);
  } else {
    showError(email, 'Wrong e-mail!');
  }
};

const checkErrors = () => {
  const formBox = document.querySelectorAll('.form-box');
  let errors = 0;

  formBox.forEach((el) => {
    if (el.classList.contains('error')) {
      errors++;
    }
  });

  if (errors === 0) {
    popup.classList.add('show-popup');
  }
  console.log(errors);
};

sendBtn.addEventListener('click', (e) => {
  e.preventDefault();

  checkForm([username, pass, pass2, email]);
  checkLength(username, 3);
  checkLength(pass, 8);
  checkPassword(pass, pass2);
  checkEmail(email);
  checkErrors();
});

clearBtn.addEventListener('click', (e) => {
  e.preventDefault();

  [username, pass, pass2, email].forEach((el) => {
    el.value = '';
    clearError(el);
  });
});
