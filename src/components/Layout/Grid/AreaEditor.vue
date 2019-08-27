<template>
	<div class="AreaEditorContainer" :style="{'gridArea': cell.component.id}">
		<div class="AreaEditorMover" @mousedown.stop="StartMove($event)"></div>
		<div class="AreaEditorTop">
			<div @mousedown.stop="StartResize($event, 'top')" class="DraggerVert" :class="classObject"></div>
		</div>
		<div class="AreaEditorRight">
			<div @mousedown.stop="StartResize($event, 'right')" class="DraggerHor" :class="classObject"></div>
		</div>
		<div class="AreaEditorBottom">
			<div @mousedown.stop="StartResize($event, 'bottom')" class="DraggerVert" :class="classObject"></div>
		</div>
		<div class="AreaEditorLeft">
			<div @mousedown.stop="StartResize($event, 'left')" class="DraggerHor" :class="classObject"></div>
		</div>
		<!-- <slot></slot> -->
	</div>
</template>

<script>
export default {
	name: 'AreaEditor',
	props: ['cell', 'alterColor'],
	methods: {
		StartResize (e, gripSide) {
			this.$emit('StartResize', {
				cell: this.cell,
				gripSide
			});
		},
		StartMove (e) {
			this.$emit('StartMove', {
				cell: this.cell
			})
		}
	},
	computed: {
		classObject () {
			return {
				DraggerColor: !this.alterColor,
				DraggerAlternateColor: this.alterColor
			}
		}
	}
}
</script>

<style lang="less">
	.AreaEditorContainer {
		position: relative;
		user-select: none;
		pointer-events: none;
	
		.AreaEditorMover {
			position: absolute;
			top: 5px;
			left: 5px;
			width: 20px;
			height: 20px;
			pointer-events: all;
			background: rgba(172, 172, 172, 1) url("/static/draggable.png") no-repeat center center;
			background-size: 16px 16px;
			border-radius: 50%;
    		cursor: all-scroll;
		}

		.AreaEditor {
			position: absolute;
			display: flex;
			height: 100%;
			width: 100%;
			padding: 1px;
		}

		.AreaEditorTop {
			.AreaEditor;
			align-items: flex-start;
		}

		.AreaEditorRight {
			.AreaEditor;
			justify-content: flex-end;
		}
		
		.AreaEditorLeft {
			.AreaEditor;
			justify-content: flex-start;
		}

		.AreaEditorBottom {
			.AreaEditor;
			align-items: flex-end;
		}
		
		.Dragger {
			pointer-events: all;
		}

		.DraggerColor {
			background-color: rgba(92, 92, 92, 0.459);
		}

		.DraggerAlternateColor {
			background-color: rgba(180, 44, 44, 0.623);
		}

		.DraggerVert {
			.Dragger;
			cursor: row-resize;
			width: 100%;
			height: 3px;
		}

		.DraggerHor {
			.Dragger;
			cursor: col-resize;
			height: 100%;
			width: 3px;
		}
	}
</style>
