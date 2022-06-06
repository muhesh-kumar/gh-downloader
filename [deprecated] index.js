const url = require("url");
const fs = require("fs");
const https = require("https");
const fetch = require("node-fetch");
const path = require("path");

const hardCodedLinks = [
  "https://github.com/muhesh-kumar/playlist-descriptor/blob/main/static/style.css",
  "https://github.com/muhesh-kumar/playlist-descriptor/tree/main/static",
  "https://github.com/peteward44/node-svn-ultimate",
];

const parsedUrl = url.parse(hardCodedLinks[1], true);

const urlContents = parsedUrl.pathname.split("/");

// console.log(parsedUrl.protocol);
// console.log(parsedUrl.host);
// console.log(parsedUrl.pathname);
// console.log(urlContents);

const userName = urlContents[1];
const repoName = urlContents[2];
const pathName = urlContents.slice(5, urlContents.length);

const finalUrl =
  parsedUrl.protocol +
  "//api." +
  parsedUrl.host +
  "/repos/" +
  userName +
  "/" +
  repoName +
  "/" +
  "contents/" +
  pathName.join("/");

console.log(finalUrl);

async function test() {
  const response = await fetch(finalUrl);
  response.json().then((data) => {
    // fs.writeFile()
    console.log(data);
  });
}
test();

// This way of using GitHub API is not efficient as we can easily get API rate limit exceeded
