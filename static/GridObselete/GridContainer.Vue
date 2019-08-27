<template>
	<div class="GridContainer" :style="componentStyle">
		<grid-view :style="gridStyle" :data-source="dataSource" :grid-id="gridId" />
		<grid-editor :style="gridStyle" :grid-id="gridId" />
	</div>
</template>

<script>
	import gridView from './GridView'
	import gridEditor from './GridEditor'

	export default {
		name: 'gridCell',
		props: ['dataSource', 'componentStyle', 'gridStyle', 'gridId'],
		components: {
			gridView,
			gridEditor
		},
		created () {
			this.$store.commit('createGrid', {
				style: this.gridStyle,
				gridId: this.gridId
			});
		},
		methods: {
			selectCell () {
				this.$store.commit('addGridCell', {
					position: this.position,
					gridId: this.gridId
				});
			}
		},
		watch: {
			styleData: {
				handler (newVal) {
					this.$store.commit('updateGrid', {
						style: this.styleData,
						gridId: this.gridId
					});
				},
				deep: true
			}
		}
	}
</script>

<style>
	.GridContainer {
		position: relative;
		height: 100%;
	}
</style>
