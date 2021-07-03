const fs = require('fs');
const chalk = require('chalk');
const scripts = require('../configs/scripts.json');
const dependencies = require('../configs/dependencies.json');
const devDependencies = require('../configs/devDependencies.json');
const child_process = require('child_process');

const init = function (options) {
	const { name } = options;
	if (fs.existsSync(name)) {
		console.log(chalk.red('Project is exist.'));
		process.stdin.pause();
	} else {
		fs.mkdirSync(name);
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
	});
	fs.writeFileSync('package.json', JSON.stringify(packageJson, null, '\t'));
};

const writeConfigs = function (options) {
	const { name } = options;
	writePackageJson(options);

	child_process.spawnSync('cp', ['-r', '../configs/src', 'src']);
	child_process.spawnSync('cp', ['-r', '../configs/public', 'public']);
	child_process.spawnSync('cp', ['../configs/.babelrc', '.babelrc']);
	child_process.spawnSync('cp', ['../configs/.gitignore', '.gitignore']);
	child_process.spawnSync('cp', ['../configs/.prettierignore', '.prettierignore']);
	child_process.spawnSync('cp', ['../configs/.prettierrc', '.prettierrc']);
	child_process.spawnSync('cp', ['../configs/webpack.config.js', 'webpack.config.js']);

	fs.writeFileSync('README.md', `# ${name}\r\n\r\n`);
	fs.appendFileSync('README.md', fs.readFileSync('../configs/README.md'));
	fs.writeFileSync('README-zh_CN.md', `# ${name}\r\n\r\n`);
	fs.appendFileSync('README-zh_CN.md', fs.readFileSync('../configs/README-zh_CN.md'));
};

module.exports = init;
