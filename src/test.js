import { parse } from 'url';
import fs from 'fs';
import https from 'https';
import fetch from 'node-fetch';
import path from 'path';

const hardCodedLinks = [
  'https://github.com/muhesh-kumar/playlist-descriptor/blob/main/static/style.css',
  'https://github.com/muhesh-kumar/playlist-descriptor/tree/main/static',
  'https://github.com/peteward44/node-svn-ultimate',
];

const parsedUrl = parse(hardCodedLinks[1], true);
const urlContents = parsedUrl.pathname.split('/');
const userName = urlContents[1];
const repoName = urlContents[2];
const pathName = urlContents.slice(5, urlContents.length);

const apiUrl =
  parsedUrl.protocol +
  '//api.' +
  parsedUrl.host +
  '/repos/' +
  userName +
  '/' +
  repoName +
  '/' +
  'contents/' +
  pathName.join('/');

console.log(apiUrl);

async function test() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  console.log(data);
  fs.writeFile();
}
test();

// This way of using GitHub API is not efficient as we can easily get API rate limit exceeded
