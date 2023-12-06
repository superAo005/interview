<template>
    <div class="watermark-container">
      <div class="watermark-content">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script>
  let rate = 350;
  let lastClick = Date.now() - rate;
  const BaseSize = 2;
  const FontGap = 3;
  const getPixelRatio = () => window.devicePixelRatio || 1;
  const toLowercaseSeparator = (key) =>
    key.replace(/([A-Z])/g, "-$1").toLowerCase();
  const getStyleStr = (style) =>
    Object.keys(style)
      .map((key) => `${toLowercaseSeparator(key)}: ${style[key]};`)
      .join(" ");
  
  function reRendering(mutation, watermarkElement) {
    let flag = false;
    // 是否删除水印节点
    if (mutation.removedNodes.length) {
      flag = Array.from(mutation.removedNodes).some(
        (node) => node === watermarkElement
      );
    }
    // 是否修改过水印dom属性值
    if (mutation.type === "attributes" && mutation.target === watermarkElement) {
      flag = true;
    }
  
    return flag;
  }
  export default {
    name: "Watermark",
    props: {
      zIndex: { type: Number, default: 9 },
      rotate: { type: Number, default: -22 },
      width: { type: [String, Number], default: 120 },
      height: { type: [String, Number], default: 64 },
      image: { type: String, default: "" },
      content: { type: [String, Array], default: "" },
      font: {
        type: Object,
        default: () => ({
          fontSize: 16,
          fontFamily: "sans-serif",
          fontStyle: "normal",
          fontWeight: "normal",
          color: "rgba(0, 0, 0, 0.15)",
        }),
      },
      clockwise: { type: Boolean, default: true },
      opacity: { type: Number, default: 1 },
      rootClassName: "",
      gap: { type: Array, default: () => [20, 20] },
      offset: { type: Array, default: () => [100, 100] },
    },
    data() {
      return {
        watermarkRef: null,
        stopObservation: false,
        observe: null,
      };
    },
  
    computed: {
      markStyle() {
        const props = this.$props;
        const [gapX, gapY] = props.gap;
        const [offsetX, offsetY] = props.offset;
  
        const gapXCenter = gapX / 2;
        const gapYCenter = gapY / 2;
        const offsetTop = offsetY || gapYCenter;
        const offsetLeft = offsetX || gapXCenter;
  
        const markStyle = {
          zIndex: this.zIndex,
          opacity: this.opacity,
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          backgroundRepeat: "repeat",
        };
  
        let positionLeft = offsetLeft - gapXCenter;
        let positionTop = offsetTop - gapYCenter;
        if (positionLeft > 0) {
          markStyle.left = `${positionLeft}px`;
          markStyle.width = `calc(100% - ${positionLeft}px)`;
          positionLeft = 0;
        }
        if (positionTop > 0) {
          markStyle.top = `${positionTop}px`;
          markStyle.height = `calc(100% - ${positionTop}px)`;
          positionTop = 0;
        }
        markStyle.backgroundPosition = `${positionLeft}px ${positionTop}px`;
  
        return markStyle;
      },
    },
  
    watch: {
      $props: {
        handler() {
          if (Date.now() - lastClick >= rate) {
            this.stopObservation = true;
            this.renderWatermark();
            // 延迟执行
            setTimeout(() => {
              this.stopObservation = false;
              lastClick = Date.now();
            });
          }
        },
        deep: true,
      },
    },
  
    mounted() {
      this.renderWatermark();
      this.$nextTick(() => {
        this.observe = this.useMutationObserver(this.$el, this.onMutate, {
          attributes: true,
          childList: true,
          subtree: true,
        });
      });
    },
  
    beforeUnmount() {
      this.destroyWatermark();
      this.observe.disconnect();
      this.observe = null;
    },
  
    methods: {
      onMutate(records) {
        if (this.stopObservation) return;
  
        records.forEach((mutation) => {
          if (!reRendering(mutation, this.watermarkRef)) return;
          this.destroyWatermark();
          this.renderWatermark();
        });
      },
      useMutationObserver(target, callback, options) {
        const isSupported = typeof MutationObserver !== "undefined";
        if (!isSupported) return false;
        const observe = new MutationObserver(callback);
        observe.observe(target, options);
        return observe;
      },
      getMarkSize(ctx) {
        const props = this.$props;
        const { fontSize, fontFamily } = props.font;
  
        let defaultWidth;
        let defaultHeight;
        const content = props.content;
        const image = props.image;
        const width = props.width;
        const height = props.height;
  
        if (!image && ctx.measureText) {
          ctx.font = `${Number(fontSize)}px ${fontFamily}`;
          const contents = Array.isArray(content) ? content : [content];
          const widths = contents.map((item) => ctx.measureText(item).width);
          defaultWidth = Math.ceil(Math.max(...widths));
          defaultHeight =
            Number(fontSize.value) * contents.length +
            (contents.length - 1) * FontGap;
        }
  
        return [width ?? defaultWidth, height ?? defaultHeight];
      },
      rotateWatermark(ctx, rotateX, rotateY, rotate) {
        const direction = this.$props.clockwise ? 1 : -1;
        ctx.translate(rotateX, rotateY);
        ctx.rotate((Math.PI / 180) * Number(rotate) * direction);
        ctx.translate(-rotateX, -rotateY);
      },
      fillTexts(ctx, drawX, drawY, drawWidth, drawHeight) {
        const props = this.$props;
        const { fontSize, fontFamily, fontStyle, fontWeight, color } = props.font;
  
        const ratio = getPixelRatio();
        const content = props.content;
        const mergedFontSize = Number(fontSize) * ratio;
        ctx.font = `${fontStyle} normal ${fontWeight} ${mergedFontSize}px/${drawHeight}px ${fontFamily}`;
        ctx.fillStyle = color;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.translate(drawWidth / 2, 0);
        const contents = Array.isArray(content) ? content : [content];
        contents?.forEach((item, index) => {
          ctx.fillText(
            item ?? "",
            drawX,
            drawY + index * (mergedFontSize + FontGap * ratio)
          );
        });
      },
      appendWatermark(base64Url, markWidth) {
        if (!this.watermarkRef) return;
        const props = this.$props;
        const [gapX, gapY] = props.gap;
  
        this.stopObservation = true;
        const attrs = getStyleStr({
          ...this.markStyle,
          backgroundImage: `url('${base64Url}')`,
          backgroundSize: `${(gapX + markWidth) * BaseSize}px`,
        });
        this.watermarkRef.setAttribute("style", attrs);
        this.$el.append(this.watermarkRef);
        // 延迟执行
        setTimeout(() => {
          this.stopObservation = false;
        });
      },
      renderWatermark() {
        const props = this.$props;
        const [gapX, gapY] = props.gap;
  
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const image = props.image;
        const rotate = props.rotate;
  
        if (!ctx) return false;
        if (!this.watermarkRef) {
          this.watermarkRef = document.createElement("div");
        }
  
        const ratio = getPixelRatio();
        const [markWidth, markHeight] = this.getMarkSize(ctx);
        const canvasWidth = (gapX + markWidth) * ratio;
        const canvasHeight = (gapY + markHeight) * ratio;
        canvas.setAttribute("width", `${canvasWidth * BaseSize}px`);
        canvas.setAttribute("height", `${canvasHeight * BaseSize}px`);
  
        const drawX = (gapX * ratio) / 2;
        const drawY = (gapY * ratio) / 2;
        const drawWidth = markWidth * ratio;
        const drawHeight = markHeight * ratio;
        const rotateX = (drawWidth + gapX * ratio) / 2;
        const rotateY = (drawHeight + gapY * ratio) / 2;
        /** 备选绘图参数 */
        const alternateDrawX = drawX + canvasWidth;
        const alternateDrawY = drawY + canvasHeight;
        const alternateRotateX = rotateX + canvasWidth;
        const alternateRotateY = rotateY + canvasHeight;
  
        ctx.save();
        this.rotateWatermark(ctx, rotateX, rotateY, rotate);
  
        if (image) {
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
            /** 旋转后绘制交错图 */
            ctx.restore();
            this.rotateWatermark(ctx, alternateRotateX, alternateRotateY, rotate);
            ctx.drawImage(
              img,
              alternateDrawX,
              alternateDrawY,
              drawWidth,
              drawHeight
            );
            this.appendWatermark(canvas.toDataURL(), markWidth);
          };
          img.crossOrigin = "anonymous";
          img.referrerPolicy = "no-referrer";
          img.src = image;
        } else {
          this.fillTexts(ctx, drawX, drawY, drawWidth, drawHeight);
          /** 旋转后填充交错的文本*/
          ctx.restore();
          this.rotateWatermark(ctx, alternateRotateX, alternateRotateY, rotate);
          this.fillTexts(
            ctx,
            alternateDrawX,
            alternateDrawY,
            drawWidth,
            drawHeight
          );
          this.appendWatermark(canvas.toDataURL(), markWidth);
        }
      },
      destroyWatermark() {
        if (!this.watermarkRef) return;
        this.watermarkRef.remove();
        this.watermarkRef = undefined;
      },
    },
    //  End
  };
  </script>
  
  <style lang="scss" scoped>
  .watermark-container {
    position: relative;
    .watermark-content {
      position: relative;
      z-index: 1;
    }
  }
  </style>
  