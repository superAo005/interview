import { defineComponent } from 'vue';

export default defineComponent({
  name: 'transform-vnode',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    by: {
      type: Function,
      default: undefined,
    },
    opt: {
      type: Object,
      default: undefined,
    },
  },
  setup(props, ctx) {
    return () => {
      const children = ctx && ctx.slots && ctx.slots.default ? ctx.slots.default()[0] : null;
      return props.by ? props.by(children, props.opt) : children;
    };
  },
});
