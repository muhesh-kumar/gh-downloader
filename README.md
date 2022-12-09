# Github Downloader

Why make a NPM Package instead of a shell script?

- To support different Operating Systems and have a single codebase for the project

## Features

- Download any repo
- Download any file in a repo
- Download any directory in a repo
- Save the downloaded contents in any given directory
- Default download directory is the present working directory from which the command is executed

## Usage

`gh-dl -V #to get the version of the downloader`

`gh-dl -h #to get the help menu`

`gh-dl <url> #download in present working directory`

`gh-dl <url> --save-here <path_to_download> #download in the given path`

(or)

`gh-dl <url> -sh <path_to_download> #download in the given path`

## Examples

1. Downloading a repo

   `gh-dl https://github.com/muhesh-kumar/playlist-descriptor`

1. Downloading a repo and saving it in an arbitrary path

   `gh-dl https://github.com/muhesh-kumar/playlist-descriptor -sh ../test/`

1. Downloading a directory from a repo

   `gh-dl https://github.com/muhesh-kumar/playlist-descriptor/tree/main/static`

1. Downloading a directory from a repo and saving it in an arbitrary path

   `gh-dl https://github.com/muhesh-kumar/playlist-descriptor/tree/main/static -sh bin/`

1. Downloading a file from a repo

   `gh-dl https://github.com/muhesh-kumar/playlist-descriptor/tree/main/static/style.css`

1. Downloading a file from a repo and saving it in an arbitrary path

   `gh-dl https://github.com/muhesh-kumar/playlist-descriptor/tree/main/static/style.css -sh ~/Desktop`

## References

- https://blog.logrocket.com/building-typescript-cli-node-js-commander
