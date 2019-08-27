<template>
	<div class="DrawGrid">
		<template v-for="row in rowCount">
			<div    v-for="col in colCount" 
					class="GridCell"
					:class="{'marked' : gridState[row-1][col-1]}" 
					:key="row * colCount * rowCount + col" 
					@click.stop="selectDeadCell(row-1, col-1)"></div>
		</template>
	</div>
</template>

<script>
	export default {
		name: 'GridEditor',
		props: ['gridId'],
		methods: {
			selectDeadCell (row, col) {
				this.$store.commit('selectGridCell', {
					gridId: this.gridId,
					position: {row, col}
				})
			}
		},
		computed: {
			gridState () {
				return this.$store.state.GridStore.gridStates[this.gridId];
			},
			colCount () {
				let colCount = 0;

				if (this.gridState) {
					colCount = this.gridState[0].length;
				}

				return colCount;
			},
			rowCount () {
				let rowCount = 0;

				if (this.gridState) {
					rowCount = this.gridState.length;
				}

				return rowCount;
			}
		}
	}
</script>

<style>
	.DrawGrid {
		display: grid;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background: none !important;
	}

	.GridCell {
		outline: 1px solid black;
		height: 100%;
	}

	 .marked {
		background: rgba(0, 0, 0, .3);
	}

</style>
