import dotenv from "dotenv";
import User from "../models/user.model.js";
import connectDB from "../db/connect.mongo.js";

dotenv.config();

const seedUsers = [
    // Female Users
    {
      email: "emma.thompson@example.com",
      fullName: "Emma Thompson",
      username: "emma.thompson01",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
      gender: "female",
    },
    {
      email: "olivia.miller@example.com",
      fullName: "Olivia Miller",
      username: "olivia.miller02",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
      gender: "female",
    },
    {
      email: "sophia.davis@example.com",
      fullName: "Sophia Davis",
      username: "sophia.davis03",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
      gender: "female",
    },
    {
      email: "ava.wilson@example.com",
      fullName: "Ava Wilson",
      username: "ava.wilson04",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
      gender: "female",
    },
    {
      email: "isabella.brown@example.com",
      fullName: "Isabella Brown",
      username: "isabella.brown05",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
      gender: "female",
    },
    {
      email: "mia.johnson@example.com",
      fullName: "Mia Johnson",
      username: "mia.johnson06",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/women/6.jpg",
      gender: "female",
    },
    {
      email: "charlotte.williams@example.com",
      fullName: "Charlotte Williams",
      username: "charlotte.williams07",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/women/7.jpg",
      gender: "female",
    },
    {
      email: "amelia.garcia@example.com",
      fullName: "Amelia Garcia",
      username: "amelia.garcia08",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/women/8.jpg",
      gender: "female",
    },
  
    // Male Users
    {
      email: "james.anderson@example.com",
      fullName: "James Anderson",
      username: "james.anderson09",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
      gender: "male",
    },
    {
      email: "william.clark@example.com",
      fullName: "William Clark",
      username: "william.clark10",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
      gender: "male",
    },
    {
      email: "benjamin.taylor@example.com",
      fullName: "Benjamin Taylor",
      username: "benjamin.taylor11",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
      gender: "male",
    },
    {
      email: "lucas.moore@example.com",
      fullName: "Lucas Moore",
      username: "lucas.moore12",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
      gender: "male",
    },
    {
      email: "henry.jackson@example.com",
      fullName: "Henry Jackson",
      username: "henry.jackson13",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
      gender: "male",
    },
    {
      email: "alexander.martin@example.com",
      fullName: "Alexander Martin",
      username: "alexander.martin14",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
      gender: "male",
    },
    {
      email: "daniel.rodriguez@example.com",
      fullName: "Daniel Rodriguez",
      username: "daniel.rodriguez15",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
      gender: "male",
    },
  ];
  

export const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
