const { PrismaClient } = require('@prisma/client');
const express = require('express');
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

const app = express();
app.use(express.json());

// ===================== User Endpoints =====================
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
})

app.put('/users/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name: req.body.name,
        email: req.body.email,
      },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
})

app.delete('/users/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.user.delete({
      where: { id },
    });
    res.status(204).json("usuario deletado com sucesso!");
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);

});

module.exports = app;