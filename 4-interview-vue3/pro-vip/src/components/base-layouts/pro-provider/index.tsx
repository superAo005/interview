import {
  reactive,
  readonly,
  provide,
  inject,
  toRefs,
  RenderFunction,
  App,
  PropType,
  SetupContext,
  InjectionKey,
} from 'vue';
import { ContentWidth } from '../typing';

const defaultPrefixCls = 'ant-pro';

export interface ProProviderProps {
  prefixCls: string;
  i18n: (t: string) => string;
  contentWidth: ContentWidth;
}

export interface ProProviderData {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
  i18n: (t: string) => string;
  contentWidth: ContentWidth;
}

export const defaultProProviderProps: ProProviderData = {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls;
    return `${defaultPrefixCls}-${suffixCls}`;
  },
  i18n: (t: string): string => t,
  contentWidth: 'Fluid',
};

export const injectProConfigKey: InjectionKey<ProProviderData> = Symbol();

const ProProvider = {
  name: 'ProProvider',
  props: {
    prefixCls: {
      type: String as PropType<string>,
      default: 'ant-pro',
    },
    contentWidth: {
      type: String as PropType<ContentWidth>,
      default: 'Fluid',
    },
    i18n: {
      type: Function as PropType<(t: string) => string>,
      default: (t: string): string => t,
    },
  },
  setup(props: ProProviderProps, { slots }: SetupContext): RenderFunction | void {
    const { prefixCls, i18n, contentWidth } = toRefs(props);
    const getPrefixCls = (suffixCls?: string, customizePrefixCls?: string): string => {
      if (customizePrefixCls) return customizePrefixCls;
      return suffixCls ? `${prefixCls.value}-${suffixCls}` : prefixCls.value;
    };

    const proConfigProvider = reactive({
      i18n,
      contentWidth,
      getPrefixCls,
    });

    provide(injectProConfigKey, readonly(proConfigProvider));

    return () => slots.default?.();
  },
  install(app: App): void {
    app.component(ProProvider.name, ProProvider);
  },
};

export const useProProvider = () => {
  return inject(injectProConfigKey, defaultProProviderProps);
};

export default ProProvider;
