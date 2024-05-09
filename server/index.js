import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";
import bcrypt from "bcrypt";

const db = new pg.Client({
  user:"name",
  host: "localhost",
  database: "foodiemeet",
  password: "password",
  port: 5432,
});

db.connect();


const app = express();
const port = 5000;
const saltRounds = 10;

app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended:true }));


app.use(express.static("public"));

app.get("/", (req, res) => {
  res.json({message: "success"});
})

app.post('/api/register', async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  console.log('Data received from frontend:', req.body);


  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (checkResult.rows.length > 0) {
      res.status(500).json({ message: 'User already exists. Try logging in' });
    } else {

      bcrypt.hash(password, saltRounds, async (err, hash) => {
      //Password Hashing
      if (err) {
        console.log("Error hashing password:", err);
      } else {
        const result = await db.query(
          "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)",
          [firstname, lastname, email, hash]
        );
        console.log(result);
        res.status(201).json({ message: 'User registered successfully' });
      }
    })
    }
} catch (error) {
  console.error('Error registering user:', error);
  res.status(500).json({ message: 'An error occurred while registering user' });
}
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
