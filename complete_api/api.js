// // // const mysql = require('mysql2');
// // // var express = require('express');
// // // var bodyParser = require('body-parser');

// // // const { request, response } = require('express');
// // // var app  = express();
// // // var router = express.Router();
// // // // create a new MySQL connection
// // // const connection = mysql.createConnection({
// // //   host: 'localhost',
// // //   port:3305,
// // //   user: 'root',
// // //   password: 'akash',
// // //   database: 'dsrt'
// // // });
// // // // connect to the MySQL database
// // // connection.connect(function (err) {
// // //     if (err) {
// // //         console.log("Error in the connection")
// // //         console.log(err)
// // //     }
// // //     else {
// // //         console.log(`Database Connected`)
// // //         connection.query(`SHOW DATABASES`,
// // //             function (err, result) {
// // //                 if (err)
// // //                     console.log(`Error executing the query - ${err}`)
// // //                 else
// // //                     console.log("Result: ", result)
// // //             })
// // //     }
// // // })
// // // // close the MySQL connection

// // // connection.end()
// // const express = require('express');
// // const app = express();
// // const bodyParser = require('body-parser');
// // // const bcrypt = require('bcrypt');
// // const mysql = require('mysql');
// // const cors = require('cors');

// // Configure the database connection
// // const connection = mysql.createConnection({
// //   host: 'localhost',
// //   user: 'root',
// //   port:3306,
// //   password: 'akash',
// //   database: 'dsrt',
// // });

// // connection.connect((err) => {
// //   if (err) {
// //     console.error('Database connection error:', err);
// //     return;
// //   }
// //   console.log('Connected to the database');
// // });

// // // Parse JSON request bodies
// // app.use(bodyParser.json());
// // app.use(cors());
// // // app.use(express.json())

// // // Register user endpoint
// // // app.post('/user/register', (req, res) => {
// // //   try {
// // //     console.log(req);
// // //     let { name, username, password } = req.body;
// // //     console.log('Received registration data:', req.body);

// // //     // Validate the request
// // //     if (name && username && password) {
// // //       const hashedPassword = bcrypt.hashSync(password, 10);

// // //       // Check if the username already exists
// // //       const checkUsernameQuery = SELECT * FROM users WHERE username = ?;
// // //       connection.query(checkUsernameQuery, [username], (err, result) => {
// // //         if (err) {
// // //           console.error('Registration query error:', err);
// // //           res.status(201).json({ message: 'An error occurred' });
// // //         } else if (result.length > 0) {
// // //           // Username already exists
// // //           console.log('Username already exists:', username);
// // //           res.status(201).json({ message: 'Username already exists' });
// // //         } else {
// // //           // Insert the data into the database
// // //           const insertUserQuery = INSERT INTO users (name, username, password) VALUES (?, ?, ?);
// // //           connection.query(insertUserQuery, [name, username, hashedPassword], (err, result) => {
// // //             if (err) {
// // //               console.error('Failed to register user:', err);
// // //               res.status(201).json({ message: 'Failed to register user' });
// // //             } else {
// // //               const user = {
// // //                 id: result.insertId,
// // //                 username: username,
// // //               };
// // //               console.log('User registered successfully:', user);
// // //               res.status(201).json({ message: 'User registered successfully', user });
// // //             }
// // //           });
// // //         }
// // //       });
// // //     } else {
// // //       console.log('Invalid registration request:', req.body);
// // //       res.status(201).json({ message: 'Invalid request' });
// // //     }
// // //   } catch (error) {
// // //     console.error('Error parsing request body:', error);
// // //     res.status(201).json({ message: 'Invalid JSON data' });
// // //   }
// // // });

// // // Authenticate user endpoint
// // // app.post('/user/authenticate', (req, res) => {
// // //   try {
// // //     const { username, password } = req.body;
// // //     console.log('Received authentication data:', req.body);

// // //     // Validate the request
// // //     if (username && password) {
// // //       // Check if the username exists in the users table
// // //       const sql = SELECT * FROM users WHERE username = ?;
// // //       connection.query(sql, [username], (err, result) => {
// // //         if (err) {
// // //           console.error('Authentication query error:', err);
// // //           res.status(500).json({ message: 'Database query failed' });
// // //         } else if (result.length > 0) {
// // //           const user = result[0];

// // //           // Verify the password
// // //           const hashedPassword = user.password;
// // //           if (bcrypt.compareSync(password, hashedPassword)) {
// // //             // Password is correct, user is authenticated
// // //             const response = {
// // //               authenticated: true,
// // //               'mobile/email': user.username,
// // //               name: user.name,
// // //             };
// // //             console.log('User authenticated:', user.username);
// // //             res.json(response);
// // //           } else {
// // //             // Password is incorrect
// // //             console.log('Incorrect password for user:', user.username);
// // //             res.json({ authenticated: false, debug: 'Incorrect password' });
// // //           }
// // //         } else {
// // //           // Username does not exist
// // //           console.log('Username does not exist:', username);
// // //           res.json({ authenticated: false, debug: 'Username does not exist' });
// // //         }
// // //       });
// // //     } else {
// // //       console.log('Invalid authentication request:', req.body);
// // //       res.status(201).json({ message: 'Invalid request' });
// // //     }
// // //   } catch (error) {
// // //     console.error('Error parsing request body:', error);
// // //     res.status(201).json({ message: 'Invalid JSON data' });
// // //   }
// // // });

