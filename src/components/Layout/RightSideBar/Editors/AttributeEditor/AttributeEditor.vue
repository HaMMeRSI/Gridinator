<template>
	<div class="AttributeEditor" data-app>
		<div class="AttributeEditorGrid AttributeEditorProps">
			<template v-for="(prop, key) in properties">
				<div :key="key + 'remove'" style="width: 17px;">
					<div  v-on:mouseout="mouseOutRemoveDiv" v-on:mouseover="mouseOverRemoveDiv" :id="'removeSignOf' + key" class="RemoveSign" v-on:click="removeProp(key, prop)"></div>
				</div>
				<div v-on:mouseout="mouseOutProperty" v-on:mouseover="mouseOverProperty" :key="key + 'label'" class="AttributeEditorKeyText">
					{{ key }}
				</div>
				<input class="cssRightInput" v-model="properties[key]" :key="key + 'value'">
			</template>
		</div>
		<div class="AttributeEditorAddNew">
			<input  id="valueOnInputText" class="AttributeEditorNewValue" v-model="newKeyName" placeholder="property key" />
			<input id="valueOnInputText"  class="AttributeEditorNewValue" v-model="newValue" v-on:keyup.enter="addNewProp" placeholder="property value" />
		</div>
	</div>
</template>

<script>

export default {
	name: 'AttributeEditor',
	data() {
		return {
			newKeyName: '',
			newValue: '',
			currValues: []
		}
	},
	methods: {
		addNewProp: function() {
			if (this.newKeyName !== null && this.newKeyName !== '' &&
				this.newValue !== null && this.newValue !== '') {
				this.currValues = []
				this.$set(this.properties, this.newKeyName, this.newValue);
				this.newKeyName = ''
				this.newValue = ''
			}
		},
		removeProp: function(key) {
			if (key !== 'columns' && key !== 'rows' && key !== 'editMode') {
				this.$store.commit('removeAttributePropFromSelectedElement', key);
			}
		},
		mouseOverProperty(event) {
			var keyValue = event.target.innerText;
			document.getElementById('removeSignOf' + keyValue).innerHTML = '-'
		},
		mouseOutProperty(event) {
			var keyValue = event.target.innerText;
			document.getElementById('removeSignOf' + keyValue).innerHTML = ''
		},
		mouseOutRemoveDiv(event) {
			event.target.innerHTML = ''
		},
		mouseOverRemoveDiv(event) {
			event.target.innerHTML = '-'
		}
	},
	computed: {
		properties() {
			return this.$store.state.layoutState.selectedCell.attributes
		}
	}
}
</script>

<style>
.fa {
	width: 15px;
}
	
.Title {
	color: black;
	font-weight: 600;
	text-align: center;
	padding-bottom: 4px;
}

.AttributeEditor {
	color: black;
	height: 100%;
	padding: 5px 10px 10px 10px;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
}

.AttributeEditorGrid {
	display: grid;
	grid-template-columns: 10px 4fr 3fr;
	grid-auto-rows: 30px;
	align-items: center;
	grid-gap: 7px;
	height: 90%;
}

.AttributeEditorProps {
	overflow-y: auto;
	margin-bottom: 10px;
}

.cssRightInput {
	border-radius: 5px;
	padding-left: 6px;
	border: 0px;
}

.AttributeEditorAddNew {
	display: flex;
	font-size: 80%;
	min-height: 7%;
}

.AttributeEditorKeyText {
	max-width: 150px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	color: green;
}

.AttributeEditorNewKey {
	width: 125%;
	font-size: 100%;
	flex: auto;
	padding: inherit
}

.AttributeEditorNewValue {
	grid-column: 3 / 4;
	margin-left: 1%;
	padding-left: 4px;
	height: 30px;
	font-size: 100%;
	color: black;
	width: 125%;
	background-color: aliceblue;
	border: 0px;
}

.RemoveSign {
	cursor: pointer;
	color: red;
	font-size: 183%;
	padding-bottom: 4px;
}

.input-group--select__autocomplete {
	font-size: 100% !important;
	color: black !important;
	background-color: aliceblue !important;
	border: 0;
	padding-left: 4px;
}

.input-group--select .input-group__selections__comma {
	font-size: 104% !important;
	padding-left: 4px;
}

.input-group__selections {
	background-color: aliceblue;
	color: black;
	border-radius: 5px;
	height: 30px;
}

.input {
	background-color: #003b49;
}

.input-group__details {
	min-height: 0;
	padding-top: 0px;
	flex: 0;
}

.menu__content--select {
	background-color: darkgray;
}

.list__tile {
	height: 32px;
}

.list__tile--highlighted { 
    background-color: cornsilk;
}
</style>
