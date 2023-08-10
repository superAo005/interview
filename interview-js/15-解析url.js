// Js解析url,包括重复的Key转化为数组，未指定值约定为1
const obj = (url) => {
    return url
      .match(/([^=?&]+)(=[^=?&]+)?/g)
      .map((match) => match.split("="))
      .reduce((acc, [key, valueStr]) => {
        const value = decodeURIComponent(valueStr || "") || true;
        return {
          ...acc,
          [key]: acc[key] === undefined ? value : [].concat(acc[key], value),
        };
      }, {});
  };
  const obj2 = (url) => {
    return url.match(/([^=?&]+)(=[^=?&]+)?/g).reduce(function (acc, match) {
      let splits = match.split("="),
        key = splits[0],
        value = decodeURIComponent(splits[1] || "") || true;
      if (acc[key] === undefined) acc[key] = value;
      else acc[key] = [].concat(acc[key], value);
      return acc;
    }, {});
  };
  function parse(string) {
    let query = string.replace(/^\?/, "");
    return query.split("&").reduce((obj, next) => {
      let parts = next.split("=");
      let key = parts[0];
      let value = parts[1];
      if (obj.hasOwnProperty(key)) {
        obj[key] = Array.isArray(obj[key])
          ? [...obj[key], value]
          : [obj[key], value];
      } else {
        obj[key] = value ? value : true;
      }
      return obj;
    }, {});
  }
  const obj3 = (url) => {
    return url
      .substr(1)
      .split("&")
      .reduce((o, p) => {
        let [k, v = ""] = p.split("=");
        v = v === "" || (isNaN(v) ? v : Number(v));
        o[k] = o[k] ? (Array.isArray(o[k]) ? [...o[k], v] : [o[k], v]) : v;
        return o;
      }, {});
  };
  const query = obj3("?a=1&a=2&c=3&b=4");
  console.log(query);