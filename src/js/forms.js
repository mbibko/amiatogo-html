import CustomSelect from 'vanilla-js-dropdown';
const vanillaTextMask = require("vanilla-text-mask/dist/vanillaTextMask.js");
import Bouncer from 'formbouncerjs'

;(function () {
  const elements = document.querySelectorAll('[data-field="phone"]');
  if (!elements) return;
  [].forEach.call(elements, function (el, i) {
    el.addEventListener('focus', () => {
      if (el.classList.contains('activated')) return;
      el.classList.add("activated");
      el.value = '+7 ('
    });

    vanillaTextMask.maskInput({
      inputElement: el,
      mask: ['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]
    })
  });
}());

[].forEach.call(document.querySelectorAll('.select'), item => {
  const select = new CustomSelect({
    elem: item
  });
  const selectEl = item.previousElementSibling
  const content = selectEl.querySelector('.js-Dropdown-list');
  content.style.setProperty('--max-height', content.scrollHeight + 'px')
});

[].forEach.call(document.querySelectorAll('.form-group'), group => {
  const input = group.querySelector('.form-control')
  input.addEventListener('focus', () => {
    group.classList.add('is-focused')
  });
  input.addEventListener('blur', () => {
    if(input.value.length) return
    group.classList.remove('is-focused')
  })
});

const validateConfig = {
  messages: {
    missingValue: {
      default: 'Поле не должно быть пустым'
    },
    patternMismatch: {
      email: 'Введите корректный email адрес',
      tel: 'Введите корректный телефон'
    },
    passConfirm: 'Пароли не совпадают',
    wrongLength: {
      under: 'Поле должно содержать не менее {minLength} символов.'
    }
  },
  customValidations: {
    passConfirm: field => {

      // Look for a selector for a field to compare
      // If there isn't one, return false (no error)
      const selector = field.getAttribute('data-bouncer-match');
      if (!selector) return false;

      // Get the field to compare
      const otherField = field.form.querySelector(selector);
      if (!otherField) return false;

      // Compare the two field values
      // We use a negative comparison here because if they do match, the field validates
      // We want to return true for failures, which can be confusing
      return otherField.value !== field.value;

    }
  }
};

new Bouncer('.js-validate', {
  errorClass: 'help-text error-message',
  messages: Object.assign(validateConfig.messages, {}),
  customValidations: Object.assign(validateConfig.customValidations, {}),
  disableSubmit: true,
  emitEvents: true
});

document.addEventListener('bouncerFormValid', (event) => {
  let form = event.target,
      container = form.parentNode,
      data = new FormData(form),
      action = form.dataset.action;

  if (!action) return;

  fetch(action, {
    method: 'POST',
    headers: {'X-Requested-With': 'XMLHttpRequest'},
    body: data
  }).then(response => response.json()
  ).then((response) => {
    if (
        response.hasOwnProperty('STATUS')
        && response.STATUS === 'SUCCESS'
    ) {
      let success = container.querySelector('.form-message_success');

      success.classList.remove('form-message_hidden');
      form.reset();
      form.querySelector('input[name="key"]').value = '';
      form.style.display = 'none';
    } else {
      let error = container.querySelector('.form-message_error');

      error.classList.remove('form-message_hidden');
      form.style.display = 'none';
    }
  });
}, false);

document.addEventListener('DOMContentLoaded', () => {
  [].forEach.call(document.querySelectorAll('form'), form => {
    [].forEach.call(form.querySelectorAll('input'), input => {
      input.addEventListener('input', () => {
        let key = form.querySelector('input[name="key"]');

        if (key.value === undefined || !key.value) {
          key.value = Date.now();
        }
      });
    });
  });

  [].forEach.call(document.querySelectorAll('.form-message__button'), button => {
    button.addEventListener('click', (e) => {
      let button = e.target,
          container = button.closest('.join__form'),
          form = container.querySelector('form'),
          message = button.closest('.form-message');

      message.classList.add('form-message_hidden');
      form.style.display = 'unset';
    });
  });
});