// // // Start the server
// // app.listen(3001, () => {
// //   console.log('Server is running on port 3001');
// // });
// // const {createPool}=require('mysql') ;
// // const pool = createPool({
// //     host:"localhost",
// //     user:"root",
// //     port:3305,
// //     password:"akash",
// //     // database:"dsrt",
// //     // connectionLimit:10
// // })

// // pool.query(`SELECT * FROM dsrt.login;`,(err,result,fields)=>{
// //     if(err){
// //         return console.log(err)
// //     }
// //     return console.log(result)
// // })

// // const express = require('express');
// // const app = express();
// // const bodyParser = require('body-parser');
// // const bcrypt = require('bcrypt');
// // const mysql = require('mysql');
// // const cors = require('cors');

// // var  Db = require('./dboperations');
// // var  Order = require('./Order');
// // var  express = require('express');
// // var  bodyParser = require('body-parser');
// // var  cors = require('cors');
// // var  app = express();
// // var  router = express.Router();

// // app.use(bodyParser.urlencoded({ extended:  true }));
// // app.use(bodyParser.json());
// // app.use(cors());
// // app.use('/api', router);

// // var connection = mysql.createConnection({
// //   host: 'localhost',
// //   user: 'sqluser',
// //   password: 'password',
// //   database:'dsrt',
// //   port: 3306,
// // });

// //Parse JSON request bodies
// app.use(bodyParser.json());
// app.use(cors());
// // app.use(express.json())
// // connection.connect(function(err) {
// //   if (err) throw err;
// //   console.log("Connected!");
// // });

// // var  Db = require('./dboperations');
// ''''''''''''''''''''''
// const jwt = require('jsonwebtoken');
// const db = mysql.createConnection({
//     user:  'sqluser', // sql user
//     password:  'password', //sql user password
//     server:  '127.0.0.1', // if it does not work try- localhost
//     database:  'dsrt',
//     options: {
//       trustedconnection:  true,
//       enableArithAbort:  true,
//       instancename:  'SQLEXPRESS'  // SQL Server instance name
//     },
//     port:3306
//   });

//   const pool = mysql.createPool(db);

// app.use((request, response, next) => {
//     console.log('middleware');
//     next();
//   });

//   app.post('/login', async (req, res) => {
//     const { username, password } = req.body;

//     try {
//       // Get a connection from the pool
//       const connection = await pool.getConnection();

//       // Query the database to find a user with the provided username and password
//       const [rows] = await connection.execute('SELECT * FROM login WHERE username = ? AND password = ?', [username, password]);

//       // Release the connection back to the pool
//       connection.release();

//       if (rows.length === 0) {
//         return res.status(401).json({ message: 'Invalid username or password' });
//       }

//       // Create a JWT token
//       const token = jwt.sign({ user: { id: rows[0].id, username: rows[0].username } }, secretKey, {
//         expiresIn: '1h', // Token expires in 1 hour (adjust as needed)
//       });

//       res.json({ token });
//     } catch (error) {
//       console.error('Error during authentication:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   });

//   ''''''''''''''''''''''''''''''''''

// //   app.get('/login', (req, res) => {
//   //   router.route('/login').get((req, res) => {
//   //   const query = 'SELECT * FROM login';
//   //   // console.log(query)
//   //   // Execute the query
//   //   db.query(query, (err, results) => {
//   //     if (err) {
//   //       console.error('Error executing query:', err);
//   //       res.status(500).send('Internal Server Error');
//   //       return;
//   //     }

//   //     // Send the results as JSON
//   //     // console.log(results)
//   //     res.json(results);
//   //   });
//   // });

//   // router.route('/orders').get((request, response) => {
//   //   Db.getLogin().then((data) => {
//   //     response.json(data);
//   //   })
//   // })\
//   '''''''''''''''''
// var  port = process.env.PORT || 8090;
// app.listen(port);
// console.log('Order API is runnning at ' + port);
// '''''''''''
// // ......................................................................
// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const mysql = require('mysql');
// const cors = require('cors');

// var  Db = require('./dboperations');

// app.use(bodyParser.urlencoded({ extended:  true }));
// app.use(bodyParser.json());
// app.use(cors());

// server.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
// const mysql = require('mysql2/promise');

// const app = express();
// // const port = 3306;
// const secretKey = 'your-secret-key'; // Change this to a strong and unique secret key

// // MySQL database connection configuration
// const dbConfig = {
//   host: '127.0.0.1',
//   user: 'sqluser',
//   password: 'password',
//   database: 'dsrt',
//   port:3306
// };

