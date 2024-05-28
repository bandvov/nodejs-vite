const mysql = require("mysql2");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
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
    phone_number: "1234567890",
    password: "password123",
    image:
      "https://static.wikia.nocookie.net/the_kpop_house/images/6/60/Jisoo.jpg",
  },
  {
    login: "bob123",
    first_name: "Bob",
    last_name: "Jones",
    email: "bob@example.com",
    phone_number: "0987654321",
    password: "password456",
    image:
      "https://static.wikia.nocookie.net/the_kpop_house/images/6/60/Jisoo.jpg",
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
    category: "Economy",
    category: "Compact",
    type: "Sedan",
    price_per_hour: 14.75,
    image: "https://cdn.jdpower.com/Average%20Weight%20Of%20A%20Car.jpg",
  },

  {
    user_id: 2,
    make: "Toyota",
    model: "Camry",
    color: "Red",
    category: "Economy",
    type: "Sedan",
    year: 2021,
    price_per_hour: 20,
    image:
      "https://images.caradisiac.com/images/2/2/8/5/202285/S1-les-tesla-model-s-et-y-augmentent-leurs-prix-755439.jpg",
  },
  {
    user_id: 1,
    make: "Ford",
    model: "Mustang",
    color: "Blue",
    category: "Sport",
    type: "Coupe",
    year: 2020,
    price_per_hour: 30,
    image:
      "https://images.caradisiac.com/images/2/2/8/5/202285/S1-les-tesla-model-s-et-y-augmentent-leurs-prix-755439.jpg",
  },
  {
    user_id: 1,
    make: "BMW",
    model: "X5",
    color: "Black",
    category: "Luxury",
    type: "SUV",
    year: 2022,
    price_per_hour: 50,
    image:
      "https://parkers-images.bauersecure.com/wp-images/22203/cut-out/1200x800/bmw-4-series-01.jpeg?mode=max&quality=90&scale=down",
  },
  {
    user_id: 2,
    make: "Tesla",
    model: "Model S",
    color: "White",
    category: "Electric",
    type: "Sedan",
    year: 2023,
    price_per_hour: 40,
    image:
      "https://images.caradisiac.com/images/2/2/8/5/202285/S1-les-tesla-model-s-et-y-augmentent-leurs-prix-755439.jpg",
  },
  {
    user_id: 1,
    make: "Toyota",
    model: "Corolla",
    color: "Silver",
    category: "Economy",
    type: "Hatchback",
    year: 2019,
    price_per_hour: 15,
    image:
      "https://images.caradisiac.com/images/2/2/8/5/202285/S1-les-tesla-model-s-et-y-augmentent-leurs-prix-755439.jpg",
  },
  {
    user_id: 2,
    make: "Ford",
    model: "F-150",
    color: "Green",
    category: "Truck",
    type: "Truck",
    year: 2021,
    price_per_hour: 25,
    image:
      "https://images.caradisiac.com/images/2/2/8/5/202285/S1-les-tesla-model-s-et-y-augmentent-leurs-prix-755439.jpg",
  },
  {
    user_id: 1,
    make: "BMW",
    model: "3 Series",
    color: "Gray",
    category: "Luxury",
    type: "Sedan",
    year: 2020,
    price_per_hour: 35,
    image:
      "https://parkers-images.bauersecure.com/wp-images/22203/cut-out/1200x800/bmw-4-series-01.jpeg?mode=max&quality=90&scale=down",
  },
  {
    user_id: 2,
    make: "Tesla",
    model: "Model 3",
    color: "Blue",
    category: "Electric",
    type: "Sedan",
    year: 2023,
    price_per_hour: 30,
    image:
      "https://images.caradisiac.com/images/2/2/8/5/202285/S1-les-tesla-model-s-et-y-augmentent-leurs-prix-755439.jpg",
  },
  {
    user_id: 1,
    make: "Toyota",
    model: "RAV4",
    color: "Black",
    category: "SUV",
    type: "SUV",
    year: 2022,
    price_per_hour: 25,
    image:
      "https://images.caradisiac.com/images/2/2/8/5/202285/S1-les-tesla-model-s-et-y-augmentent-leurs-prix-755439.jpg",
  },
  {
    user_id: 2,
    make: "Ford",
    model: "Explorer",
    color: "Red",
    category: "SUV",
    type: "SUV",
    year: 2019,
    price_per_hour: 30,
    image:
      "https://images.caradisiac.com/images/2/2/8/5/202285/S1-les-tesla-model-s-et-y-augmentent-leurs-prix-755439.jpg",
  },
  {
    user_id: 1,
    make: "BMW",
    model: "M4",
    color: "White",
    category: "Sport",
    type: "Coupe",
    year: 2021,
    price_per_hour: 40,
    image:
      "https://parkers-images.bauersecure.com/wp-images/22203/cut-out/1200x800/bmw-4-series-01.jpeg?mode=max&quality=90&scale=down",
  },
  {
    user_id: 2,
    make: "Tesla",
    model: "Model X",
    color: "Silver",
    category: "Electric",
    type: "SUV",
    year: 2022,
    price_per_hour: 50,
    image:
      "https://images.caradisiac.com/images/2/2/8/5/202285/S1-les-tesla-model-s-et-y-augmentent-leurs-prix-755439.jpg",
  },
  {
    user_id: 1,
    make: "Toyota",
    model: "Highlander",
    color: "Green",
    category: "SUV",
    type: "SUV",
    year: 2020,
    price_per_hour: 25,
    image:
      "https://images.caradisiac.com/images/2/2/8/5/202285/S1-les-tesla-model-s-et-y-augmentent-leurs-prix-755439.jpg",
  },
  {
    user_id: 2,
    make: "Ford",
    model: "Fusion",
    color: "Gray",
    category: "Economy",
    type: "Sedan",
    year: 2018,
    price_per_hour: 20,
    image: "https://images.caradisiac.com/images/2/2/8/5/202285/S1-les-tesla-model-s-et-y-augmentent-leurs-prix-755439.jpg",
  },
  {
    user_id: 2,
    make: "BMW",
    model: "Z4",
    color: "Blue",
    category: "Luxury",
    type: "Convertible",
    year: 2021,
    price_per_hour: 45,
    image:
      "https://parkers-images.bauersecure.com/wp-images/22203/cut-out/1200x800/bmw-4-series-01.jpeg?mode=max&quality=90&scale=down",
  },
  {
    user_id: 1,
    make: "Tesla",
    model: "Model Y",
    color: "Black",
    category: "Electric",
    type: "SUV",
    year: 2023,
    price_per_hour: 40,
    image:
      "https://images.caradisiac.com/images/2/2/8/5/202285/S1-les-tesla-model-s-et-y-augmentent-leurs-prix-755439.jpg",
  },
  {
    user_id: 1,
    make: "Toyota",
    model: "Tacoma",
    color: "White",
    category: "Truck",
    type: "Truck",
    year: 2020,
    price_per_hour: 30,
    image:
      "https://images.caradisiac.com/images/2/2/8/5/202285/S1-les-tesla-model-s-et-y-augmentent-leurs-prix-755439.jpg",
  },
  {
    user_id: 2,
    make: "Ford",
    model: "Edge",
    color: "Silver",
    category: "SUV",
    type: "SUV",
    year: 2021,
    price_per_hour: 25,
    image: "https://images.caradisiac.com/images/2/2/8/5/202285/S1-les-tesla-model-s-et-y-augmentent-leurs-prix-755439.jpg",
  },
  {
    user_id: 2,
    make: "BMW",
    model: "X3",
    color: "Red",
    category: "Luxury",
    type: "SUV",
    year: 2019,
    price_per_hour: 35,
    image:
      "https://parkers-images.bauersecure.com/wp-images/22203/cut-out/1200x800/bmw-4-series-01.jpeg?mode=max&quality=90&scale=down",
  },
  {
    user_id: 1,
    make: "Tesla",
    model: "Roadster",
    color: "Gray",
    category: "Electric",
    type: "Coupe",
    year: 2022,
    price_per_hour: 60,
    image:
      "https://images.caradisiac.com/images/2/2/8/5/202285/S1-les-tesla-model-s-et-y-augmentent-leurs-prix-755439.jpg",
  },
];

const seedUser = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO users (login, first_name, last_name, email, phone_number, password, image, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
      [
        user.login,
        user.first_name,
        user.last_name,
        user.email,
        user.phone_number,
        hashedPassword,
        user.image,
      ],
      (err, results) => {
        if (err) return reject(err);
        resolve(results.insertId);
      }
    );
  });
};

const seedCar = (car) => {
  return new Promise((resolve, reject) => {
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
        resolve(results.insertId);
      }
    );
  });
};

const seedUsers = async () => {
  for (const user of users) {
    try {
      const userId = await seedUser(user);
      console.log(`Inserted user with ID: ${userId}`);
    } catch (error) {
      console.error("Error inserting user:", error);
    }
  }
};

const seedCars = async () => {
  for (const car of cars) {
    try {
      const carId = await seedCar(car);
      console.log(`Inserted car with ID: ${carId}`);
    } catch (error) {
      console.error("Error inserting car:", error);
    }
  }
};

const seedDatabase = async () => {
  try {
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
