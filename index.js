'use strict';

const readdirp = require('readdirp');
const _ = require('highland');
const hasha = require('hasha');
const path = require('path');

const argv = require('yargs')
	.demand('d')
	.alias('d', 'dir')
	.describe('d', 'Directory to find files with identical contents')
	.nargs('d', 1)
	.default('d', 'node_modules')
	.alias('f', 'filter')
	.describe('f', 'Filter files by a glob pattern such as *.js')
	.nargs('f', 1)
	.default('f', '*.*')
	.argv;

const stream = readdirp({ root: path.join(__dirname, argv.dir), fileFilter: argv.filter})
	.on('warn', (err) => {
		console.error('non-fatal error', err);
	})
	.on('error',(err) => { console.error('fatal error', err); });

_(stream)
	.reject(x => {
		return x.stat.isDirectory();
	})
	.map((x) => {
		return _(hasha.fromFile(x.fullPath).then((hash) => {
			return {path: x.path, hash: hash};
		}));
	})
	.parallel(100)
	.reduce(new Map(), (result, x) => {

		let filesForHash = result.get(x.hash);

		if (!filesForHash) {
			filesForHash = [];
			result.set(x.hash, filesForHash);
		}

		filesForHash.push(x.path);
		return result;
	})
	.apply((x) => {
		let result = [];
		x.forEach((value) => {
			if (value.length > 1) {
				result.push(value);
			}
		});

		if (result.length) {
			console.log('Here are files grouped by same content:');
			console.log(result);
		} else {
			console.log('No files with same content were found.');
		}
	});

process.on('uncaughtException', (err) => {
	console.log('Caught exception: ' + err);
});
