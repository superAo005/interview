Array.prototype.forEach = function forEach(cb, context = window) {
  let self = this;
  let len = self.length;
  for (let i = 0; i < len; i++) {
    typeof cb === "function" ? cb.call(context, self[i], i) : null;
  }
};
