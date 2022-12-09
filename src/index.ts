#! /usr/bin/env node

const figlet = require('figlet');
const url = require('url');
const { getDownloadCommand, startDownload } = require('./utils/download');

console.log(figlet.textSync('GitHub Downloader'));


const { downloadCommand, alternatePath } = getDownloadCommand();
startDownload(downloadCommand, alternatePath);

module.exports = {};
