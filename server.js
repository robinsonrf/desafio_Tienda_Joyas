const express = require('express');
const app = express();
const port = 3000;
app.listen(port, () => console.log('SERVER ON, Puerto 3000'));

//ROUTES
app.use(require('./routes/index'));