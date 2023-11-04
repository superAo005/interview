const $globalStore = {};
const storeModule = {};
const uniName = [];
const modulesStore = import.meta.glob("../../store/**/*.js", {
	import: "default",
	eager: true,
});

for (const [, value] of Object.entries(modulesStore)) {
	const storeId = value.$id;
	if (storeId) {
		storeModule[storeId] = value;
		uniName.includes(storeId)
			? console.error(`Store的唯一ID${storeId},存在重复`)
			: uniName.push(storeId);
	}
}

const $globalRegisterStore = {
	install() {
		Object.entries(storeModule).forEach((item) => {
			$globalStore[item[0]] = item[1]();
		});
	},
};

export { 
	$globalStore,
	$globalRegisterStore
 };
