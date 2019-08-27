<template>
	<div class="GridComponent" :class="{selectedHighlight: isEditable}"
		:style="GridStyle" 
		ref="grid"
		@mousemove="onGridMouseMove($event)" 
		@mouseup="isMouseDown = false"
		@mousedown.stop="selectGridForEdit($event)">
		<template 	v-for="cell in grid.children" 
					v-if="cell.component.id !== '.'"
					:area-name="cell.component.id">
			<area-editor v-if="attributes.editMode && isEditable"
						:key="cell.component.id + 'editor'" 
						:cell="cell"
						:alterColor="cell.component.id === selectedElement"
						@StartMove="onAreaMove"
						@StartResize="onAreaResize">
			</area-editor>
			<component :is="cell.component.vComponent"
						v-bind="cell.component.attributes"
						:key="cell.component.id"
						:style="mergeComponentStyle(cell.component)" 
						@mousedown.native.stop="onComponentClick(cell)"
						v-c-html="cell.component.innerHTML ? cell.component.innerHTML.value : null">
			</component> 
		</template>
	</div>
</template>

<script>
import AreaEditor from './AreaEditor'

export default {
	name: 'Grid',
	props: ['id'],
	data () {
		return {
			areas: [],
			isMouseDown: false,
			selectedCell: {},
			cellDims: {}
		};
	},
	created () {
		var self = this;
		Object.defineProperty(self.cellDims, 'cellWidth', { get: () => self.$refs.grid.offsetWidth / self.attributes.columns });
		Object.defineProperty(self.cellDims, 'cellHeight', { get: () => self.$refs.grid.offsetHeight / self.attributes.rows });
		this.$store.commit('setSelectedElement', 'root');
	},
	methods: {
		relativeX (x) { return (x - this.$refs.grid.offsetLeft); },
		relativeY (y) { return (y - this.$refs.grid.offsetTop); },
		selectGridForEdit (e) {
			this.$store.commit('setSelectedElement', this.id);
		},
		onComponentClick (cell) {
			this.$store.commit('setSelectedElement', cell.component.id);
		},
		onAreaResize ({cell, gripSide}) {
			this.selectedCell 	= {cell, gripSide};
			this.cellAction 	= this.resizeCell;
			this.isMouseDown 	= true;
		},
		onAreaMove ({cell}) {
			this.selectedCell 	= {cell};
			this.cellAction 	= this.moveCell;
			this.isMouseDown 	= true;
		},
		onGridMouseMove (e) {
			if (this.isMouseDown) {
				this.cellAction({
					mouseX: e.x,
					mouseY: e.y
				});
			}
		},
		resizeCell ({mouseX, mouseY}) {
			const {cell, gripSide} = this.selectedCell;
			const mouseRowLineSplited 	= parseInt(this.relativeY(mouseY) / (this.cellDims.cellHeight * 0.5));
			const mouseColLineSplited 	= parseInt(this.relativeX(mouseX) / (this.cellDims.cellWidth * 0.5));
			const mouseRowLineStart 	= parseInt(this.relativeY(mouseY) / (this.cellDims.cellHeight));
			const mouseColLineStart 	= parseInt(this.relativeX(mouseX) / (this.cellDims.cellWidth));

			if (gripSide === 'top') {
				if (mouseRowLineSplited % 2 === 0 && mouseRowLineStart <= (cell.rowLineStart + cell.rowSpan - 1)) {
					const newSpan = cell.rowSpan + (cell.rowLineStart - mouseRowLineStart);

					if (this.checkAreaAvailable(mouseRowLineStart, newSpan, cell.colLineStart, cell.colSpan, cell.component.id)) {
						cell.rowSpan = newSpan;
						cell.rowLineStart = mouseRowLineStart;
					}
				}
			} else if (gripSide === 'right') {
				if (mouseColLineSplited % 2 === 1 && mouseColLineStart >= cell.colLineStart) {
					const newSpan = mouseColLineStart - cell.colLineStart + 1;
					if (this.checkAreaAvailable(cell.rowLineStart, cell.rowSpan, cell.colLineStart, newSpan, cell.component.id)) {
						cell.colSpan = newSpan;
					}
				}
			} else if (gripSide === 'bottom') {
				if (mouseRowLineSplited % 2 === 1 && mouseRowLineStart >= cell.rowLineStart) {
					const newSpan = mouseRowLineStart - cell.rowLineStart + 1;

					if (this.checkAreaAvailable(cell.rowLineStart, newSpan, cell.colLineStart, cell.colSpan, cell.component.id)) {
						cell.rowSpan = newSpan;
					}
				}
			} else if (gripSide === 'left') {
				if (mouseColLineSplited % 2 === 0 && mouseColLineStart <= (cell.colLineStart + cell.colSpan - 1)) {
					const newSpan = cell.colSpan + (cell.colLineStart - mouseColLineStart);

					if (this.checkAreaAvailable(cell.rowLineStart, cell.rowSpan, mouseColLineStart, newSpan, cell.component.id)) {
						cell.colSpan = cell.colSpan + (cell.colLineStart - mouseColLineStart);
						cell.colLineStart = mouseColLineStart;
					}
				}
			}
		},
		checkAreaAvailable (rowStart, rowSpan, colStart, colSpan, id) {
			for (let row = rowStart; row < rowStart + rowSpan; row++) {
				for (let col = colStart; col < colStart + colSpan; col++) {
					if (!this.areas[row] || (this.areas[row][col] !== '.' &&
						this.areas[row][col] !== id)) {
						return false;
					}
				}
			}

			return true;
		},
		moveCell ({mouseX, mouseY}) {
			const {cell} = this.selectedCell;
			const mouseRowLineStart = parseInt(this.relativeY(mouseY) / (this.cellDims.cellHeight));
			const mouseColLineStart = parseInt(this.relativeX(mouseX) / (this.cellDims.cellWidth));

			if (this.checkAreaAvailable(mouseRowLineStart, cell.rowSpan, mouseColLineStart, cell.colSpan, cell.component.id)) {
				if (!(mouseRowLineStart + cell.rowSpan > this.attributes.rows)) {
					cell.rowLineStart = mouseRowLineStart;
				}
				if (!(mouseColLineStart + cell.colSpan > this.attributes.columns)) {
					cell.colLineStart = mouseColLineStart;
				}
			}
		},
		mergeComponentStyle ({style, id}) {
			return Object.assign({}, style, {
				gridArea: id
			});
		}
	},
	computed: {
		grid () {
			return this.$store.getters.getComponentFromLayout(this.id);
		},
		attributes () {
			const numberedDims = {
				columns: Number(this.grid.attributes.columns),
				rows: Number(this.grid.attributes.rows)
			};
			numberedDims.cellWidth = this.$refs.grid ? this.$refs.grid.offsetWidth / numberedDims.columns : 1;
			numberedDims.cellHeight = this.$refs.grid ? this.$refs.grid.offsetHeight / numberedDims.rows : 1;
			return Object.assign({}, this.grid.attributes, numberedDims);
		},
		GridStyle () {
			const gWidth = 100 / this.attributes.columns;
			const gHeight = 100 / this.attributes.rows;

			return Object.assign({}, {
				'grid-template-areas': this.CellsToString,
				'grid-template-columns': `repeat(${this.attributes.columns}, ${gWidth}%)`,
				'grid-template-rows': `repeat(${this.attributes.rows}, ${gHeight}%)`
			}, this.grid.style);
		},
		CellsToString () {
			this.$set(this, 'areas', []);
			for (let i = 0; i < this.attributes.rows; i++) {
				this.$set(this.areas, i, (new Array(this.attributes.columns).fill('.')));
			}

			for (let item of this.grid.children) {
				for (let row = 0; row < item.rowSpan; row++) {
					for (let col = 0; col < item.colSpan; col++) {
						this.areas[item.rowLineStart + row].splice(item.colLineStart + col, 1, item.component.id);
					}
				}
			}

			this.$store.commit('updateAreas', {
				areas: this.areas,
				layoutId: this.id
			});

			return this.areas.map(row => `"${row.join(' ')}"`).join('\n');
		},
		isEditable () {
			return this.$store.state.layoutState.selectedLayout === this.id;
		},
		selectedElement () {
			return this.$store.state.layoutState.selectedElement
		}
	},
	components: {
		AreaEditor
	}
}
</script>

