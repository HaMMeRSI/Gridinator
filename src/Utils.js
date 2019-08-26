export function isObject(item) {
	return (item && typeof item === 'object' && !Array.isArray(item));
}

export default {
	guid() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}

		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	},
	uuid() {
		var text = '';
		// no numbers in purpose because for some reason when string starts with number style value will not accept it
		// :style="{'gridArea': 0wefwefwef}" : no style
		var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

		for (let i = 0; i < 6; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}

		return text;
	},
	mergeDeep(target, source) {
		let output = Object.assign({}, target);
		if (isObject(target) && isObject(source)) {
			Object.keys(source).forEach(key => {
				if (isObject(source[key])) {
					if (!(key in target)) {
						Object.assign(output, {
							[key]: source[key]
						});
					} else {
						output[key] = this.mergeDeep(target[key], source[key]);
					}
				} else {
					Object.assign(output, {
						[key]: source[key]
					});
				}
			});
		}
		return output;
	}
}