// // Create a MySQL connection pool
// const pool = mysql.createPool(dbConfig);

// app.use(bodyParser.json());

// ...

// server.js
const express = require("express");

const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const mysql2Promise = require("mysql2/promise");
// const MySQLStore = require("express-mysql-session")(session);
const mysql = require("mysql");
// const session = require("express-session");

const cors = require("cors"); // Import the cors middleware
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");

// const pool = require('./pool');

const app = express();
// y
const port = 3001;
const secretKey = "your-secret-key"; // Change this to a strong and unique secret key
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

const dbConfig = {
  host: "127.0.0.1",
  user: "root",
  password: "akash",
  database: "dsrt",
};

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "akash",
  database: "dsrt",
});
connection.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
    return;
  }
  console.log("Connected to the database");
});

const pool = mysql2Promise.createPool(dbConfig);

app.use(cors()); // Use cors middleware
app.use(bodyParser.json());

// ... (rest of your code)
//(forgot_start)

// const sessionStore = new MySQLStore(
//   {
//     expiration: 86400000, // Session expiration time in milliseconds (optional)
//     createDatabaseTable: true, // Whether to create the sessions table if it doesn't exist
//     schema: {
//       tableName: "sessions", // Customize the session table name if needed
//       columnNames: {
//         session_id: "session_id",
//         expires: "expires",
//         data: "data",
//       },
//     },
//   },
//   connection
// );

// app.use(
//   session({
//     secret: "your-secret-key",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// console.log(session)

const avatarsDirectory = path.join(__dirname, "avatars");

app.use("/avatars", express.static(avatarsDirectory));

const generateVerificationToken = () => {
  //  console.log("aa")
  return crypto.randomBytes(20).toString("hex"); // Generate a random string
};

// Send verification email
const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "akasha.ug20.it@francisxavier.ac.in",
      pass: "akash@123@kavitha",
    },
  });

  const mailOptions = {
    from: "akasha.ug20.it@francisxavier.ac.in",
    to: email,
    subject: "Email Verification",
    text:
      `You are receiving this email to verify your email address.\n\n` +
      `Your One Time Password is valid for 5 minutes\n\n` +
      `Please enter this One Time Password=${verificationToken}\n\n` +
      `If you did not request this, please ignore this email.\n`,
  };

  await transporter.sendMail(mailOptions);
};

