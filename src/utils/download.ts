const yargs = require('yargs');
const { exec } = require('child_process');
const { Command } = require('commander');

const { isFile, isDirectory, isRepo } = require('./typeOfUrl');
const { INVALID_URL_ERROR_MESSAGE } = require('../constants/index');

const getDownloadUrl = (parsedUrl: URL, urlContents: string[]) => {
  return `${parsedUrl.origin}/${urlContents[1]}/${
    urlContents[2]
  }/trunk/${urlContents.slice(5).join('/')}`;
};

exports.startDownload = (command: string, alternatePath: string) => {
  console.log('Starting Download....');
  exec(
    command,
    (error: Error, stdout: string | Buffer, stderr: string | Buffer) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      } else if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      } else {
        console.log('Download Completed!');
        alternatePath = alternatePath ? alternatePath : './';
        console.log(`Saved in ${alternatePath}`);
      }
    }
  );
};

exports.getDownloadCommand = () => {
  const program = new Command();
  program
    .version('1.0.0')
    .description('A CLI tool to download files and folders from github.com')
    .option(
      '-sh, --save-here <value>',
      'Alternate path to save the downloaded contents'
    )
    .parse(process.argv);
  const options = program.opts();

  const argv = yargs(process.argv.slice(2)).argv;

  // get the input URL
  const link = argv._;

  // before proceeding, check if the input URL is valid
  try {
    new URL(link);
  } catch (err) {
    console.error(INVALID_URL_ERROR_MESSAGE);
    throw new Error(INVALID_URL_ERROR_MESSAGE);
  }

  // parse the input URL
  const parsedUrl = new URL(link);

  // split the input URL
  const urlContents = parsedUrl.pathname.split('/');

  // get the download URL
  const downloadUrl = getDownloadUrl(parsedUrl, urlContents);

  let command = '';
  let alternatePath = '';

  // Get Download Command
  if (isRepo(urlContents)) {
    const repoName = urlContents[2];

    alternatePath =
      typeof options.saveHere === 'string'
        ? `${options.saveHere}/${repoName}`
        : repoName;

    command = `svn export ${downloadUrl} ${alternatePath}`;
  } else if (isFile(urlContents)) {
    alternatePath =
      typeof options.saveHere === 'string' ? options.saveHere : '';

    command = `svn export ${downloadUrl} ${alternatePath}`;
  } else if (isDirectory(urlContents)) {
    const directoryName = urlContents[urlContents.length - 1];

    alternatePath =
      typeof options.saveHere === 'string'
        ? `${options.saveHere}/${directoryName}`
        : directoryName;

    command = `svn export ${downloadUrl} ${alternatePath}`;
  } else {
    console.error(INVALID_URL_ERROR_MESSAGE);
    throw new Error(INVALID_URL_ERROR_MESSAGE);
  }

  return { downloadCommand: command, alternatePath };
};
