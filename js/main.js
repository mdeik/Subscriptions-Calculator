// Sort subscriptions in alphabetical order
subscriptions.sort((a, b) => a.name.localeCompare(b.name));

const subscriptionBox = document.getElementById('subscription-box');
const checkboxes = [];

subscriptions.forEach(function (subscription) {

  const item = document.createElement('div');
  item.className = 'subscription-item';

  const icon = document.createElement('img');
  icon.className = 'subscription-icon';
  icon.src = subscription.icon;
  icon.alt = `${subscription.name} Icon`;
  item.appendChild(icon);

  const details = document.createElement('div');
  details.className = 'subscription-details';

  const namePriceGroup = document.createElement('div');
  namePriceGroup.className = 'name-price-group';

  const name = document.createElement('span');
  name.className = 'subscription-name';
  name.textContent = subscription.name;
  namePriceGroup.appendChild(name);

  const price = document.createElement('span');
  price.className = 'subscription-price';
  price.textContent = `$${subscription.price.toFixed(2)}/month`;
  namePriceGroup.appendChild(price);

  details.appendChild(namePriceGroup);

  const customPriceInput = document.createElement('input');
  customPriceInput.type = 'text';
  customPriceInput.className = 'custom-price-input';
  customPriceInput.placeholder = 'Custom price';
  details.appendChild(customPriceInput);

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'subscription-checkbox';
  details.appendChild(checkbox);

  item.appendChild(details);

  subscriptionBox.appendChild(item);

  checkboxes.push({
    checkbox: checkbox,
    price: price,
    customPriceInput: customPriceInput,
    subscription: subscription
  });
});

const dailyExpense = document.getElementById('daily-expense');
const monthlyExpense = document.getElementById('monthly-expense');
const yearlyExpense = document.getElementById('yearly-expense');
const searchBar = document.getElementById('search-bar');

checkboxes.forEach(function ({ checkbox, price, customPriceInput }) {
  checkbox.addEventListener('change', function () {
    calculateExpenses();
  });

  customPriceInput.addEventListener('input', function () {
    calculateExpenses();
  });
});

searchBar.addEventListener('input', function () {
  filterSubscriptions(searchBar.value.toLowerCase());
});

function filterSubscriptions(searchTerm) {
  checkboxes.forEach(function ({ checkbox, subscription }) {
    const item = checkbox.parentElement.parentElement;
    const subscriptionName = subscription.name.toLowerCase();
    if (subscriptionName.startsWith(searchTerm)) {
      item.style.display = 'flex';
    } else if (subscriptionName.indexOf(' ' + searchTerm) !== -1) {
      item.style.display = 'flex';
    } else if (subscriptionName.includes(searchTerm)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function calculateExpenses() {
  let dailyTotal = 0.00;
  let monthlyTotal = 0.00;
  let yearlyTotal = 0.00;

  checkboxes.forEach(function ({ checkbox, price, customPriceInput, subscription }) {
    if (checkbox.checked) {
      const subscriptionPrice = parseFloat(customPriceInput.value) || subscription.price;
      dailyTotal += subscriptionPrice;
      monthlyTotal += subscriptionPrice;
      yearlyTotal += subscriptionPrice;
    }
  });

  dailyTotal /= 30; // Assuming 30 days in a month
  yearlyTotal *= 12; // Assuming 365 days in a year

  // Update the expenses text content correctly
  dailyExpense.querySelector('.number').textContent = dailyTotal.toFixed(2);
  monthlyExpense.querySelector('.number').textContent = monthlyTotal.toFixed(2);
  yearlyExpense.querySelector('.number').textContent = yearlyTotal.toFixed(2);
}

// Event listener for dynamically added checkboxes
subscriptionBox.addEventListener('change', function (event) {
  if (event.target.classList.contains('subscription-checkbox') || event.target.classList.contains('custom-price-input')) {
    calculateExpenses();
  }
});

// Event listener for dynamically added custom price inputs
subscriptionBox.addEventListener('input', function (event) {
  if (event.target.classList.contains('custom-price-input')) {
    calculateExpenses();
  }
});
