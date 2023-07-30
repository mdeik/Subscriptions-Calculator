// Add Subscription Button
const addButton = document.getElementById('add-button');
addButton.addEventListener('click', function () {
  const subscriptionName = prompt('Enter the name of the subscription:', searchBar.value);
  if (subscriptionName) {
    const subscriptionPrice = parseFloat(prompt('Enter the monthly price of the subscription:'));

    if (!isNaN(subscriptionPrice)) {
      const newSubscription = {
        name: subscriptionName,
        price: subscriptionPrice,
        icon: 'https://www.jobalign.com/wp-content/uploads/2017/07/Icon-Placeholder-1.png'
      };

      subscriptions.push(newSubscription);
      createSubscriptionItem(newSubscription);
      subscriptions.sort((a, b) => a.name.localeCompare(b.name));
      calculateExpenses();
    }
  }
});

// Import Button
const importButton = document.getElementById('import-button');
importButton.addEventListener('click', function () {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.json, .js';

  fileInput.addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', function (event) {
      try {
        const fileContent = event.target.result;
        const subscriptionsArrayMatch = fileContent.match(/subscriptions\s*=\s*(\[[^\]]*\])/);
        if (subscriptionsArrayMatch) {
          const importedSubscriptions = JSON.parse(subscriptionsArrayMatch[1]);
          if (Array.isArray(importedSubscriptions)) {
            // Clear existing subscriptions
            subscriptions.length = 0;
            // Add the imported subscriptions to the subscriptions array
            subscriptions.push(...importedSubscriptions);
            // Regenerate the subscription items
            subscriptionBox.innerHTML = '';
            checkboxes.length = 0;
            subscriptions.forEach(createSubscriptionItem);
            calculateExpenses();
          } else {
            alert('Invalid file format. Please provide a valid subscriptions array.');
          }
        } else {
          alert('Invalid file format. Please provide a valid subscriptions array.');
        }
      } catch (error) {
        alert('Error reading file. Please try again.');
      }
    });

    reader.readAsText(file);
  });

  fileInput.click();
});

// Export Button
const exportButton = document.getElementById('export-button');
exportButton.addEventListener('click', function () {
  const jsonData = JSON.stringify(subscriptions, null, 2);
  const data = `const subscriptions = ${jsonData};`;
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'subscriptions.json';
  a.click();
  URL.revokeObjectURL(url);
});

// Clear Button
const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', function () {
  subscriptions.length = 0;
  subscriptionBox.innerHTML = '';
  calculateExpenses();
});

function createSubscriptionItem(subscription) {
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
}

/* Context Menu

let contextMenu = null;

function createContextMenu(subscriptionItem) {
  if (contextMenu) {
    document.body.removeChild(contextMenu);
  }

  contextMenu = document.createElement('div');
  contextMenu.className = 'context-menu';

  const editOption = document.createElement('div');
  editOption.className = 'context-menu-option';
  editOption.textContent = 'Edit';
  editOption.addEventListener('click', function() {
    const newName = prompt('Enter the new name of the subscription:', subscriptionItem.subscription.name);
    if (newName) {
      const newPrice = parseFloat(prompt('Enter the new monthly price of the subscription:', subscriptionItem.subscription.price));
      if (!isNaN(newPrice)) {
        subscriptionItem.subscription.name = newName;
        subscriptionItem.subscription.price = newPrice;
        subscriptionItem.name.textContent = newName;
        subscriptionItem.price.textContent = `$${newPrice.toFixed(2)}/month`;
        calculateExpenses();
      }
    }
    document.body.removeChild(contextMenu);
    calculateExpenses();
  });

  const deleteOption = document.createElement('div');
  deleteOption.className = 'context-menu-option';
  deleteOption.textContent = 'Delete';
  deleteOption.addEventListener('click', function() {
    const index = subscriptions.indexOf(subscriptionItem.subscription);
    if (index > -1) {
      subscriptions.splice(index, 1);
      subscriptionBox.removeChild(subscriptionItem.parentElement);
      calculateExpenses();
    }
    document.body.removeChild(contextMenu);
    contextMenu = null;
  });

  contextMenu.appendChild(editOption);
  contextMenu.appendChild(deleteOption);

  return contextMenu;
}

// Event Listener for Right-click on Subscription
subscriptionBox.addEventListener('contextmenu', function(event) {
  event.preventDefault();
  const clickedItem = event.target.closest('.subscription-item');
  if (clickedItem) {
    const subscriptionItem = checkboxes.find(item => item.subscription === subscriptions.find(sub => sub.name === clickedItem.querySelector('.subscription-name').textContent));
    if (subscriptionItem) {
      const contextMenu = createContextMenu(subscriptionItem);
      contextMenu.style.top = event.clientY + 'px';
      contextMenu.style.left = event.clientX + 'px';
      document.body.appendChild(contextMenu);
    }
  }
});

// Close the context menu on click outside
document.addEventListener('click', function removeContextMenu(event) {
  if (contextMenu && !contextMenu.contains(event.target)) {
    document.body.removeChild(contextMenu);
    contextMenu = null;
  }
}); */