#! /usr/bin/env node

const figlet = require('figlet');
const url = require('url');

const { getDownloadCommand, startDownload } = require('./utils/download');

console.log(figlet.textSync('Github Downloader'));

const { downloadCommand, alternatePath } = getDownloadCommand();
// console.log('downloadCommand: ', downloadCommand);
// console.log('alternatePath: ', alternatePath);

startDownload(downloadCommand, alternatePath);

module.exports = {};
