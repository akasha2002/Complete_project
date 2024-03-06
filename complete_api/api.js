const express = require("express");

const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const mysql2Promise = require("mysql2/promise");

const mysql = require("mysql");

const cors = require("cors");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");

const app = express();

const port = 3001;
const secretKey = "your-secret-key";
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

app.use(cors());
app.use(bodyParser.json());

const avatarsDirectory = path.join(__dirname, "avatars");

app.use("/avatars", express.static(avatarsDirectory));

const generateVerificationToken = () => {
  return crypto.randomBytes(20).toString("hex");
};

const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
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

app.post("/api/request_password_change", async (req, res) => {
  const { email } = req.body;
  console.log(email);

  try {
    const [userRows] = await pool.query("CALL password_verification( ? )", [
      email,
    ]);
    const Id = userRows[0][0].student_id;

    if (userRows[0].length !== 1) {
      return res.status(404).json({ error: "User not found" });
    }

    const verificationToken = generateVerificationToken();
    console.log(verificationToken);
    const expiresAt = new Date(Date.now() + 24 * 3600 * 1000); // Token expires in 24 hours

    await pool.query(
      "INSERT INTO password_reset_verification (email, token, expires_at,id) VALUES (?, ?, ?, ?)",
      [email, verificationToken, expiresAt, Id]
    );

    await sendVerificationEmail(email, verificationToken);

    res.status(200).json({ message: "Verification email sent successfully" });
  } catch (error) {
    console.error("Error requesting /api/request_password_change:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/verify_email_and_change_password", async (req, res) => {
  const { email, verificationToken, newPassword } = req.body;

  try {
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

    await pool.query("UPDATE login SET password = ? WHERE user_id = ?", [
      hashedPassword,
      id,
    ]);

    await pool.query(
      "DELETE FROM password_reset_verification WHERE email = ?",
      [email]
    );

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(
      "Error verifying email and changing password in /api/verify_email_and_change_password:",
      error
    );
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/verify_email", async (req, res) => {
  const { token } = req.query;
  console.log(token);

  try {
    const decodedToken = jwt.verify(token, secretKey);
    console.log(decodedToken);

    const email = decodedToken.email;
    console.log("Email:", email);

    res.status(200).send("Token verified successfully");
  } catch (error) {
    console.error("Error decoding token in /verify_email:", error);
    res.status(401).send("Invalid token");
  }
});

app.post("/user/register", (req, res) => {
  try {
    let { user_id, type, password } = req.body;
    console.log("Received registration data:", req.body);

    if (user_id && type && password) {
      const hashedPassword = bcrypt.hashSync(password, 10);

      const checkUsernameQuery = "SELECT * FROM login WHERE user_id = ?";
      connection.query(checkUsernameQuery, [user_id], (err, result) => {
        if (err) {
          console.error("Registration query error:", err);
          res.status(201).json({ message: "An error occurred" });
        } else if (result.length > 0) {
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
  const { username } = req.body;

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
        blood_group: rows_5[0].blood_group, //a
        gender: rows_5[0].gender, //a
        caste: rows_5[0].caste, //a
        religion: rows_5[0].religion, //a
        fathers_mobile_no: rows_5[0].fathers_mobile_no, //a
        mothers_mobile_no: rows_5[0].mothers_mobile_no, //a
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
        blood_group: rows_5[0].blood_group, //a
        gender: rows_5[0].gender, //a
        caste: rows_5[0].caste, //a
        religion: rows_5[0].religion, //a
        fathers_mobile_no: rows_5[0].fathers_mobile_no, //a
        mothers_mobile_no: rows_5[0].mothers_mobile_no, //a
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

  try {
    const connection = await pool.getConnection();

    const [rows_0] = await connection.execute(
      "CALL student_profile_subjects(?)",
      [student_id_param]
    );

    connection.release();

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
  const { username } = req.body;

  try {
    const connection = await pool.getConnection();

    const [rows_2] = await connection.execute(
      "SELECT  student_id,Student_standard,student_name,category,Student_Section FROM students_detail_staff WHERE  staff_id= ?",
      [username]
    );

    connection.release();

    if (rows_2.length === 0) {
      return res.status(401).json({ message: "Invalid Staff" });
    }

    if (rows_2) {
      res.json({ success: true, user: rows_2 });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error In 2nd_Api:", error);
    res.status(500).json({ message: "Internal Server Error in 2nd_Api " });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.post("/work_assign/teacher", upload.single("pdfFile"), async (req, res) => {
  const {
    studentType,
    title,
    description,
    selectedClass,
    selectedSection,
    teacher_id,
    dueDate,
    dateTime
  } = req.body;
  const pdfFile = req.file;

  const { filename, originalname, path } = req.file;
  // console.log("studentType",studentType,
  //   "title",title,
  //   "description",description,
  //   "selectedClass",selectedClass,
  //   "selectedSection",selectedSection,
  //   "teacher_id",teacher_id,
  //   "dueDate",dueDate,"dateTime",dateTime)
  console.log(teacher_id,
    selectedClass,
    selectedSection,
    title,
    description,
    studentType,
    pdfFile.filename,
    dueDate,
    dateTime)

  try {
    const connection = await pool.getConnection();

    const {
      studentType,
      title,
      description,
      selectedClass,
      selectedSection,
      teacher_id,
      dueDate,
      dateTime
    } = req.body;
    const [rows_3] = await connection.execute(
      "CALL insert_assign(?, ?, ?, ?, ?, ?,?,?,?)",
      [
        teacher_id,
        selectedClass,
        selectedSection,
        title,
        description,
        studentType,
        pdfFile.filename,
        dueDate,
        dateTime
      ]
    );
    console.log(rows_3)

    connection.release();

    if (rows_3.length === 0) {
      return res.status(401).json({ message: "Invalid Staff" });
    }

    if (rows_3) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error In 2nd_Api:", error);
    res.status(500).json({ message: "Internal Server Error in 2nd_Api " });
  }
});

app.post("/material_assign/teacher", upload.single("pdfFile"), async (req, res) => {
  const {
    studentType,
    title,
    description,
    selectedClass,
    teacher_id,
    dueDate,
    selectedSection
  } = req.body;
  const pdfFile = req.file;

  const { filename, originalname, path } = req.file;

  try {
    const connection = await pool.getConnection();

    const {
      studentType,
      title,
      description,
      selectedClass,
      teacher_id,
      dateTime,
      selectedSection
    } = req.body;
    const [rows_3] = await connection.execute(
      "CALL insert_material(?, ?, ?, ?, ?, ? ,?,?)",
      [
        teacher_id,
        selectedClass,
        title,
        description,
        studentType,
        pdfFile.filename,
        dateTime,
        selectedSection
      ]
    );

    connection.release();

    if (rows_3.length === 0) {
      return res.status(401).json({ message: "Invalid Staff" });
    }

    if (rows_3) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error In material assign _Api:", error);
    res.status(500).json({ message: "Internal Server Error in Error In material assign Api " });
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
      const connection = await pool.getConnection();

      const [rows_3] = await connection.execute(
        "CALL student_assign_submit(?, ?, ? )",
        [assign_id, pdfFile.filename, dateTime]
      );

      connection.release();

      if (rows_3.length === 0) {
        return res.status(401).json({ message: "Invalid Assignment" });
      }

      if (rows_3) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    } catch (error) {
      console.error("Error In 2nd_Api:", error);
      res.status(500).json({ message: "Internal Server Error in 2nd_Api " });
    }
  }
);

app.post("/student/material_view_2", async (req, res) => {
  const { date,a_incremant } = req.body;
console.log(date,a_incremant)
  try {
    const connection = await pool.getConnection();

    const [rows_4] = await connection.execute(
      "CALL material_analysis_student(?,?)",
      [a_incremant,date]
    );

    connection.release();

    
  } catch (error) {
    console.error("Error In 2nd_Api:", error);
    res.status(500).json({ message: "Internal Server Error in material analysis " });
  }
});
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

app.post("/staff/staff_material_analysis", async (req, res) => {
  const { teacherid } = req.body;

  try {
    const connection = await pool.getConnection();

    const [rows_13] = await connection.execute("CALL staff_assigned_material(?)", [
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
    console.error("Error In /staff/staff_material_analysis:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error in /staff/staff_material_analysis " });
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
  const { classs, category, userName, title,section,teacher_ass_post_time } = req.body;

  try {
    const connection = await pool.getConnection();

    const [rows_15] = await connection.execute("CALL work_view(?,?,?,?,?,?)", [
      classs,
      category,
      userName,
      title,
      section,
      teacher_ass_post_time
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

app.post("/staff/section_class", async (req, res) => {
  const { username } = req.body;

  try {
    const connection = await pool.getConnection();
    const [rows_15] = await connection.execute(
      "CALL staff_section_class(?)",
      [username]
    );
    connection.release();

    if (rows_15.length === 0) {
      return res.status(401).json({ message: "Invalid Staff" });
    }

    // Parse the JSON string from the result
    const resultJsonString = rows_15[0][0].result_json;
    const resultJson = JSON.parse(resultJsonString);

    // Manipulate the data into the desired JSON format
    const formattedData = resultJson.classes.map(entry => ({
      class: entry.class.replace(/\s+/g, ""), // Remove spaces from class name
      sections: entry.sections
    }));

    // Send the formatted data as a JSON response
    res.json({ classes: formattedData });
  } catch (error) {
    console.error("Error in section class:", error);
    res.status(500).json({ message: "Internal Server Error in section class" });
  }
});

app.post("/staff/staff_material_status", async (req, res) => {
  const { classs, category, userName, title ,section,teacher_ass_material_time} = req.body;
  // console.log(classs,category,userName,title,section,teacher_ass_material_time)

  try {
    const connection = await pool.getConnection();

    const [rows_15] = await connection.execute(
      "CALL staff_material_view_status(?,?,?,?,?,?)",
      [classs, category, userName, title,section,teacher_ass_material_time]
    );

    connection.release();

    if (rows_15.length === 0) {
      return res.status(401).json({ message: "Invalid Staff" });
    }
    // console.log("aaaaaaaaaa",rows_15)

    if (rows_15) {
      res.json({ success: true, rows_15 });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error In /staff/staff_material_status:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error in /staff/staff_material_status " });
  }
});


app.post("/staff/work_completed_work_view", async (req, res) => {
  const { classs, category, userName, title ,section,teacher_ass_post_time} = req.body;
  // console.log(classs,category,userName,title,section)

  try {
    const connection = await pool.getConnection();

    const [rows_15] = await connection.execute(
      "CALL staff_work_view_complete(?,?,?,?,?,?)",
      [classs, category, userName, title,section,teacher_ass_post_time]
    );

    connection.release();

    if (rows_15.length === 0) {
      return res.status(401).json({ message: "Invalid Staff" });
    }
    // console.log("aaaaaaaaaa",rows_15)

    if (rows_15) {
      res.json({ success: true, rows_15 });
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

    const pdfFiles = files.filter((file) => file.endsWith(".pdf"));
    res.json(pdfFiles);
  });
});

app.get("/get-pdf/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "uploads", filename);
  res.sendFile(filePath);
});

app.post("/student/material_view", async (req, res) => {
  const { student_id } = req.body;

  try {
    const connection = await pool.getConnection();

    const [rows_4] = await connection.execute("CALL student_material_view(?)", [
      student_id,
    ]);

    connection.release();

    if (rows_4.length === 0) {
      return res.status(401).json({ message: "Invalid Staff" });
    }

    if (rows_4) {
      res.json({ success: true, rows_4 });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error In material_view:", error);
    res.status(500).json({ message: "Internal Server Error in material_view " });
  }
});

app.post("/student/student_dashboard", async (req, res) => {
  const { student_id } = req.body;

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
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error In 2nd_Api:", error);
    res.status(500).json({ message: "Internal Server Error in 2nd_Api " });
  }
});

app.post("/student/completed_work", async (req, res) => {
  const { student_id } = req.body;

  try {
    const connection = await pool.getConnection();

    const [rows_10] = await connection.execute(
      "CALL student_completed_work(?)",
      [student_id]
    );

    // console.log(rows_10);

    connection.release();

    if (rows_10.length === 0) {
      return res.status(401).json({ message: "Invalid Compltetd Status" });
    }

    if (rows_10) {
      res.json({ success: true, rows_10 });
    } else {
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
  const rewardsData = req.body;
  // console.log(rewardsData);
  try {
    const connection = await pool.getConnection();

    for (const { student_id, teacher_id, rewards, title,teacher_submit_time } of rewardsData) {
      const rewardsValue = rewards !== undefined ? parseInt(rewards, 10) : 0;

      const [existingRecord] = await connection.execute(
        "SELECT * FROM work_assignment WHERE student_id = ? AND teacher_id = ?",
        [student_id, teacher_id]
      );

      if (existingRecord.length > 0) {
        const [rows_20] = await connection.execute(
          "CALL reward_view(?, ?, ?, ?,?)",
          [student_id, teacher_id, rewardsValue, title,teacher_submit_time]
        );
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

    if (rows_15) {
      res.json({ success: true, rows_15 });
    } else {
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
