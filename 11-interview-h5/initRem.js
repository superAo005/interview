// 第一版:
function initRem() {
  const meta = document.querySelector('meta[name="viewport"]');
  const html = document.documentElement;
  const cliW = html.clientWidth;
  const dpr = window.devicePixelRatio || 1;
  meta.setAttribute("name", "viewport");
  meta.setAttribute(
    "content",
    `width=${cliW * dpr}, initial-scale=${1 / dpr} ,maximum-scale=${
      1 / dpr
    }, minimum-scale=${1 / dpr},user-scalable=no`
  );
  html.setAttribute("data-dpr", dpr);
  // 这样计算的好处是，你可以直接用ui的px/100得到的就是rem大小，方便快捷，无需mixin
  html.style.fontSize = (10 / 75) * cliW * dpr + "px";
}
initRem();
window.onresize = window.onorientationchange = initRem();
