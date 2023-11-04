// 设置购物车数量
const setGoodsNum = (data) => {
	$globalStore.useCommon.SET_GOODS_NUM(data);
};

// 判断是否还是一个对象
const isObject = (obj) => {
	return Object.prototype.toString.call(obj) === "[object Object]";
};

// 扁平化对象
const getObjKeys = (obj) => {
	let result = {}; // 用于保存扁平化后的对象
	const helpLoop = (obj) => {
		const objKeys = Object.keys(obj);
		for (let i = 0; i < objKeys.length; i++) {
			if (typeof obj[objKeys[i]] == "object") {
				helpLoop(obj[objKeys[i]]);
			} else {
				result[objKeys[i]] = obj[objKeys[i]];
			}
		}
	};
	helpLoop(obj);

	return result;
};

// 比较两个对象差异
const comparisonObject = (objPre, objNext) => {
	if (Object.keys(objPre).length == 0 || !objPre || !objNext) return false;
	const tempPre = getObjKeys(objPre);
	const tempNext = getObjKeys(objNext);
	// 数组去重
	let keys = [];
	keys.push(...Object.keys(tempPre));
	keys.push(...Object.keys(tempNext));
	keys = [...new Set(keys)];
	for (let i = 0; i < keys.length; i++) {
		if (tempPre[keys[i]] != tempNext[keys[i]]) {
			return keys[i];
		}
	}
	return false;
};

/*
ele:要插入的元素（父元素要设置相对定位）
cloneEl：要克隆的元素
cssStyles：克隆时去掉不克隆的样式
*/
const isElementHidden = (ele = "", cloneEl = "", cssStyles = []) => {
	if (!ele || !cloneEl) {
		return false;
	}
	const clonedNode = cloneEl.cloneNode(true);
	const allStyle = cloneEl.computedStyleMap();
	for (const [prop, val] of allStyle) {
		if (!cssStyles.includes(prop)) {
			clonedNode.style[prop] = val;
		}
	}
	clonedNode.className = "";
	clonedNode.style.visibility = "hidden";
	clonedNode.style.position = "absolute";
	clonedNode.setAttribute("id", "ellipt_hidden__node___id");
	ele.appendChild(clonedNode);
	const differ = clonedNode.offsetHeight > ele.offsetHeight;
	ele.removeChild(clonedNode);
	return differ;
};

export { setGoodsNum, isObject, comparisonObject, isElementHidden };
