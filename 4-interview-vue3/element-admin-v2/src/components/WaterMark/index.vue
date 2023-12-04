<template>
  <div ref="containerRef" :style="[style]">
    <slot></slot>
  </div>
</template>
<script>
import {
  getPixelRatio,
  getStyleStr,
  reRendering,
  getClips,
  FontGap,
} from "./utils";
export default {
  name: "Watermark",
  props: {
    zIndex: {
      type: Number,
      default: 9,
    },
    rotate: {
      type: Number,
      default: -22,
    },
    width: Number,
    height: Number,
    image: String,
    content: {
      default: ["Element"],
    },
    gap: {
      default: () => [100, 100],
    },
  },
  data() {
    return {
      stopObservation: false,
      watermarkRef: null,
      style: {
        position: "relative",
      },
    };
  },
  computed: {
    color() {
      return this.props?.font?.color ?? "rgba(0,0,0,.15)";
    },
    fontSize() {
      return this.props?.font?.fontSize ?? 16;
    },
    fontWeight() {
      return this.props?.font?.fontWeight ?? "normal";
    },
    fontStyle() {
      return this.props?.font?.fontStyle ?? "normal";
    },
    fontFamily() {
      return this.props?.font?.fontFamily ?? "sans-serif";
    },
    textAlign() {
      return this.props?.font?.textAlign ?? "center";
    },
    textBaseline() {
      return this.props?.font?.textBaseline ?? "middle";
    },
    gapX() {
      return this.props?.gap[0];
    },
    gapY() {
      return this.props?.gap[1];
    },
    gapXCenter() {
      return this.gapX.value / 2;
    },
    gapYCenter() {
      return this.gapY.value / 2;
    },
    offsetLeft() {
      return this.props.offset?.[0] ?? this.gapXCenter.value;
    },
    offsetTop() {
      return this.props.offset?.[1] ?? this.gapYCenter.value;
    },
  },
  methods: {
    getMarkStyle() {
      const markStyle = {
        zIndex: this.props.zIndex,
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        backgroundRepeat: "repeat",
      };
      let positionLeft = this.offsetLeft - this.gapXCenter;
      let positionTop = this.offsetTop - this.gapYCenter;
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
    destroyWatermark() {
      if (this.watermarkRef) {
        this.watermarkRef.remove();
        this.watermarkRef = null;
      }
    },
    appendWatermark(base64Url, markWidth) {
      if (this.containerRef && this.watermarkRef) {
        this.stopObservation = true;
        this.watermarkRef.setAttribute(
          "style",
          getStyleStr({
            ...this.getMarkStyle(),
            backgroundImage: `url('${base64Url}')`,
            backgroundSize: `${Math.floor(markWidth)}px`,
          })
        );
        this.containerRef?.append(this.watermarkRef);
        setTimeout(() => {
          this.stopObservation = false;
        });
      }
    },
    // 得到水印的宽度和高度
    getMarkSize(ctx) {
      let defaultWidth = 120;
      let defaultHeight = 64;
      const image = this.props?.image;
      const content = this.props?.content;
      const width = this.props?.width;
      const height = this.props?.height;
      if (!image && ctx.measureText) {
        ctx.font = `${Number(this.fontSize)}px ${this.fontFamily}`;
        const contents = Array.isArray(content) ? content : [content];
        const sizes = contents.map((item) => {
          const metrics = ctx.measureText(item);

          return [
            metrics.width,
            metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent,
          ];
        });
        defaultWidth = Math.ceil(Math.max(...sizes.map((size) => size[0])));
        defaultHeight =
          Math.ceil(Math.max(...sizes.map((size) => size[1]))) *
            contents.length +
          (contents.length - 1) * FontGap;
      }
      return [width ?? defaultWidth, height ?? defaultHeight];
    },
    renderWatermark() {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const image = this.props?.image;
      const content = this.props?.content;
      const rotate = this.props?.rotate;
      if (ctx) {
        if (!this.watermarkRef) {
          this.watermarkRef = document.createElement("div");
        }
        const ratio = getPixelRatio();
        const [markWidth, markHeight] = this.getMarkSize(ctx);
        const drawCanvas = (drawContent) => {
          const [textClips, clipWidth] = getClips(
            drawContent || "",
            rotate,
            ratio,
            markWidth,
            markHeight,
            {
              color: this.color,
              fontSize: this.fontSize,
              fontStyle: this.fontStyle,
              fontWeight: this.fontWeight,
              fontFamily: this.fontFamily,
              textAlign: this.textAlign,
              textBaseline: this.textBaseline,
            },
            this.gapX,
            this.gapY
          );

          this.appendWatermark(textClips, clipWidth);
        };
        if (image) {
          const img = new Image();
          img.onload = () => {
            drawCanvas(img);
          };
          img.onerror = () => {
            drawCanvas(content);
          };
          img.crossOrigin = "anonymous";
          img.referrerPolicy = "no-referrer";
          img.src = image;
        } else {
          drawCanvas(content);
        }
      }
    },
    onMutate(mutations) {
      if (this.stopObservation) {
        return;
      }
      mutations.forEach((mutation) => {
        if (reRendering(mutation, this.watermarkRef)) {
          this.destroyWatermark();
          this.renderWatermark();
        }
      });
    },
  },
  mounted() {
    this.renderWatermark();
  },
  beforeDestroy() {
    this.destroyWatermark();
  },
  watch: {
    // props () {
    //   this.renderWatermark()
    // }
  },
};
</script>
