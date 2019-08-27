<template>
	<div class="HtmlEditorContainer" data-app>
		<textarea class="HtmlEditorText" v-model="innerHTML.value">
		</textarea>
	</div>
</template>

<script>

export default {
	name: 'HtmlEditor',
	data() {
		return {};
	},
	methods: {
	},
	computed: {
		innerHTML() {
			return this.$store.state.layoutState.selectedCell.innerHTML || {}
		}
	}
}
</script>

<style lang="less">
	.HtmlEditorContainer {
		padding: 10px;
		width: 100%;
		height: 100%;

		.HtmlEditorText {
			width: 100%;
			height: 100%;
			border: 1px solid black;
			border-radius: 5px;
			box-shadow: 1px 0px 7px 1px rgba(0, 0, 0, .3);
			padding: 5px;
    		outline: none;
		}
	}
</style>
