<template>
	<div id="hier-grid-row">
		<div class="hier-row-name" @click="onRowClick()">
			<div class="hier-row-name-id">{{ component.id }}</div>
			<div>-</div>
			<div>{{ component.name }}</div>
		</div>
		<div v-if="showChildren" style="margin-left:10px">
			<hierarchyGridRow
				v-for="comp in component.children" 
				:key="comp.id" :component="comp">
			</hierarchyGridRow>
		</div>        
	</div>
</template>

<script>
export default {
	data () {
		return {
			showChildren: false
		}
	},
	name: 'hierarchyGridRow',
	props: ['component'],
	computed: {
		hasChildren () {
			return this.component.children !== null &&
				this.component.children !== undefined &&
				this.component.children.length > 0;
		}
	},
	methods: {
		onRowClick () {
			this.showChildren = !this.showChildren;
			this.$store.commit('changeSelectedComp', this.component);
		}
	}
}
</script>

<style>
#hier-grid-row {

}

.hier-row-name {
	display: flex;
}

.hier-row-name > div {
	margin: 0 2px;
}

.hier-row-name-id {
	max-width: 115px;
	text-overflow: ellipsis;
	overflow:hidden;
	white-space: nowrap;
}

.hier-row-name:hover {
	cursor: pointer;
}

.parent-comp {
	-webkit-text-fill-color:red;
}
</style>