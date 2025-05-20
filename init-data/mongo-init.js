db = db.getSiblingDB("reward");

db.users.insertMany([
  {
    name: "user1",
    password: "$2b$10$Yr1SEHWgaIGd8r/9aN.DhuNH8FE9gWZZzZUg2aXWohs3WoFO1NkZ.", // 1234
    email: "admin@example.com",
    role: "ADMIN",
  },
  {
    id: "6829f78a506b5a54ac347d9e",
    name: "user2",
    password: "$2b$10$KA7sDGee5yGhW99uXkVe/O4SD46or8gKwYv9tSYvKbYzU0z1Nj1qG", // 1234
    email: "user2@example.com",
    role: "USER",
  },
]);
