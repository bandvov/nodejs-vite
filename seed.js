const mysql = require("mysql2");
const dotenv = require("dotenv");
const { seedTablesQuery } = require("./queries/seedQuery");
dotenv.config();

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database.");
});

// Sample data to insert
const users = [
  { name: "Alice", email: "alice@example.com" },
  { name: "Bob", email: "bob@example.com" },
];

const types = [
  { type_name: "Sedan" },
  { type_name: "SUV" },
  { type_name: "Truck" },
];

const colors = [
  { color_name: "Red" },
  { color_name: "Blue" },
  { color_name: "Black" },
];

const categories = [
  { category_name: "Economy" },
  { category_name: "Compact" },
  { category_name: "Sedan" },
];

const cars = [
  {
    user_id: 1,
    make: "Toyota",
    model: "Corolla",
    year: 2020,
    type_id: 1,
    color_id: 2,
    category_id: 1,
    price_per_hour: 15.5,
    image: "https://cdn.jdpower.com/Average%20Weight%20Of%20A%20Car.jpg",
  },
  {
    user_id: 1,
    make: "Honda",
    model: "Civic",
    year: 2019,
    type_id: 1,
    color_id: 1,
    category_id: 2,
    price_per_hour: 14.75,
    image: "https://cdn.jdpower.com/Average%20Weight%20Of%20A%20Car.jpg",
  },
  {
    user_id: 2,
    make: "Ford",
    model: "Focus",
    year: 2018,
    type_id: 2,
    color_id: 3,
    category_id: 3,
    price_per_hour: 20.0,
    image: "https://cdn.jdpower.com/Average%20Weight%20Of%20A%20Car.jpg",
  },
];

const seedTables = () => {
  return new Promise((resolve, reject) => {
    types.forEach((type) => {
      connection.query(seedTablesQuery, [], (err, results) => {
        if (err) return reject(err);
      });
    });
    resolve();
  });
};

// Function to seed users
const seedUsers = () => {
  return new Promise((resolve, reject) => {
    users.forEach((user) => {
      connection.query(
        "INSERT INTO users (name, email) VALUES (?, ?)",
        [user.name, user.email],
        (err, results) => {
          if (err) return reject(err);
        }
      );
    });
    resolve();
  });
};

// Function to seed types
// Function to seed types
const seedTypes = () => {
  return new Promise((resolve, reject) => {
    types.forEach((type) => {
      connection.query(
        "INSERT INTO types (type_name) VALUES (?)",
        [type.type_name],
        (err, results) => {
          if (err) return reject(err);
        }
      );
    });
    resolve();
  });
};

// Function to seed colors
const seedColors = () => {
  return new Promise((resolve, reject) => {
    colors.forEach((color) => {
      connection.query(
        "INSERT INTO colors (color_name) VALUES (?)",
        [color.color_name],
        (err, results) => {
          if (err) return reject(err);
        }
      );
    });
    resolve();
  });
};

// Function to seed categories
const seedCategories = () => {
  return new Promise((resolve, reject) => {
    categories.forEach((category) => {
      connection.query(
        "INSERT INTO categories (category_name) VALUES (?)",
        [category.category_name],
        (err, results) => {
          if (err) return reject(err);
        }
      );
    });
    resolve();
  });
};

// Function to seed cars
const seedCars = () => {
  return new Promise((resolve, reject) => {
    cars.forEach((car) => {
      connection.query(
        "INSERT INTO cars (user_id, make, model, year, type_id, color_id, category_id, price_per_hour, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          car.user_id,
          car.make,
          car.model,
          car.year,
          car.type_id,
          car.color_id,
          car.category_id,
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

// Seed the database
const seedDatabase = async () => {
  try {
    await seedTables();
    await seedUsers();
    await seedTypes();
    await seedColors();
    await seedCategories();
    await seedCars();
    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    connection.end();
  }
};

seedDatabase();
