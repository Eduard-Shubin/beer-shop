
### Overview

This repository contains a prototype for an online store. It demonstrates the basic functionalities of an e-commerce website, including product listing, product details, cart, and checkout features.

### Getting Started

To get the project up and running locally, make sure you have the latest versions of Node.js and npm installed.

#### Installation and Running

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the project dependencies using `npm install`.
4. Start the development server using `npm run dev`.

The application will be running on your local development server. You can access it by navigating to `http://localhost:5173` in your web browser (or whichever port you have configured).

### Components and Features

The project includes the following key components:

- [`Product`](src/components/Product/Product.jsx): A component for displaying product information.
- [`CheckoutPage`](src/components/CheckoutPage/CheckoutPage.jsx): The checkout page with a form and payment functionality.
- [`ProductDetails`](src/components/ProductDetails/ProductDetails.jsx): A detailed product page with in-depth information.
- [`ProductDetailsModal`](src/components/ProductDetailsModal/ProductDetailsModal.jsx): A modal window showing product details.
- [`CompletedOrder`](src/components/CompletedOrder/CompletedOrder.jsx): A page showing the successful completion of an order.

### Routing

The project uses `react-router-dom` for navigation. Here are the main routes:

- Home page with a list of products: `/`
- Product details page: `/product/:id`
- Cart: `/cart`
- Checkout: `/checkout`
- Successful order completion page: `/completed`
