const mysql = require("mysql2");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const { seedTablesQuery } = require("./queries/seedQuery");
dotenv.config();
// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database.");
});

const saltRounds = 10;

const users = [
  {
    login: "alice123",
    first_name: "Alice",
    last_name: "Smith",
    email: "alice@example.com",
    password: "password123",
  },
  {
    login: "bob123",
    first_name: "Bob",
    last_name: "Jones",
    email: "bob@example.com",
    password: "password456",
  },
];

const cars = [
  {
    user_id: 1,
    make: "Toyota",
    model: "Corolla",
    year: 2020,
    color: "Blue",
    category: "Economy",
    type: "Sedan",
    price_per_hour: 15.5,
    image: "https://cdn.jdpower.com/Average%20Weight%20Of%20A%20Car.jpg",
  },
  {
    user_id: 2,
    make: "Honda",
    model: "Civic",
    year: 2019,
    color: "Red",
    category: "Compact",
    type: "Sedan",
    price_per_hour: 14.75,
    image: "https://cdn.jdpower.com/Average%20Weight%20Of%20A%20Car.jpg",
  },
  {
    user_id: 2,
    make: "Ford",
    model: "Focus",
    year: 2022,
    color: "White",
    category: "Compact",
    type: "Sedan",
    price_per_hour: 14.75,
    image: "https://cdn.jdpower.com/Average%20Weight%20Of%20A%20Car.jpg",
  },
];

const seedUsers = async () => {
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    connection.query(
      "INSERT INTO users (login, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)",
      [user.login, user.first_name, user.last_name, user.email, hashedPassword],
      (err, results) => {
        if (err) {
          console.error("Error inserting user:", err);
        }
      }
    );
  }
};

const seedCars = () => {
  return new Promise((resolve, reject) => {
    cars.forEach((car) => {
      connection.query(
        "INSERT INTO cars (user_id, make, model, year, color, category, type, price_per_hour, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          car.user_id,
          car.make,
          car.model,
          car.year,
          car.color,
          car.category,
          car.type,
          car.price_per_hour,
          car.image,
        ],
        (err, results) => {
          if (err) return reject(err);
        }
      );
    });
    resolve();
  });
};

const seedTables = async () => {
  connection.query(seedTablesQuery, [], (err, results) => {
    if (err) {
      return err;
    }
  });
};

const seedDatabase = async () => {
  try {
    await seedTables();
    await seedUsers();
    await seedCars();
    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    connection.end();
  }
};

seedDatabase();
