const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
app.use(express.json());

app.post("/", async (req, res) => {
  const { firstName, lastName, age, email } = req.body;
  const newUser = await prisma.user.create({
    data: {
      firstName,
      lastName,
      age: +age,
      email,
    },
  });
  res.json(newUser);
});
app.get("/", async (req, res) => {
  const allUsers = await prisma.user.findMany({
    where: {
      OR: [
        { email: { startsWith: "ali" } },
        { email: { endsWith: "gmail.com" } },
      ],
    },
  });
  res.json(allUsers);
});

app.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { age } = req.body;
  const updateUser = await prisma.user.update({
    where: { id: parseInt(id) },
    data: { age },
  });
  res.json(updateUser);
});

app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deletedUser = await prisma.user.delete({
    where: { id: parseInt(id) },
  });
  res.json(deletedUser);
});

app.post("/post", async (req, res) => {
  const { title, authorId } = req.body;
  const newUser = await prisma.post.create({
    data: {
      title,
      authorId,
      active: true,
      data: null,
    },
    include: {
      author: true,
    },
  });
  res.json(newUser);
});
app.post("/post/many", async (req, res) => {
  const alPosts = await prisma.post.createMany({
    data: req.body,
  });
  res.json(alPosts);
});

app.get("/post", async (req, res) => {
  const allPosts = await prisma.post.findMany({
    where: {
      author: {
        id: 5,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    // where: {title: "post 1"}
    // take: 2,
    // skip: 2,
  });
  res.json(allPosts);
});

app.listen(4000, () => console.log(`server running on port ${4000}`));
