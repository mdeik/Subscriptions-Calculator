# Subscription Calculator

## Overview

The Subscription Calculator is a web application designed to help users keep track of their monthly and yearly subscription expenses. Users can add, edit, delete, import, and export subscriptions, and the calculator will automatically update the total expenses accordingly. This README provides an overview of the project's structure and functionality.

## Project Structure

The project consists of three main files:

1. **index.html**: This file defines the structure of the web page, including the user interface elements like subscription items, buttons, and input fields.

2. **main.js**: This JavaScript file is responsible for the core functionality of the application. It handles the sorting of subscriptions, dynamically creating subscription items, calculating expenses, and filtering subscriptions based on search terms.

3. **buttons.js**: This JavaScript file manages the event listeners for various buttons, including adding, importing, exporting, and clearing subscriptions.

4. **subscriptions.js**: This JavaScript file stores the default subscriptions.

## Usage

### Adding Subscriptions

- Click the "Add Subscription" button to add a new subscription.
- Enter the name of the subscription and its monthly price in the prompts.
- The new subscription will be added to the list and the expenses will update accordingly.

### Importing Subscriptions

- Click the "Import" button to import subscriptions from a JSON file.
- Select a valid JSON file containing an array of subscriptions.
- The existing subscriptions will be replaced with the imported ones.

### Exporting Subscriptions

- Click the "Export" button to export the current subscriptions to a JSON file.
- A JSON file named "subscriptions.json" will be downloaded with your subscriptions.

### Clearing Subscriptions

- Click the "Clear" button to remove all subscriptions from the list.

### Searching Subscriptions

- Use the search bar to filter subscriptions based on the entered text.
- Subscriptions whose names contain the search term will be displayed, and others will be hidden.

### Calculating Expenses

- The daily, monthly, and yearly expenses are automatically calculated based on selected subscriptions.
- Checkbox selection and custom price inputs are considered in the calculations.

## Implementation Details

- Subscriptions are stored as objects with properties for name, price, and an icon URL.
- The `calculateExpenses` function updates the total expenses based on selected subscriptions.
- The code uses event listeners to respond to changes in checkboxes, custom price inputs, and the search bar.
- Subscriptions are sorted alphabetically for better organization.
- Subscription items are dynamically created and appended to the subscription box.

## Future Enhancements

- Allow of deletion of individual/selected subscriptions
- Improve the user interface with styling and responsive design.
