const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexão com o MongoDB
const uri = "mongodb://localhost:27017/toDoList"; // Substitua pela sua string de conexão do MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', (error) => console.error('Erro na conexão com o MongoDB:', error));
db.once('open', () => {
  console.log('Conectado ao MongoDB');
});

// Esquema do Mongoose
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true},
  importance: { type: Boolean, required: false }
});

const TaskFinishedSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true},
  importance: { type: Boolean, required: false }
});

const Task = mongoose.model('Task', TaskSchema);
const TaskFinished = mongoose.model('TaskFinished', TaskFinishedSchema);

// Rota para obter todos os usuários
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    res.status(500).json({ message: 'Erro ao buscar usuários' });
  }
});

app.get('/tasksFinished', async (req, res) => {
  try {
    const tasksFinished = await TaskFinished.find();
    res.json(tasksFinished);
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    res.status(500).json({ message: 'Erro ao buscar usuários' });
  }
});

// Rota para adicionar um usuário
app.post('/tasks', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    date: req.body.date,
    importance: req.body.importance
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error('Erro ao adicionar tarefa:', err);
    res.status(400).json({ message: 'Erro ao adicionar tarefa' });
  }
});

app.post('/tasksFinished', async (req, res) => {
  const taskFinished = new TaskFinished({
    title: req.body.title,
    date: req.body.date,
    importance: req.body.importance
  });

  try {
    const newTaskFinished = await taskFinished.save();
    res.status(201).json(newTaskFinished);
  } catch (err) {
    console.error('Erro ao adicionar usuário:', err);
    res.status(400).json({ message: 'Erro ao adicionar usuário' });
  }
});

//Rota para excluir registro
app.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (err) {
    console.error('Erro ao excluir usuário:', err);
    res.status(500).json({ message: 'Erro ao excluir usuário' });
  }
});

app.delete('/tasksFinished/:id', async (req, res) => {
  try {
    const taskFinished = await TaskFinished.findByIdAndDelete(req.params.id);
    if (!taskFinished) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (err) {
    console.error('Erro ao excluir usuário:', err);
    res.status(500).json({ message: 'Erro ao excluir usuário' });
  }
});
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
