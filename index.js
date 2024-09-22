const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/bfhl", (req, res) => {
  const { data, file_b64 } = req.body;

  const numbers = data.filter((item) => /^\d+$/.test(item));
  const alphabets = data.filter((item) => /^[a-zA-Z]$/.test(item));
  const highest_alphabet = alphabets.reduce((max, char) => {
    return char.toLowerCase() > max.toLowerCase() ? char : max;
  }, "a");

  const user_id = "Akshat_Singh_11082003";
  const email = "av0176@srmist.edu.in";
  const roll_number = "RA2111032010021";

  const is_file_valid = !!file_b64;
  const file_size = is_file_valid ? Buffer.from(file_b64, "base64").length : 0;

  const response = {
    is_success: true,
    user_id,
    email,
    roll_number,
    numbers,
    alphabets,
    highest_alphabet,
    file_valid: is_file_valid,
    file_size_kb: Math.floor(file_size / 1024),
    file_mime_type: is_file_valid ? "application/octet-stream" : "",
  };

  res.json(response);
});

app.get("/bfhl", (req, res) => {
  res.json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
