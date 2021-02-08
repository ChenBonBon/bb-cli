#! /usr/bin/env node

const co = require('co');
const prompt = require('co-prompt');
const program = require('commander');
const chalk = require('chalk');
const init = require('./init');

const DEFAULT_NAME = 'Basebit';
const DEFAULT_VERSION = '1.0.0';
const DEFAULT_DESCRIPTION = '';
const DEFAULT_MAIN = 'index.js';
const DEFAULT_KEYWORDS = [];
const DEFAULT_AUTHOR = '';

program
	.option('-n, --name <name>', 'Project name', DEFAULT_NAME)
	.option('-v, --projectVersion <version>', 'Project version', DEFAULT_VERSION)
	.option('-d, --description <description>', 'Project description', DEFAULT_DESCRIPTION)
	.option('-m, --main <main>', 'Project entry', DEFAULT_MAIN)
	.option('-k, --keywords <keywords>', 'Project keywords', DEFAULT_KEYWORDS)
	.option('-a, --author <author>', 'Project author', DEFAULT_AUTHOR)
	.option('-V, --version', 'bb-cli version')
	.action(() => {
		if (program.opts().version) {
			console.log(require('../package.json').version);
			return false;
		}
		co(function* () {
			const name = yield prompt('Project name: ');
			const version = yield prompt('Project version: ');
			const description = yield prompt('Project description: ');
			const main = yield prompt('Project entry: ');
			const keywords = yield prompt('Project keywords: ');
			const author = yield prompt('Project author: ');
			const ok = yield prompt.confirm(
				chalk.bold.cyan(`Are you sure? Y/n
        name: ${name || DEFAULT_NAME}
        version: ${version || DEFAULT_VERSION}
        description: ${description || DEFAULT_DESCRIPTION}
        main: ${main || DEFAULT_MAIN}
        keywords: ${keywords || DEFAULT_KEYWORDS}
        author: ${author || DEFAULT_AUTHOR}
`)
			);
			if (ok) {
				init({
					name: name || DEFAULT_NAME,
					version: version || DEFAULT_VERSION,
					description: description || DEFAULT_DESCRIPTION,
					main: main || DEFAULT_MAIN,
					keywords: (keywords && keywords.split(' ')) || DEFAULT_KEYWORDS,
					author: author || DEFAULT_AUTHOR,
				});
			} else {
				console.log(chalk.red('bb-cli exit'));
				process.stdin.pause();
			}
		});
	})
	.parse(process.argv);
