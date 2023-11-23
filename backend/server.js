import express from "express";
import fs from "fs/promises";
import {v4 as }
const port = 5000;
const app = express();

app.use(express.json());

const usersFilePath = "./data/users.json";

// Check if the users.json file exists, if not, create an empty array
async function init() {
  try {
    await fs.access(usersFilePath);
  } catch (error) {
    // File does not exist, create an empty array
    await fs.writeFile(usersFilePath, JSON.stringify([]));
  }
}

init(); // Initialize the file on server startup

// Registration route
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .send({ message: "Name, email, and password are required." });
  }

  // Read the existing users from the file
  const users = JSON.parse(await fs.readFile(usersFilePath));

  // Check if the email is already registered
  if (users.some((user) => user.email === email)) {
    return res.status(400).send({ message: "Email is already registered." });
  }

  // Add the new user to the array
  const newUser = { name, email, password };
  users.push(newUser);

  // Write the updated array back to the file
  await fs.writeFile(usersFilePath, JSON.stringify(users));

  res.send({ message: "Registration successful.", user: newUser });
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Read the existing users from the file
  const users = JSON.parse(await fs.readFile(usersFilePath));

  // Find the user by email
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(401).send({ message: "Invalid email or password." });
  }

  // Compare the provided password with the stored password
  if (password !== user.password) {
    return res.status(401).send({ message: "Invalid email or password." });
  }

  res.send({
    message: "Login successful.",
    user: { name: user.name, email: user.email },
  });
});

// Root route
app.get("/", (req, res) => {
  res.send(`Hello World!`);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
