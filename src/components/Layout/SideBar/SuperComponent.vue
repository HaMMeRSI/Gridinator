<template>
	<div class="superComp" @click="registerComponentToVuex()">
		{{name}}
	</div>
</template>

<script>
export default {
	name: 'superComp',
	props: ['attrs'],
	data () {
		return {
			name: this.attrs.name
		}
	},
	methods: {
		registerComponentToVuex: function () {
			let component = this.attrs.getObject();
			// component.template = component.render();
			// delete component.render;

			// if (this.selectedGridPart.gridId) {
			// 	const positions = this.selectedGridPart.rectangle;
			// 	let colSpan = 1;
			// 	let rowSpan = 1;
			// 	let startRow = positions[0].row + 1;
			// 	let startCol = positions[0].col + 1;

			// 	if (positions.length === 2) {
			// 		startRow = Math.min(positions[1].row, positions[0].row) + 1;
			// 		startCol = Math.min(positions[1].col, positions[0].col) + 1;
			// 		colSpan = Math.abs(positions[1].col - positions[0].col) + 1;
			// 		rowSpan = Math.abs(positions[1].row - positions[0].row) + 1;
			// 	}

			// 	component.style['gridRow'] = startRow + ' / span ' + rowSpan;
			// 	component.style['gridColumn'] = startCol + ' / span ' + colSpan;
			this.$store.commit('insertNewComponent', component);
			// }
		}
	},
	computed: {
		selectedGridPart () {
			return this.$store.state.GridStore.selectedGridPart;
		}
	}
}
</script>

<style>
.superComp {
	height: 100%;
	width: 100%;
	/* background-color: #111; */
	color: white;
	font-size: 20px;
	display: flex;
	justify-content: center;
}
</style>
