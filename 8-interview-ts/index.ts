type Method = "GET" | "POST" | "PUT";
function get(method: Method, url: string) {
  switch (method) {
    case "GET":
      return getData(url);
    case "POST":
      return postData(url);
    default:
      const n:never = method;
      return n;
  }
}
function getData(url: string) {
  return fetch(url);
}
function postData(url: string) {
  return fetch(url);
}
