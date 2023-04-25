const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const fs = require('fs');


const app = express();
const port = 5000;


// Set maximum file size limit to 50MB
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const mysql = require('mysql2');

// create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test',
});

// Serve static files from the uploads subfolder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define routes here
app.get('/users', (req, res) => {
  const userName = req.query.userName
  db.query('SELECT * FROM users WHERE username = ?', [userName],
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/users", (req, res) => {
  const userName = req.body.userName
  const password = req.body.password

  db.query(
    "INSERT INTO users (username, password) VALUES (?,?)", [userName, password], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});


app.get('/personal_info', (req, res) => {
  const userId = req.query.user_id
  db.query('SELECT * FROM personal_info WHERE user_id = ?', [userId],
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.post("/personal_info", (req, res) => {
  const userId = req.body.userId
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const birthDate = req.body.birthDate
  const mobile = req.body.mobile
  const city = req.body.city
  const address = req.body.address
  const profile_pic = '/ProfilePics/avatar.jpg'
  
  db.query(
    "INSERT INTO personal_info (user_id, first_name, last_name, birth_date, mobile, city, address) VALUES (?,?,?,?,?,?,?,?)", 
    [userId, firstName, lastName, birthDate, mobile, city, address, profile_pic], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});


app.post("/upload", (req, res) => {
  const data = req.body.imageData;
  const userId = req.body.userId
  const base64Data = data.replace(/^data:image\/png;base64,/, '');
  const fileName = `profile_photo_${userId}_${Date.now()}.png`
  const filePath = path.join(__dirname, 'uploads', fileName);

  fs.writeFile(filePath, base64Data, 'base64', (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error saving profile photo' });
    } else {
      db.query(
        "UPDATE personal_info SET profile_pic = ? WHERE user_id = ?", [profile_pic, user_id],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
            res.send({ message: 'Profile photo saved successfully' });
          }
        }
      )
      // res.json({ message: 'Profile photo saved successfully' });
    }
  });

})


  
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
