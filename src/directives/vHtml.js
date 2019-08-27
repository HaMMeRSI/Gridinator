export default {
	inserted: function (el, {value}) {
		if (!value) return;
		el.innerHTML = value;
	},
	update: function (el, {value}) {
		if (!value) return;
		el.innerHTML = value;
	}
}
