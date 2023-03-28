export function findUrl(url) {
  let tabUrl = url.split("/");
  let lastPath = tabUrl[tabUrl.length - 1];
  if (lastPath === "") lastPath = "/";
  return lastPath;
}
