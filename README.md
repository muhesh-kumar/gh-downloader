# Github Downloader

Why make a NPM Package instead of a shell script?

- To support different Operating Systems and have a single codebase for the project

## Features

- Download any repo
- Download any file in a repo
- Download any directory in a repo
- Save the downloaded contents in any given directory
- Default download directory is the present working directory from which the command is executed

## Installation

1. Download and Install Subversion
   - Windows Installation https://tortoisesvn.net/downloads.html

   - Ubuntu Installation `sudo apt install subversion`

2. Install the npm package
   `npm i gh-downloader -g`

## Usage

`ghdl -V #to get the version of the downloader`

`ghdl -h #to get the help menu`

`ghdl <url> #download in present working directory`

`ghdl <url> --save-here <path_to_download> #download in the given path`

(or)

`ghdl <url> -sh <path_to_download> #download in the given path`

## Examples

1. Downloading a repo

   `ghdl https://github.com/muhesh-kumar/playlist-descriptor`

1. Downloading a repo and saving it in an arbitrary path

   `ghdl https://github.com/muhesh-kumar/playlist-descriptor -sh ../test/`

1. Downloading a directory from a repo

   `ghdl https://github.com/muhesh-kumar/playlist-descriptor/tree/main/static`

1. Downloading a directory from a repo and saving it in an arbitrary path

   `ghdl https://github.com/muhesh-kumar/playlist-descriptor/tree/main/static -sh bin/`

1. Downloading a file from a repo

   `ghdl https://github.com/muhesh-kumar/playlist-descriptor/tree/main/static/style.css`

1. Downloading a file from a repo and saving it in an arbitrary path

   `ghdl https://github.com/muhesh-kumar/playlist-descriptor/tree/main/static/style.css -sh ~/Desktop`

## References

- https://blog.logrocket.com/building-typescript-cli-node-js-commander
