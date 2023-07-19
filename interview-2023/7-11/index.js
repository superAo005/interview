function getCommonPrefix(arr) {
  if (arr.length === 0) {
    return "";
  }
  let prefix = arr[0];
  let len = prefix.length;
  for (let i = 1; i < arr.length; i++) {
    while (arr[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, len - 1);
      if (prefix === "") {
        return "";
      }
    }
  }

  return prefix;
}

const strings = ["fluat", "flaat", "fleet"];
const commonPrefix = getCommonPrefix(strings);
console.log(commonPrefix); // Output: "fl"
