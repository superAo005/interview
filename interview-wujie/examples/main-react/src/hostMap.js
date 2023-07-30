const map = {};

export default function hostMap(host) {
  if (process.env.NODE_ENV === "production") return map[host];
  return host;
}
