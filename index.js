const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const compression = require('compression');

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(compression());
app.use(express.static(path.join(__dirname, 'build')));


app.get(['/about', '/whyme', '/skills', '/examples', '/services', '/contacts'], (req, res) => {
	res.sendFile(__dirname + '/build/index.html');
});

app.all('*', (req, res, next) => {
	res.status(404).json({ message: 'Not found route' });
});
app.listen(PORT, () => {
	console.log(`listen... ${PORT}`);
});
