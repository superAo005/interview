<template>
  <div class="wm-container">
    <div class="wm-content">
      <slot />
    </div>
  </div>
</template>

<script>
import {
  getPixelRatio,
  getStyleStr,
  reRendering,
  FontGap,
  getClips,
  logoW
} from './utils'
const rate = 350
let lastClick = Date.now() - rate
const BaseSize = 1
export default {
  name: 'Watermark',
  props: {
    zIndex: { type: Number, default: 9999 },
    rotate: { type: Number, default: -25 }, // 水印的旋转角度
    width: { type: [String, Number], default: 120 },
    height: { type: [String, Number], default: 64 },
    image: { type: String, default: '' },
    content: { type: [String, Array], default: '' },
    logo: { type: String, default: '' },
    font: {
      type: Object,
      default: () => ({
        fontSize: 14,
        fontFamily: 'sans-serif',
        fontStyle: 'normal',
        fontWeight: 'normal',
        color: 'rgba(0, 0, 0, 0.15)',
        textAlign: 'left',
        textBaseline: 'top'
      })
    },
    clockwise: { type: Boolean, default: true },
    opacity: { type: Number, default: 0.75 },
    gap: { type: Array, default: () => [100, 100] }, // 水印之间的间距
    offset: { type: Array, default: () => [0, 0] } // 水印从容器左上角的偏移
  },
  data() {
    return {
      watermarkRef: null,
      stopObservation: false,
      observe: null
    }
  },
  computed: {
    markStyle() {
      const props = this.$props
      const [gapX, gapY] = props.gap
      const [offsetX, offsetY] = props.offset
      const gapXCenter = gapX / 2
      const gapYCenter = gapY / 2
      const offsetTop = offsetY || gapYCenter
      const offsetLeft = offsetX || gapXCenter
      const markStyle = {
        zIndex: this.zIndex,
        opacity: this.opacity,
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        backgroundRepeat: 'repeat'
      }
      let positionLeft = offsetLeft - gapXCenter
      let positionTop = offsetTop - gapYCenter
      if (positionLeft > 0) {
        markStyle.left = `${positionLeft}px`
        markStyle.width = `calc(100% - ${positionLeft}px)`
        positionLeft = 0
      }
      if (positionTop > 0) {
        markStyle.top = `${positionTop}px`
        markStyle.height = `calc(100% - ${positionTop}px)`
        positionTop = 0
      }
      markStyle.backgroundPosition = `${positionLeft}px ${positionTop}px`

      return markStyle
    }
  },
  watch: {
    $props: {
      handler() {
        if (this.isShowKey('/adviser/tool/watermark')) {
          if (Date.now() - lastClick >= rate) {
            this.stopObservation = true
            this.renderWatermark()
            // 延迟执行
            setTimeout(() => {
              this.stopObservation = false
              lastClick = Date.now()
            })
          }
        }
      },
      deep: true
    }
  },
  mounted() {
    if (this.isShowKey('/adviser/tool/watermark')) {
      this.renderWatermark()
      this.$nextTick(() => {
        this.observe = this.useMutationObserver(this.$el, this.onMutate, {
          attributes: true,
          childList: true,
          subtree: true
        })
      })
    }
  },
  beforeDestroy() {
    this.destroyWatermark()
    this.observe.disconnect()
    this.observe = null
  },
  beforeDestroy() {
    this.destroyWatermark()
    this.observe.disconnect()
    this.observe = null
  },
  methods: {
    // 监听防篡改水印
    onMutate(records) {
      if (this.stopObservation) return
      records.forEach((mutation) => {
        if (!reRendering(mutation, this.watermarkRef)) return
        this.destroyWatermark()
        this.renderWatermark()
      })
    },
    useMutationObserver(target, callback, options) {
      const isSupported = typeof MutationObserver !== 'undefined'
      if (!isSupported) return false
      const observe = new MutationObserver(callback)
      observe.observe(target, options)
      return observe
    },
    // 水印大小
    getMarkSize(ctx) {
      const props = this.$props
      const { fontSize, fontFamily } = props.font
      let defaultWidth
      let defaultHeight
      const content = props.content
      const image = props.image
      const width = props.width
      const height = props.height
      if (!image && ctx.measureText) {
        ctx.font = `${Number(fontSize)}px ${fontFamily}`
        const contents = Array.isArray(content) ? content : [content]
        const widths = contents.map((item) => ctx.measureText(item).width)
        defaultWidth = Math.ceil(Math.max(...widths)) + logoW + 10
        defaultHeight =
          Number(fontSize) * contents.length + (contents.length - 1) * FontGap
      }
      // return [width ?? defaultWidth, height ?? defaultHeight]
      return [defaultWidth ?? width, defaultHeight ?? height]
    },
    // 旋转水印
    rotateWatermark(ctx, rotateX, rotateY, rotate) {
      const direction = this.$props.clockwise ? 1 : -1
      const angle = (Math.PI / 180) * Number(rotate) * direction
      ctx.translate(rotateX, rotateY)
      ctx.rotate(angle)
    },
    // 水印内容
    fillTexts(ctx, drawX, drawY, drawWidth, drawHeight) {
      const props = this.$props
      const {
        fontSize,
        fontFamily,
        fontStyle,
        fontWeight,
        color,
        textAlign,
        textBaseline
      } = props.font
      const ratio = getPixelRatio()
      const content = props.content
      const mergedFontSize = Number(fontSize) * ratio
      ctx.font = `${fontStyle} normal ${fontWeight} ${mergedFontSize}px/${drawHeight}px ${fontFamily}`
      ctx.fillStyle = color
      ctx.textAlign = textAlign
      ctx.textBaseline = textBaseline
      // ctx.translate(drawWidth / 2, 0)
      const contents = Array.isArray(content) ? content : [content]
      contents?.forEach((item, index) => {
        ctx.fillText(
          item ?? '',
          drawX,
          drawY + index * (mergedFontSize + FontGap * ratio)
        )
      })
    },
    appendWatermark(base64Url, markWidth) {
      if (!this.watermarkRef) return
      const props = this.$props
      const [gapX] = props.gap
      // const rotate = props.rotate
      this.stopObservation = true
      const attrs = getStyleStr({
        ...this.markStyle,
        backgroundImage: `url('${base64Url}')`,
        backgroundSize: `${(gapX + markWidth) * BaseSize}px`
        // transform: `rotate(${rotate}deg)`
      })
      this.watermarkRef.setAttribute('style', attrs)
      this.$el.append(this.watermarkRef)
      // 延迟执行
      setTimeout(() => {
        this.stopObservation = false
      })
    },
    // 渲染水印
    renderWatermark() {
      const props = this.$props
      const [gapX, gapY] = props.gap
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const logo = props.logo
      const rotate = props.rotate
      if (!ctx) return false
      if (!this.watermarkRef) {
        this.watermarkRef = document.createElement('div')
      }
      const ratio = getPixelRatio()
      const [markWidth, markHeight] = this.getMarkSize(ctx)
      const drawCanvas = (drawContent, logo) => {
        const [textClips, clipWidth] = getClips(
          drawContent || '',
          logo,
          rotate,
          ratio,
          markWidth,
          markHeight,
          {
            ...props.font
          },
          gapX,
          gapY
        )

        this.appendWatermark(textClips, clipWidth)
      }
      if (logo) {
        const img = new Image()
        img.onload = () => {
          drawCanvas(props.content, img)
        }
        img.crossOrigin = 'anonymous'
        img.referrerPolicy = 'no-referrer'
        img.src = logo
      }
    },
    destroyWatermark() {
      if (!this.watermarkRef) return
      this.watermarkRef.remove()
      this.watermarkRef = undefined
    }
  }
}
</script>

<style lang="scss" scoped>
.wm-container {
  position: relative;
  height: 100%;
  display: flex;
}
.wm-content {
  position: relative;
  flex-grow: 1;
  height: 100%;
  overflow: hidden;
}
</style>
