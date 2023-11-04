import { createI18n } from "vue-i18n";
const DEFAULT_LANG = "zh";

const importFn =  (data)=> {
	let lang = {};

	for (const [key, value] of Object.entries(data)) {
		const moduleName = key.replace(/^\.\.\/(.*)\.\w+$/, "$1");
		const name = moduleName.split("/")[3];
		name && (lang[name] = value);
	}
	return lang;
};

let locales = {
	en: importFn(
		import.meta.glob("../../locales/US-EN/*.json", {
			import: "default",
			eager: true,
		})
	),
	zh: importFn(
		import.meta.glob("../../locales/ZH-CN/*.json", {
			import: "default",
			eager: true,
		})
	),
};

const $globalLang = createI18n({
	locale: DEFAULT_LANG,
	messages: locales,
});

export { $globalLang };
