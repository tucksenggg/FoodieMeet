import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors"

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
  console.log(firstname);
  console.log(lastname);
  console.log(email);
  console.log(password);
  const result = await db.query("INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)",[firstname, lastname, email,password])
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
