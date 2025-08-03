const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const recipesRouter = require('./routes/recipes_router');

const app = express();
const PORT = 8001;

app.use(cors());
app.use(express.json());
app.use('/recipe', recipesRouter);

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/recipeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