<style lang="less">
.GridComponent {
	display: grid;

	* {
		box-sizing: border-box;
		min-width: 0px;
		min-height: 0px;
	}
}

.selectedHighlight {
	box-shadow: 0 1px 3px rgba(0,0,0,0.12) inset, 0 1px 2px rgba(0,0,0,0.24) inset;
}

.templateAreaContainer {
	height: 100%;
	width: 700px;

	textarea {
		width: 100%;
		min-height: 300px;
		box-sizing: border-box;
		border: 1px solid;
		padding: 5px;
		font-family: monospace;
		font-size: 1.5em;
	}
}
	
</style>
templateArea: `"a . . d"
"e f g h"
"i . . l"
"m n o p"`
	watch: g
		'attributes.columns' () {
			let ColDiff = Math.abs(this.attributes.columns - this.areas[0].length);
			let IsAdded = (this.attributes.columns - this.areas[0].length) > 0;

			for (let i = 0; i < this.areas.length; i++) {
				for (let j = 0; j < ColDiff; j++) {
					if (IsAdded) {
						this.areas[i].splice(this.Areas[i].length, 1, '.');
					} else {
						this.Areas[i].splice(this.Areas[i].length - 1, 1);
					}
				}
			}
		},
		'attributes.rows' () a
			let RowDiff = Math.abs(this.attributes.rows - this.Areas.length);
			let IsAdded = (this.attributes.rows - this.Areas.length) > 0;

			for (let i = 0; i < RowDiff; i++) {
				if (IsAdded) {
					this.Areas.push((new Array(this.Areas[0].length)).fill('.'));
				} else {
					this.Areas.pop();
				}
			}
		}
	},

		
		Items () {
			return [...new Set([...this.areas.join().split(',')])];
		},
		updateAreas (e) {
			this.areas = newValue.split('\n').map(row => row.trim().replace(/"/g, '').split(' '));
		}