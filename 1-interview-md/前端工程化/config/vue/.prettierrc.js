module.exports = {
	printWidth: 100, //每行到多少长度开始折行
	tabWidth: 2,
	singleQuote: true, //单引号
	trailingComma: 'none', //数组、对象最后一个元素的尾逗号
	bracketSpacing: true, //花括号前后空格
	jsxBracketSameLine: true, //使多行JSX元素最后一行末尾的 > 单独一行
	parser: 'babel', //指定使用哪一种解析器
	semi: false, //是否在行尾加分号
	useTabs: true, //使用tab（制表符）缩进而非空格
	arrowParens: 'avoid', //只有一个参数的箭头函数的参数是否带圆括号（默认avoid不带）
	jsxSingleQuote: true, //在JSX中使用单引号
	htmlWhitespaceSensitivity: 'ignore', //为 HTML 文件定义全局空格敏感度
	quoteProps: 'as-needed' //自定义引号配置
};
