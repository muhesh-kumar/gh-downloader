#!/usr/bin/env node

const url = require("url");
const { exec } = require("child_process");
const { type } = require("os");
const yargs = require("yargs");

const isFile = (urlContents) => urlContents[3] === "blob";
const isDirectory = (urlContents) => urlContents[3] === "tree";
const isRepo = (urlContents) => urlContents.length <= 4;

const getDownloadUrl = (parsedUrl, urlContents) => {
  return `${parsedUrl.origin}/${urlContents[1]}/${urlContents[2]
    }/trunk/${urlContents.slice(5).join("/")}`;
};

const startDownload = (command) => {
  console.log("Starting Download....");
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    } else if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    } else {
      console.log("Download Completed!");
      alternatePath = alternatePath ? alternatePath : "./";
      console.log(`Saved in ${alternatePath}`);
    }
  });
};

const argv = yargs(process.argv.slice(2))
  .option("save-here", {
    description: "Alternate path to save the downloaded contents",
    type: "string",
  })
  .nargs("save-here", 1).argv;

// get the input URL
const link = argv._;

// before proceeding, check if the input URL is valid
try {
  new URL(link);
} catch (err) {
  console.error("Invalid URL");
  return;
}

// parse the input URL
const parsedUrl = new URL(link);

// split the input URL
const urlContents = parsedUrl.pathname.split("/");

// get the download URL
const downloadUrl = getDownloadUrl(parsedUrl, urlContents);

let command = "",
  alternatePath = "";

if (isRepo(urlContents)) {
  const repoName = urlContents[2];
  alternatePath = argv["save-here"]
    ? `${argv["save-here"]}/${repoName}`
    : `${repoName}`;

  command = `svn export ${downloadUrl} ${alternatePath}`;
} else if (isFile(urlContents)) {
  alternatePath = argv["save-here"] ? `${argv["save-here"]}` : ``;
  command = `svn export ${downloadUrl} ${alternatePath}`;
} else if (isDirectory(urlContents)) {
  const directoryName = urlContents[urlContents.length - 1];
  alternatePath = argv["save-here"]
    ? `${argv["save-here"]}/${directoryName}`
    : `${directoryName}`;

  command = `svn export ${downloadUrl} ${alternatePath}`;
} else {
  console.log("Invalid URL");
}

startDownload(command, alternatePath);
