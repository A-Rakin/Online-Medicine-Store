# Online Medicine Store

A web-based e-commerce platform for purchasing medicines online with secure authentication, inventory management, and order tracking capabilities.

## Features

### Customer Features
- User registration and authentication
- Browse and search medicines by name, category, or vendor
- Shopping cart with quantity management
- Order placement and tracking
- Invoice generation
- Product reviews and ratings
- Wishlist functionality
- Filter by age group, category, and availability

### Admin Features
- Admin dashboard with store overview
- Inventory management (add, update, delete medicines)
- Category and vendor management
- Order processing and delivery assignment
- Stock tracking and monitoring
- Discount offer management
- Analytics and performance tracking
- User account management

## Technologies Used

**Frontend:** HTML5, CSS3, JavaScript, Bootstrap  
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**Payment Gateway:** SSLCommerz  

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Git

### Setup Instructions

1. Clone the repository
   ```bash
   git clone https://github.com/A-Rakin/Online-Medicine-Store.git
   cd Online-Medicine-Store
   ```

2. Install backend dependencies
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies
   ```bash
   cd ../frontend
   npm install
   ```

4. Configure environment variables
   - Create a `.env` file in the `backend` folder
   - Add the following variables:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     SSLCOMMERZ_STORE_ID=your_store_id
     SSLCOMMERZ_STORE_PASSWORD=your_store_password
     ```

5. Start the application
   ```bash
   # Start backend server
   cd backend
   npm start

   # Start frontend (in a new terminal)
   cd frontend
   npm start
   ```

6. Access the application at `http://localhost:3000`

## Project Structure

```
Online-Medicine-Store/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## Screenshots
![Screenshot_29-1-2026_04036_localhost](https://github.com/user-attachments/assets/619c5b64-a30b-45cd-a357-684d81ce7327)
![Screenshot_29-1-2026_04244_localhost](https://github.com/user-attachments/assets/8ecf5b34-7871-4f11-9aac-fca9625a00d5)
![Screenshot_29-1-2026_0432_localhost](https://github.com/user-attachments/assets/aa96853f-e685-448c-92ad-6303b11e3a24)

## Contributors

### Abrar Rakin (Backend Developer)
**GitHub:** [@A-Rakin](https://github.com/A-Rakin)  
**Contributions:**
- Backend environment configuration and setup
- Product model development and database schema design
- Product routing and controller implementation
- Environment variables and security configuration
- Package management and dependency updates


### Shamsun Nahar Nitu (Frontend Developer)
**GitHub:** [@Shamsun-Nahar-Nitu](https://github.com/Shamsun-Nahar-Nitu)  
**Contributions:**
- Frontend UI design and modifications
- Medicine display pages and product views
- Medicine image integration
- User interface improvements
- Homepage and index page updates
- Documentation

### Noshin Tabassum (Full Stack Developer)
**GitHub:** [@tabazzssum](https://github.com/tabazzssum)  
**Contributions:**
- SSLCommerz payment gateway integration
- Payment routes and controllers setup
- Shopping cart functionality and updates
- Server configuration and backend updates
- Node modules cleanup and project optimization
- Bug fixes and issue resolution


## License

This project is licensed under the MIT License.

## Contact

For questions or support, please open an issue on [GitHub](https://github.com/A-Rakin/Online-Medicine-Store/issues).
