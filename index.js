const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const app = express();
const compression = require('compression');
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(compression());

const router = {
	'/': {
		title: 'WebDeva - Create your business with us',
		description: 'WebDeva - Create your business with us'
	},
	'/whyme': {
		title: 'WebDeva - Why Me? - Create your business with us',
		description: 'WebDeva - Create your business with us'
	},
	'/about': {
		title: 'WebDeva - About - Create your business with us',
		description: 'WebDeva - Create your business with us'
	},
	'/skills': {
		title: 'WebDeva - Skills - Create your business with us',
		description: 'WebDeva - Create your business with us'
	},
	'/examples': {
		title: 'WebDeva - Examples - Create your business with us',
		description: 'WebDeva - Create your business with us'
	},
	'/services': {
		title: 'WebDeva - Services - Create your business with us',
		description: 'WebDeva - Create your business with us'
	},
	'/contacts': {
		title: 'WebDeva - Contacts - Create your business with us',
		description: 'WebDeva - Create your business with us'
	}
};

const handlePage = (req, res) => {
	const metadata = router[req.url];
	const htmlDom = fs.readFileSync(__dirname + '/build/index.html', 'utf8');
	const html = htmlDom.replace(
		'<title></title>',
		`<title>${metadata.title}</title>`
	);
	res.send(html);
};

app.get(Object.keys(router), handlePage);

app.use(express.static(path.join(__dirname, 'build')));

app.all('*', (req, res, next) => {
	res.status(404).json({ message: 'Not found route' });
});
app.listen(PORT, () => {
	console.info(`listen... ${PORT}`);
});
