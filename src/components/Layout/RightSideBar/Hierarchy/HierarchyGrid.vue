<template>
	<div id="hier-grid">
		<hierarchyGridRow :component="gridSource"></hierarchyGridRow>
		<button id="deleteButton" @click="deleteSelected">Delete selected</button>
	</div>
</template>

<script>
import hierarchyGridRow from './HierarchyGridRow'

export default {
	components: {
		hierarchyGridRow
	}
}
</script>

<style>
#hier-grid{
	background: #ececee;
	color: #003b49;
	flex: 1;
	display: flex;
	flex-direction: column;
	padding: 5px;
}

#deleteButton {
	margin-top: auto;
}
</style>