// Endpoint for initiating password change and email verification
app.post("/api/request_password_change", async (req, res) => {
  const { email } = req.body;
  console.log(email);

  try {
    // Check if the user exists in the database
    const [userRows] = await pool.query("CALL password_verification( ? )", [
      email,
    ]);
    const Id = userRows[0][0].student_id;
    // console.log(Id);
    if (userRows[0].length !== 1) {
      return res.status(404).json({ error: "User not found" });
    }

    const verificationToken = generateVerificationToken();
    console.log(verificationToken);
    const expiresAt = new Date(Date.now() + 24 * 3600 * 1000); // Token expires in 24 hours

    // Store the verification token in the database
    await pool.query(
      "INSERT INTO password_reset_verification (email, token, expires_at,id) VALUES (?, ?, ?, ?)",
      [email, verificationToken, expiresAt, Id]
    );

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    res.status(200).json({ message: "Verification email sent successfully" });
  } catch (error) {
    console.error("Error requesting password change:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for verifying email and changing password
app.post("/api/verify_email_and_change_password", async (req, res) => {
  //  console.log("New New")
  const { email, verificationToken, newPassword } = req.body;

  try {
    // Verify the verification token
    const [verificationRows] = await pool.query(
      "SELECT * FROM password_reset_verification WHERE email = ? AND token = ? AND expires_at > NOW()",
      [email, verificationToken]
    );
    console.log(verificationRows);
    const id = verificationRows[0].id;
    console.log(id);
    if (verificationRows.length !== 1) {
      return res
        .status(401)
        .json({ error: "Invalid verification token or token expired" });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    // Update the user's password in the database
    await pool.query("UPDATE login SET password = ? WHERE user_id = ?", [
      hashedPassword,
      id,
    ]);

    // Delete the verification token from the database
    await pool.query(
      "DELETE FROM password_reset_verification WHERE email = ?",
      [email]
    );

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error verifying email and changing password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/verify_email", async (req, res) => {
  const { token } = req.query;
  console.log(token);

  try {
    // Decode the token to retrieve token information
    const decodedToken = jwt.verify(token, secretKey);
    console.log(decodedToken);

    // Extract email address from decoded token
    const email = decodedToken.email;
    console.log("Email:", email);

    // Verify the token against the database and perform necessary actions
    // For example: Change password

    // Implement your logic here based on the token provided
    // For example:
    // 1. Verify the token against the database
    // 2. If valid, allow the user to reset the password
    // 3. If invalid or expired, display an error message

    // Send a response indicating the verification status
    res.status(200).send("Token verified successfully");
  } catch (error) {
    console.error("Error decoding token:", error);
    res.status(401).send("Invalid token");
  }
});

//(forgot_end)
// Login endpoint
// '''''''''''''''''''''''''''''''''
app.post("/user/register", (req, res) => {
  try {
    // console.log(req);
    let { user_id, type, password } = req.body;
    console.log("Received registration data:", req.body);

    // Validate the request
    if (user_id && type && password) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      // console.log(hashedPassword)

      // Check if the username already exists
      const checkUsernameQuery = "SELECT * FROM login WHERE user_id = ?";
      connection.query(checkUsernameQuery, [user_id], (err, result) => {
        // console.log("gdj")
        if (err) {
          console.error("Registration query error:", err);
          res.status(201).json({ message: "An error occurred" });
        } else if (result.length > 0) {
          // Username already exists
          console.log("Username already exists:", user_id);
          res.status(201).json({ message: "Username already exists" });
        } else {
          console.log(user_id);
          // Insert the data into the database
          const insertUserQuery =
            "INSERT INTO login (user_id, type, password) VALUES (?, ?, ?)";

          connection.query(
            insertUserQuery,
            [user_id, type, hashedPassword],
            (err, result) => {
              if (err) {
                console.error("Failed to register user:", err);
                res.status(201).json({ message: "Failed to register user" });
              } else {
                const user = {
                  // id: result.auto_increment_id,
                  username: user_id,
                };
                console.log("User registered successfully:", user);
                res
                  .status(201)
                  .json({ message: "User registered successfully", user });
              }
            }
          );
        }
      });
    } else {
      console.log("Invalid registration request:", req.body);
      res.status(201).json({ message: "Invalid request" });
    }
  } catch (error) {
    console.error("Error parsing request body:", error);
    res.status(201).json({ message: "Invalid JSON data" });
  }
});

app.post("/login", (req, res) => {
  try {
    const { user_id, password } = req.body;
    console.log("Received authentication data:", req.body);

    // Validate the request
    if (user_id && password) {
      // Check if the username exists in the users table
      const sql = "SELECT * FROM login WHERE user_id = ?";
      connection.query(sql, [user_id], (err, results) => {
        if (err) {
          console.error("Authentication query error:", err);
          res.status(500).json({ message: "Database query failed" });
        } else if (results.length > 0) {
          const user = results[0];

          // Verify the password
          const hashedPassword = user.password;
          if (bcrypt.compareSync(password, hashedPassword)) {
            // Password is correct, user is authenticated
            const response = {
              authenticated: true,
              type: user.type,
              name: user.user_id,
            };

            console.log("User authenticated:", user.user_id);
            // Example: After successful login
            // req.session.username = user.user_id;
            // console.log("Login Api", req.session); // Store username in session

            res.json({
              success: true,
              userType: results[0].type,
              userName: results[0].user_id,
            });
          } else {
            // Password is incorrect
            console.log("Incorrect password for user:", user.user_id);
            res.json({ authenticated: false, debug: "Incorrect password" });
          }
        } else {
          // Username does not exist
          console.log("Username does not exist:", user_id);
          res.json({ authenticated: false, debug: "Username does not exist" });
        }
      });
    } else {
      console.log("Invalid authentication request:", req.body);
      res.status(201).json({ message: "Invalid request" });
    }
  } catch (error) {
    console.error("Error parsing request body:", error);
    res.status(201).json({ message: "Invalid JSON data" });
  }
});

app.post("/profile/staff", async (req, res) => {
  // const username_session = req.session.username;
  // console.log("Logged-in user req.session:", req.session);
  // console.log("Logged-in user session:", username_session);

  const { username } = req.body;
  // console.log("username in api_staff :", username);

  try {
    const connection = await pool.getConnection();

    const [rows_5] = await connection.execute(
      "SELECT * FROM staff_details where staff_id = ?",
      [username]
    );

    connection.release();

    if (rows_5.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    if (rows_5) {
      res.json({
        success: true,
        image_link: rows_5[0].image_link,
        c_address_state: rows_5[0].staff_Address_state,
        c_address_district: rows_5[0].staff_Address_district,
        c_address_street: rows_5[0].staff_Address_street,
        c_addressdoor_no: rows_5[0].staff_Address_door_no,
        p_address_state: rows_5[0].p_address_state,
        p_address_district: rows_5[0].p_address_district,
        p_address_street: rows_5[0].p_address_street,
        p_addressdoor_no: rows_5[0].p_addressdoor_no,
        email: rows_5[0].email,
        designation: rows_5[0].designation,
        name: rows_5[0].staff_name,
        mobile_no: rows_5[0].staff_mobile_no,
        dob: rows_5[0].staff_dob,
        blood_group:rows_5[0].blood_group,//a
        gender:rows_5[0].gender,//a
        caste:rows_5[0].caste,//a
        religion:rows_5[0].religion,//a 
        fathers_mobile_no:rows_5[0].fathers_mobile_no,//a
        mothers_mobile_no:rows_5[0].mothers_mobile_no,//a 



        

      });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error in staff profile_api" });
  }
});

// ..................................
// app.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const query = "SELECT * FROM login WHERE user_id = ? AND password = ?";
//     connection.query(query, [username, password], (error, results, fields) => {
//       if (error) {
//         console.error("Error during authentication:", error);
//         return res.status(500).json({ message: "Internal Server Error" });
//       }

//       if (results.length === 0) {
//         return res.status(401).json({ message: "Invalid username or password" });
//       }

// res.json({
//   success: true,
//   userType: results[0].type,
//   userName: results[0].user_id,
// });
//     });
//   } catch (error) {
//     console.error("Error during authentication:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });
// app.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const connection = await pool.getConnection();

//     const [rows] = await connection.execute(
//       "SELECT * FROM login WHERE user_id = ? AND password = ?",
//       [username, password]
//     );

//     connection.release();

//     if (rows.length === 0) {
//       return res.status(401).json({ message: "Invalid username or password" });
//     }

//     if (rows) {
//       res.json({
//         success: true,
//         userType: rows[0].type,
//         userName: rows[0].user_id,
//       });
//     } else {
//       res.json({ success: false });
//     }
//   } catch (error) {
//     console.error("Error during authentication:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

app.post("/profile/student", async (req, res) => {
  

  const { username } = req.body;
  console.log("username in api :", username);

  try {
    const connection = await pool.getConnection();

   
    const [rows_5] = await connection.execute(
      "SELECT * FROM students_detail where student_id = ?",
      [username]
    );

    connection.release();

    if (rows_5.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    if (rows_5) {
      
      res.json({
        success: true,
        image_link: rows_5[0].image_link,
        c_address_state: rows_5[0].address_student_state,
        c_address_district: rows_5[0].address_student_district,
        c_address_street: rows_5[0].address_student_street,
        c_addressdoor_no: rows_5[0].address_student_door_no,
        p_address_state: rows_5[0].p_address_state,
        p_address_district: rows_5[0].p_address_district,
        p_address_street: rows_5[0].p_address_street,
        p_addressdoor_no: rows_5[0].p_addressdoor_no,
        email: rows_5[0].email,
        designation: rows_5[0].Student_standard,
        name: rows_5[0].student_name,
        mobile_no: rows_5[0].student_mobile_no,
        dob: rows_5[0].student_dob,
        blood_group:rows_5[0].blood_group,//a
        gender:rows_5[0].gender,//a
        caste:rows_5[0].caste,//a
        religion:rows_5[0].religion,//a 
        fathers_mobile_no:rows_5[0].fathers_mobile_no,//a
        mothers_mobile_no:rows_5[0].mothers_mobile_no,//a 

      });
    } else {
  
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/profile/student/subjects", async (req, res) => {

  const { student_id_param } = req.body;
//  console.log("aa",student_id_param)
  try {
    const connection = await pool.getConnection();

    const [rows_0] = await connection.execute(
      "CALL student_profile_subjects(?)",
      [student_id_param]
    );

    
    connection.release();

    // console.log(rows_0)
    if (rows_0) {
      
      res.json({ success: true, users: rows_0[0] });
    } else {
  
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error In 2nd_Api:", error);
    res.status(500).json({ message: "Internal Server Error in 2nd_Api " });
  }
});

// app.post("/profile/staff", async (req, res) => {
//   // const username_session = req.session.username;

//   // console.log("Logged-in user session:", username_session);

//   const { username } = req.body;
//   // console.log("username in api_staff :", username);

//   try {
//     const connection = await pool.getConnection();

//     const [rows_5] = await connection.execute(
//       "SELECT * FROM staff_details where staff_id = ?",
//       [username]
//     );

//     connection.release();

//     if (rows_5.length === 0) {
//       return res.status(401).json({ message: "Invalid username or password" });
//     }

//     console.log(rows_5)

//     if (rows_5) {
//       res.json({
        // success: true,
        // image_link: rows_5[0].image_link,
        // address_state: rows_5[0].staff_Address_state,
        // address_district: rows_5[0].staff_Address_district,
        // address_street: rows_5[0].staff_Address_street,
        // addressdoor_no: rows_5[0].staff_Address_door_no,
        // email: rows_5[0].email,
        // designation: rows_5[0].designation,
        // name: rows_5[0].staff_name,
        // mobile_no: rows_5[0].staff_mobile_no,
//       });
//     } else {
//       res.json({ success: false });
//     }
//   } catch (error) {
//     console.error("Error during authentication:", error);
//     res
//       .status(500)
//       .json({ message: "Internal Server Error in staff profile_api" });
//   }
// });

// app.listen(port, () => {
//   console.log(`Authentication API is running on http://localhost:${port}`);
// });
// var  port = process.env.PORT || 8090;

app.post("/staff_details", async (req, res) => {
  const { username } = req.body;

  try {
    const connection = await pool.getConnection();

    const [rows_1] = await connection.execute(
      "SELECT  staff_id,staff_name FROM staff_details WHERE  staff_id= ?",
      [username]
    );

    connection.release();

    if (rows_1.length === 0) {
      return res.status(401).json({ message: "Invalid Staff" });
    }

    if (rows_1) {
      res.json({ success: true, user: rows_1[0] });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error In Api:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/staff_details/students", async (req, res) => {
  // console.log("hii")
  const { username } = req.body;
  // console.log(username)
  // console.log("username from /staff_details/students",username.username)

  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Query the database to find a user with the provided username and password
    const [rows_2] = await connection.execute(
      "SELECT  student_id,Student_standard,student_name,category FROM students_detail_staff WHERE  staff_id= ?",
      [username]
    );

    // console.log(rows_2);

    // Release the connection back to the pool
    connection.release();

    if (rows_2.length === 0) {
      return res.status(401).json({ message: "Invalid Staff" });
    }

    // Create a JWT token
    //    const token = jwt.sign({ user: { id: rows[0].id, username: rows[0].username } }, secretKey, {
    //      expiresIn: '1h', // Token expires in 1 hour (adjust as needed)
    //    });
    //    // console.log(token)
    //    res.json({ token });
    if (rows_2) {
      // Successful login
      // console.log(rows[0].type)
      res.json({ success: true, user: rows_2 });
    } else {
      // Failed login
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error In 2nd_Api:", error);
    res.status(500).json({ message: "Internal Server Error in 2nd_Api " });
  }
});

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the destination directory to save uploaded files
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    ); // Set the file name
  },
});

const upload = multer({ storage: storage });

//  app.post('/work_assign/teacher', async (req, res) => {
//   // console.log("hii")
//   const { studentType, title, description, selectedClass ,teacher_id ,dueDate} = req.body;
//   console.log('Assignment submitted:');
//   console.log('Student Type:', studentType);
//   console.log('Title:', title);
//   console.log('Description:', description);
//   console.log('Selected Class:', selectedClass);
//   console.log('teacher_id:', teacher_id);
//   console.log('Due date:', dueDate);

//   // console.log(username)
//   // console.log("username from /staff_details/students",username.username)
app.post("/work_assign/teacher", upload.single("pdfFile"), async (req, res) => {
  const {
    studentType,
    title,
    description,
    selectedClass,
    teacher_id,
    dueDate,
  } = req.body;
  const pdfFile = req.file;

  const { filename, originalname, path } = req.file; // Get the uploaded PDF file

  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Query the database to find a user with the provided username and password
    //         const [rows_3] = await connection.execute(`
    //   INSERT INTO work_assignment (student_id, teacher_id, class, assignment_title, assignment_description, category)
    //   SELECT student_id, ?, ?, ?, ?, ?
    //   FROM students_detail
    //   WHERE staff_id = ? AND Student_standard = ?
    // `, [teacher_id, selectedClass, title, description,studentType]);

    const {
      studentType,
      title,
      description,
      selectedClass,
      teacher_id,
      dueDate,
      dateTime,
    } = req.body;
    const [rows_3] = await connection.execute(
      "CALL insert_assign(?, ?, ?, ?, ?, ?,?,?)",
      [
        teacher_id,
        selectedClass,
        title,
        description,
        studentType,
        pdfFile.filename,
        dueDate,
        dateTime,
      ]
    );

    // console.log(rows_3);

    // Release the connection back to the pool
    connection.release();

    if (rows_3.length === 0) {
      return res.status(401).json({ message: "Invalid Staff" });
    }

    // Create a JWT token
    //    const token = jwt.sign({ user: { id: rows[0].id, username: rows[0].username } }, secretKey, {
    //      expiresIn: '1h', // Token expires in 1 hour (adjust as needed)
    //    });
    //    // console.log(token)
    //    res.json({ token });
    if (rows_3) {
      // Successful login
      // console.log(rows[0].type)
      // res.json({ success: true, user: rows_3 });
      res.json({ success: true });
    } else {
      // Failed login
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error In 2nd_Api:", error);
    res.status(500).json({ message: "Internal Server Error in 2nd_Api " });
  }
});

app.post(
  "/student/assign_submit_confirm",
  upload.single("pdfFile"),
  async (req, res) => {
    const { assign_id, dateTime } = req.body;
    console.log(assign_id);
    const pdfFile = req.file;

    const { filename, originalname, path } = req.file; // Get the uploaded PDF file

    try {
      // Get a connection from the pool
      const connection = await pool.getConnection();

      // Query the database to find a user with the provided username and password
      //         const [rows_3] = await connection.execute(`
      //   INSERT INTO work_assignment (student_id, teacher_id, class, assignment_title, assignment_description, category)
      //   SELECT student_id, ?, ?, ?, ?, ?
      //   FROM students_detail
      //   WHERE staff_id = ? AND Student_standard = ?
      // `, [teacher_id, selectedClass, title, description,studentType]);

      // const { studentType, title, description, selectedClass, teacher_id, dueDate } = req.body;
      const [rows_3] = await connection.execute(
        "CALL student_assign_submit(?, ?, ? )",
        [assign_id, pdfFile.filename, dateTime]
      );

      // console.log(rows_3);

      // Release the connection back to the pool
      connection.release();

      if (rows_3.length === 0) {
        return res.status(401).json({ message: "Invalid Assignment" });
      }

      // Create a JWT token
      //    const token = jwt.sign({ user: { id: rows[0].id, username: rows[0].username } }, secretKey, {
      //      expiresIn: '1h', // Token expires in 1 hour (adjust as needed)
      //    });
      //    // console.log(token)
      //    res.json({ token });
      if (rows_3) {
        // Successful login
        // console.log(rows[0].type)
        // res.json({ success: true, user: rows_3 });
        res.json({ success: true });
      } else {
        // Failed login
        res.json({ success: false });
      }
    } catch (error) {
      console.error("Error In 2nd_Api:", error);
      res.status(500).json({ message: "Internal Server Error in 2nd_Api " });
    }
  }
);
app.post("/staff_dashboard/status", async (req, res) => {

  const { teacher_id } = req.body;
 
  try {
    const connection = await pool.getConnection();

    const [rows_4] = await connection.execute(
      "CALL staff_dashboard_status(?)",
      [teacher_id]
    );

    
    connection.release();

    
    if (rows_4) {
      
      res.json({ success: true, users: rows_4[0] });
    } else {
  
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error In 2nd_Api:", error);
    res.status(500).json({ message: "Internal Server Error in 2nd_Api " });
  }
});

app.post("/staff_dashboard/card", async (req, res) => {
  const { teacher_id } = req.body;

  try {
    const connection = await pool.getConnection();

    const [rows_20] = await connection.execute("CALL staff_dashboard_card(?)", [
      teacher_id,
    ]);

    // console.log(rows_20);

    connection.release();

    if (rows_20) {
      res.json({ success: true, users: rows_20[0] });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error In Api:", error);
    res.status(500).json({ message: "Internal Server Error in 2nd_Api " });
  }
});

app.post("/student/card", async (req, res) => {
  const { student_id } = req.body;

  try {
    const connection = await pool.getConnection();

    const [rows_20] = await connection.execute(
      "CALL student_dashboard_card(?)",
      [student_id]
    );

    // console.log(rows_20);

    connection.release();

    if (rows_20) {
      res.json({ success: true, users: rows_20[0] });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error In Api:", error);
    res.status(500).json({ message: "Internal Server Error in 2nd_Api " });
  }
});

app.post("/staff/completed_work", async (req, res) => {
  const { teacherid } = req.body;

  try {
    const connection = await pool.getConnection();

    const [rows_13] = await connection.execute("CALL staff_completed_work(?)", [
      teacherid,
    ]);

    connection.release();

    if (rows_13.length === 0) {
      return res.status(401).json({ message: "Invalid Staff" });
    }

    if (rows_13) {
      res.json({ success: true, users: rows_13 });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error In /staff/assigned_work:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error in /staff/assigned_work " });
  }
});

app.post("/staff/assigned_work", async (req, res) => {
  const { teacherid } = req.body;

  try {
    const connection = await pool.getConnection();

    const [rows_13] = await connection.execute("CALL staff_assigned_work(?)", [
      teacherid,
    ]);

    connection.release();

    if (rows_13.length === 0) {
      return res.status(401).json({ message: "Invalid Staff" });
    }

    if (rows_13) {
      res.json({ success: true, users: rows_13 });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error In /staff/assigned_work:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error in /staff/assigned_work " });
  }
});

app.post("/staff/work_view", async (req, res) => {
  const { classs, category, userName, title } = req.body;

  try {
    const connection = await pool.getConnection();

    const [rows_15] = await connection.execute("CALL work_view(?,?,?,?)", [
      classs,
      category,
      userName,
      title,
    ]);

    connection.release();

    if (rows_15.length === 0) {
      return res.status(401).json({ message: "Invalid Staff" });
    }

    if (rows_15) {
      res.json({ success: true, rows_15 });
      // console.log(rows_15)
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error In /staff/work_view/////:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error in /staff/work_view " });
  }
});

app.post("/staff/work_completed_work_view", async (req, res) => {
  const { classs, category, userName, title } = req.body;

  try {
    const connection = await pool.getConnection();

    const [rows_15] = await connection.execute(
      "CALL staff_work_view_complete(?,?,?,?)",
      [classs, category, userName, title]
    );

    connection.release();

    if (rows_15.length === 0) {
      return res.status(401).json({ message: "Invalid Staff" });
    }

    if (rows_15) {
      res.json({ success: true, rows_15 });
      // console.log(rows_15)
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error In /staff/work_view:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error in /staff/work_view " });
  }
});
app.use("/uploads", express.static("uploads"));
app.get("/get-pdf-filenames", (req, res) => {
  console.log("api");
  const uploadsDir = path.join(__dirname, "uploads");
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    // Filter PDF files
    const pdfFiles = files.filter((file) => file.endsWith(".pdf"));
    res.json(pdfFiles);
  });
});

app.get("/get-pdf/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "uploads", filename);
  res.sendFile(filePath);
});

app.post("/student/student_dashboard", async (req, res) => {
  // console.log("hii")
  const { student_id } = req.body;
  // console.log('Assignment submitted:');
  // // console.log('Student Id:', student_id);
  // console.log('Teacher_Id:', teacher_id);

  // console.log(username)
  // console.log("username from /staff_details/students",username.username)

  try {
    
    const connection = await pool.getConnection();

    const [rows_4] = await connection.execute("CALL student_dashboard(?)", [
      student_id,
    ]);

    connection.release();

    if (rows_4.length === 0) {
      return res.status(401).json({ message: "Invalid Staff" });
    }

    
    if (rows_4) {
   
      res.json({ success: true, rows_4 });
    } else {
      // Failed login
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error In 2nd_Api:", error);
    res.status(500).json({ message: "Internal Server Error in 2nd_Api " });
  }
});

app.post("/student/completed_work", async (req, res) => {
  // console.log("hii")
  const { student_id } = req.body;
  // console.log('Assignment submitted:');
  // // console.log('Student Id:', student_id);
  // console.log('Teacher_Id:', teacher_id);

  // console.log(username)
  // console.log("username from /staff_details/students",username.username)

  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();

    const [rows_10] = await connection.execute(
      "CALL student_completed_work(?)",
      [student_id]
    );

    // const [rows_4] = await connection.execute('select * from login');

    console.log(rows_10);

    // Release the connection back to the pool
    connection.release();

    if (rows_10.length === 0) {
      return res.status(401).json({ message: "Invalid Compltetd Status" });
    }

  
    if (rows_10) {
 
      res.json({ success: true, rows_10 });
    } else {
      // Failed login
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error In 2nd_Api:", error);
    res.status(500).json({ message: "Internal Server Error in row_10 api " });
  }
});

app.post("/student/assignment_submission", async (req, res) => {
  
  const { assign_id } = req.body;
  



  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();

    const [rows_8] = await connection.execute("CALL student_assign_show(?)", [
      assign_id,
    ]);

    
    connection.release();

    if (rows_8.length === 0) {
      return res.status(401).json({ message: "Invalid Staff" });
    }

    if (rows_8) {
      
      res.json({ success: true, rows_8 });
    } else {
      
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error In 8th_Api:", error);
    res.status(500).json({ message: "Internal Server Error in 2nd_Api " });
  }
});

app.post("/staff/workview_submit", async (req, res) => {
  const rewardsData = req.body; // Assuming rewardsData is received in the request body
  console.log(rewardsData);
  try {
    const connection = await pool.getConnection();

    // Iterate over rewardsData and process each entry
    for (const { student_id, teacher_id, rewards, title } of rewardsData) {
      // Convert rewards to integer (if present)
      const rewardsValue = rewards !== undefined ? parseInt(rewards, 10) : 0;

      // Check if a record with the same student_id and teacher_id exists
      const [existingRecord] = await connection.execute(
        "SELECT * FROM work_assignment WHERE student_id = ? AND teacher_id = ?",
        [student_id, teacher_id]
      );

      // console.log(existingRecord)

      if (existingRecord.length > 0) {
        // If a record exists, update the rewards column
        // console.log([student_id, teacher_id , rewardsValue,title])
        const [rows_20] = await connection.execute(
          "CALL reward_view(?, ?, ?, ?)",
          [student_id, teacher_id, rewardsValue, title]
        );
        // console.log(rows_20)
      }
    }

    connection.release();

    res.json({ success: true, message: "Rewards updated successfully" });
  } catch (error) {
    console.error("Error in /staff/woooork:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.post("/student/rewards", async (req, res) => {
  const { userName } = req.body;

  try {
    const connection = await pool.getConnection();

    const [rows_15] = await connection.execute(
      "select rewards from students_detail where student_id = ?",
      [userName]
    );

    connection.release();

    if (rows_15.length === 0) {
      return res.status(401).json({ message: "Invalid Rewards" });
    }

    // Create a JWT token
    //    const token = jwt.sign({ user: { id: rows[0].id, username: rows[0].username } }, secretKey, {
    //      expiresIn: '1h', // Token expires in 1 hour (adjust as needed)
    //    });
    //    // console.log(token)
    //    res.json({ token });
    if (rows_15) {
      // Successful login
      // console.log(rows[0].type)
      // res.json({ success: true, user: rows_3 });
      res.json({ success: true, rows_15 });
    } else {
      // Failed login
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error In 8th_Api:", error);
    res.status(500).json({ message: "Internal Server Error in 2nd_Api " });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log("Order API is running at " + port);
});
