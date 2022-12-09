const isValidUrl = (urContents: string[]) => urContents.length >= 4;

exports.isFile = (urlContents: string[]) =>
  isValidUrl(urlContents) && urlContents[3] === 'blob';

exports.isDirectory = (urlContents: string[]) =>
  isValidUrl(urlContents) && urlContents[3] === 'tree';

exports.isRepo = (urlContents: string[]) => urlContents.length <= 4;
