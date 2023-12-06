export const logoW = 35;
export const logoH = 25;
export const FontGap = 3;
export function toLowercaseSeparator(key) {
  return key.replace(/([A-Z])/g, "-$1").toLowerCase();
}
export function getStyleStr(style) {
  return Object.keys(style)
    .map((key) => `${toLowercaseSeparator(key)}: ${style[key]};`)
    .join(" ");
}

export function getPixelRatio() {
  return window.devicePixelRatio || 1;
}
/** 是否重新渲染水印 */
export const reRendering = (mutation, watermarkElement) => {
  let flag = false;
  if (mutation.removedNodes.length && watermarkElement) {
    flag = Array.from(mutation.removedNodes).includes(watermarkElement);
  }
  if (mutation.type === "attributes" && mutation.target === watermarkElement) {
    flag = true;
  }
  return flag;
};

function prepareCanvas(width, height, ratio = 1) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const realWidth = width * ratio;
  const realHeight = height * ratio;
  canvas.setAttribute("width", `${realWidth}px`);
  canvas.setAttribute("height", `${realHeight}px`);
  ctx.save();

  return [ctx, canvas, realWidth, realHeight];
}
export function getClips(
  content,
  logo,
  rotate,
  ratio,
  width,
  height,
  font,
  gapX,
  gapY
) {
  const [ctx, canvas, contentWidth, contentHeight] = prepareCanvas(
    width,
    height,
    ratio
  );
  const drawX = (gapX * ratio) / 2;
  const drawY = (gapY * ratio) / 2;
  // const drawWidth = width * ratio
  // const drawHeight = height * ratio

  const w = logo.width / 3 || logoW;
  const h = logo.height / 3 || logoH;
  ctx.drawImage(logo, drawX, drawY, w, h);
  const {
    color,
    fontSize,
    fontStyle,
    fontWeight,
    fontFamily,
    textAlign,
    textBaseline,
  } = font;
  const mergedFontSize = Number(fontSize) * ratio;
  ctx.font = `${fontStyle} normal ${fontWeight} ${mergedFontSize}px/${height}px ${fontFamily}`;
  ctx.fillStyle = color;
  ctx.textAlign = textAlign;
  ctx.textBaseline = textBaseline;
  const contents = Array.isArray(content) ? content : [content];
  contents?.forEach((item, index) => {
    ctx.fillText(
      item ?? "",
      // contentWidth / 2,
      drawX + logoW + 10,
      index * (mergedFontSize + FontGap * ratio)
    );
  });
  const angle = (Math.PI / 180) * Number(rotate);
  const maxSize = Math.max(width, height);
  const [rCtx, rCanvas, realMaxSize] = prepareCanvas(maxSize, maxSize, ratio);
  // 从' ctx '复制并旋转
  rCtx.translate(realMaxSize / 2, realMaxSize / 2);
  rCtx.rotate(angle);
  if (contentWidth > 0 && contentHeight > 0) {
    rCtx.drawImage(canvas, -contentWidth / 2, -contentHeight / 2);
  }
  // 获取旋转文本的边界
  function getRotatePos(x, y) {
    const targetX = x * Math.cos(angle) - y * Math.sin(angle);
    const targetY = x * Math.sin(angle) + y * Math.cos(angle);
    return [targetX, targetY];
  }

  let left = 0;
  let right = 0;
  let top = 0;
  let bottom = 0;

  const halfWidth = contentWidth / 2;
  const halfHeight = contentHeight / 2;
  const points = [
    [0 - halfWidth, 0 - halfHeight],
    [0 + halfWidth, 0 - halfHeight],
    [0 + halfWidth, 0 + halfHeight],
    [0 - halfWidth, 0 + halfHeight],
  ];
  points.forEach(([x, y]) => {
    const [targetX, targetY] = getRotatePos(x, y);
    left = Math.min(left, targetX);
    right = Math.max(right, targetX);
    top = Math.min(top, targetY);
    bottom = Math.max(bottom, targetY);
  });

  const cutLeft = left + realMaxSize / 2;
  const cutTop = top + realMaxSize / 2;
  const cutWidth = right - left;
  const cutHeight = bottom - top;
  const realGapX = gapX * ratio;
  const realGapY = gapY * ratio;
  const filledWidth = (cutWidth + realGapX) * 2;
  const filledHeight = cutHeight + realGapY;

  const [fCtx, fCanvas] = prepareCanvas(filledWidth, filledHeight);

  function drawImg(targetX = 0, targetY = 0) {
    fCtx.drawImage(
      rCanvas,
      cutLeft,
      cutTop,
      cutWidth,
      cutHeight,
      targetX,
      targetY,
      cutWidth,
      cutHeight
    );
  }
  drawImg();
  drawImg(cutWidth + realGapX, -cutHeight / 2 - realGapY / 2);
  drawImg(cutWidth + realGapX, +cutHeight / 2 + realGapY / 2);

  return [fCanvas.toDataURL(), filledWidth / ratio, filledHeight / ratio];
}
/** 以水印为中心点旋转*/
export function rotateWatermark(ctx, rotateX, rotateY, rotate) {
  ctx.translate(rotateX, rotateY);
  ctx.rotate((Math.PI / 180) * Number(rotate));
  ctx.translate(-rotateX, -rotateY);
}
