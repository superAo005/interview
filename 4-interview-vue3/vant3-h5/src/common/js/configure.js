const $globalConfigure = (callback, data) => {
	const { subMsgKey = "" } = $globalStore.useCommon;
	if (subMsgKey) {
		$globalEventBus.on(subMsgKey, ($event) => {
			if (
				callback &&
				Object.prototype.toString.call(callback) === "[object Function]"
			) {
				callback({
					subMsgKey,
					event: $event,
				});
			}
		});
	} else {
		callback &&
			Object.prototype.toString.call(callback) === "[object Function]" &&
			callback({});
	}
};

export { $globalConfigure };
