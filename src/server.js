const express = require('express');
const path = require('path');
const logger = require('morgan');
const port = process.env.PORT || 3000;

const app = express();
app.use(logger('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.listen(port, () => console.log(`Farplane map listening at port: ${port}`));

app.get('/get-tasks', (req, res) => 
{
	res.status(500);
	res.json({ error: true, code: 500 , message: 'Not Implemented'});
});
