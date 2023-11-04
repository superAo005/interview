const modulesConstant = import.meta.glob("../../constant/**/*.js", {
	import: "default",
	eager: true,
});
const constantArr = [];
const $globalConstant = {};

for (const [key, value] of Object.entries(modulesConstant)) {
	for (const [childKey, childValue] of Object.entries(value)) {
		if (constantArr.includes(childValue)) {
			console.error(`文件${key}中常量${childValue}存在重复`);
		} else {
			constantArr.push(childValue);
			$globalConstant[childKey] = childValue;
		}
	}
}

export { $globalConstant };
