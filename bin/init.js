const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const scripts = require('../configs/scripts.json');
const dependencies = require('../configs/dependencies.json');
const devDependencies = require('../configs/devDependencies.json');
const engines = require('../configs/engines.json');
const browserslist = require('../configs/browserslist.json');

const init = function (options) {
	const { name } = options;
	if (fs.existsSync(name)) {
		console.log(chalk.red('Project is exist.'));
		process.stdin.pause();
	} else {
		fs.mkdirSync(name);
		console.log('Project folder created.');
		process.chdir(name);
		writeConfigs(options);
		process.stdin.pause();
	}
};

const writePackageJson = function (options) {
	const packageJson = Object.assign(options, {
		scripts,
		dependencies,
		devDependencies,
		engines,
		browserslist,
	});
	fs.writeFileSync('package.json', JSON.stringify(packageJson, null, '\t'));
};

const writeIndex = function () {
	fs.writeFileSync('index.js', '');
};

const writeConfigs = function (options) {
	const configs = fs.readdirSync(path.resolve(__dirname, '../configs'));
	writePackageJson(options);
	writeIndex();
	configs.forEach((file) => {
		const extname = path.extname(file);
		if (extname !== '.json') {
			fs.createReadStream(path.resolve(__dirname, '../configs', file)).pipe(fs.createWriteStream(file));
		}
	});
};

module.exports = init;
