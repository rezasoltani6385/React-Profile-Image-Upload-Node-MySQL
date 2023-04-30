# React Profile Image Upload with Node.js and MySQL

This web application allows users to upload and manage their profile pictures, and it includes a simple user registration and login system. The frontend of the application is built with React, and the backend is built with Node.js and Express. The application uses a MySQL database to store user data and profile images, and it also includes some styling with Bootstrap.

## Installation

To install this application, follow these steps:

1.  Clone the repository: `git clone https://github.com/rezasoltani6385/React-Profile-Image-Upload-Node-MySQL.git`
    
2.  Install the dependencies for the frontend: `cd client && npm install`
    
3.  Install the dependencies for the backend: `cd server && npm install`
    
4.  Create a MySQL database:

## Database Structure

### Tables

#### users

| Field         | Type         | Null | Key | Default | Extra          |
|---------------|--------------|------|-----|---------|----------------|
| id       | int(11)      | NO   | PRI | NULL    | auto_increment |
| username     | varchar(255) | NO   | UNI | NULL    |                |                |
| password     | varchar(255) | NO   |     | NULL    |                |

#### personal_info

| Field            | Type         | Null | Key | Default | Extra          |
|------------------|--------------|------|-----|---------|----------------|
| id         | int(11)      | NO   | PRI | NULL    | auto_increment |
| user_id          | int(11)      | NO   |     | NULL    |                |
| first_name   | varchar(60) | NO   |     | NULL    |                |
| last_name   | varchar(60) | NO   |     | NULL    |                |
| birth_date   | date | NO   |     | NULL    |                |
| mobile| varchar(11) | NO   |     | NULL    |                |
| city   | varchar(50) | NO   |     | NULL    |                |
| address| varchar(255) | YES|     | NULL    |                |
| profile_pic| varchar(255)| Yes|     | NULL    |                |


 
6.  Start the backend server: `cd server && npx nodemon server.js`
    
7.  Start the frontend server: `cd client && npm start`
    
8.  Access the application at `http://localhost:3000`
    

## Usage

To use this application, follow these steps:

1.  Register a new user account.
2.  Log in with your new user account.
3.  Click the "Upload Image" button to upload a new profile picture.
4.  Your new profile picture will be displayed on your profile page.

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! If you have any suggestions, please create an issue or submit a pull request.

## Credits

This application was created by Reza Soltani. 
