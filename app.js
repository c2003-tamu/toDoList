const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const tasks = [];

app.get('/', (req, res) => {
  res.render('index', { tasks });
});

app.post('/add', (req, res) => {
  const { task } = req.body;
  tasks.push(task);
  res.redirect('/');
});

app.post('/delete', (req, res) => {
    const { taskIndex } = req.body;
    if (taskIndex !== undefined && taskIndex >= 0 && taskIndex < tasks.length) {
      tasks.splice(taskIndex, 1);
    }
    res.redirect('/');
  });
  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});