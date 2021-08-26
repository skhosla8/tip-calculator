function calculate() {
  const billValue = document.querySelector('#input-bill');
  const numberUsersValue = document.querySelector('#input-users');
  const tipValue = document.querySelector('.form-select');
  const loader = document.querySelector('.loader');
  const resultDiv = document.querySelector('.result');
  const resultTip = document.querySelector('#result-tip');
  const resultTotal = document.querySelector('#result-total');
  const resultEachOwes = document.querySelector('#result-each-owes');

  let percentTip = '';

  if (tipValue.value === '20') {
    percentTip = 0.2;
  } else if (tipValue.value === '10') {
    percentTip = 0.1;
  } else {
    percentTip = 0.02;
  }

  const tipAmount = Number(billValue.value) * percentTip;
  const totalAmount = Number(billValue.value) + tipAmount;
  const individualTip = tipAmount / Number(numberUsersValue.value);
  const eachPersonOwes =
    Number(billValue.value / numberUsersValue.value) + individualTip;

  const alertPresent = alert(billValue, numberUsersValue, tipValue);

  if (!alertPresent) {
    loader.classList.add('show');

    setTimeout(function () {
      loader.classList.remove('show');
      resultDiv.classList.add('show');
    }, 3000);

    resultDiv.style.paddingTop = '0.3rem';
    resultDiv.style.paddingBottom = '1rem';
    resultTip.textContent = `Tip Amount: $${tipAmount.toFixed(2)}`;
    resultTotal.textContent = `Total Amount: $${totalAmount.toFixed(2)}`;
    resultEachOwes.textContent = `Each Person Owes: $${eachPersonOwes.toFixed(
      2
    )}`;

    setTimeout(function () {
      document.querySelector('form').reset();
      resultDiv.classList.remove('show');
    }, 6000);
  }
}

const alert = function (billValue, numberUsersValue, tipValue) {
  const feedback = document.querySelector('.feedback');
  let isFeedback = false;

  if (billValue.value === '' || billValue.value <= '0') {
    feedback.classList.add('alert', 'alert-danger');
    feedback.innerHTML += `<p>Bill amount cannot be blank</p>`;
    isFeedback = true;
  }

  if (numberUsersValue.value <= '0') {
    feedback.classList.add('alert', 'alert-danger');
    feedback.innerHTML += `<p>Number of users must be greater than zero</p>`;
    isFeedback = true;
  }

  if (tipValue.value === '') {
    feedback.classList.add('alert', 'alert-danger');
    feedback.innerHTML += `<p>You must select a Service</p>`;
    isFeedback = true;
  }

  setTimeout(function () {
    feedback.classList.remove('alert', 'alert-danger');
    feedback.innerHTML = '';
  }, 2000);

  return isFeedback;
};

document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();
  calculate();
});
