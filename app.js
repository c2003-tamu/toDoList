const express = require('express');
const fs = require('fs');
const methodOverride = require('method-override');
const ejs = require('ejs');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

// Helper functions
function readTasks() {
  try {
    const data = fs.readFileSync('tasks.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return [];
  }
}

function writeTasks(tasks) {
  fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2), 'utf8');
}

// Routes
app.get('/', (req, res) => {
  res.redirect('/tasks');
});

app.get('/tasks', (req, res) => {
  const tasks = readTasks();
  res.render('tasks', { tasks });
});

app.get('/add', (req, res) => {
  res.render('add-task');
});

app.post('/tasks', (req, res) => {
  const newTask = {
    id: Date.now().toString(), // Simple ID based on timestamp
    title: req.body.title,
  };
  const tasks = readTasks();
  tasks.push(newTask);
  writeTasks(tasks);
  res.redirect('/tasks');
});

app.delete('/tasks/:id', (req, res) => {
  const taskIdToDelete = req.params.id;
  const tasks = readTasks();
  const updatedTasks = tasks.filter(task => task.id !== taskIdToDelete);
  writeTasks(updatedTasks);
  res.redirect('/tasks');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
