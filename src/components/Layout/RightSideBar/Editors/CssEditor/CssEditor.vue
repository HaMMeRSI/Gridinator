<template>
	<div class="CssEditor" data-app>
		<div class="CssEditorGrid CssEditorProps">
			<template v-for="(prop, key) in properties">
				<div :key="key + 'remove'" style="width: 17px;">
					<div  v-on:mouseout="mouseOutRemoveDiv" v-on:mouseover="mouseOverRemoveDiv" :id="'removeSignOf' + key" class="RemoveSign" v-on:click="removeProp(key, prop)"></div>
				</div>
				<div v-on:mouseout="mouseOutProperty" v-on:mouseover="mouseOverProperty" :key="key + 'label'" class="CssEditorKeyText">
					{{ key }}:
				</div>
				<input class="cssRightInput" v-model="properties[key]" :key="key + 'value'">
			</template>
		</div>
		<chrome-picker v-model="colors" v-show="showColorPicker" @input="pickColor" style="z-index: 1; position: absolute;"></chrome-picker>
		<v-btn id="colorPickerBtn" class="colorPickerBtn" small fab color="grey lighten-2" dark @click="showColorPicker=!showColorPicker"><v-icon>edit</v-icon></v-btn>
		<div class="CssEditorAddNew">
			<v-select @change="chooseKey()" class="SelectOrderCss" placeholder="property key" v-model="newKeyName" :items="autoCompleteNewProperty.allCssPropertiesKeysForAuto" @input.native="loadPropertiesKeys" autocomplete></v-select>
			<input v-show="autoCompleteNewProperty.valueOnInputText" id="valueOnInputText" v-on:input="loadPropertiesValues" class="CssEditorNewValue" v-model="newValue" v-on:keyup.enter="addNewProp" placeholder="property value" />
			<v-select v-show="!autoCompleteNewProperty.valueOnInputText" class="SelectOrderCss" placeholder="property value" v-on:keyup.enter="addNewProp" v-model="newValue" :items="autoCompleteNewProperty.currValuesForAuto" @input.native="loadPropertiesValues" autocomplete></v-select>
		</div>
	</div>
</template>

<script>
import * as axios from 'axios'
import debounce from 'debounce'
import { Chrome } from 'vue-color'

export default {
	name: 'CssEditor',
	data() {
		return {
			showColorPicker: false,
			colors: '',
			newKeyName: '',
			newValue: '',
			allCssProperties: {},
			allCssPropertiesKeys: [],
			currValueOnInputText: false,
			autoCompleteNewProperty: {
				currValues: [],
				currValuesForAuto: [],
				valueOnInputText: false,
				allCssPropertiesKeysForAuto: []
			},
			autoCompleteProperty: {
				currValues: [],
				currValuesForAuto: [],
				valueOnInputText: false,
				allCssPropertiesKeysForAuto: []
			}
		}
	},
	mounted: async function() {
		const URL_PROPS = 'https://raw.githubusercontent.com/adobe/brackets/master/src/extensions/default/CSSCodeHints/CSSProperties.json'
		this.allCssProperties = (await axios.get(URL_PROPS)).data
		for (var key in this.allCssProperties) {
			this.allCssPropertiesKeys.push(key);
		}
		this.autoCompleteNewProperty.allCssPropertiesKeysForAuto = this.allCssPropertiesKeys
		this.autoCompleteNewProperty.currValues = this.getValuesBykey(this.newKeyName)
		this.autoCompleteNewProperty.currValuesForAuto = this.autoCompleteNewProperty.currValues
	},
	methods: {
		addNewProp: function() {
			if (this.newKeyName !== null && this.newKeyName !== '' &&
				this.newValue !== null && this.newValue !== '') {
				this.autoCompleteNewProperty.currValues = []
				this.autoCompleteNewProperty.currValuesForAuto = []
				this.$set(this.properties, this.newKeyName, this.newValue);
				this.newKeyName = ''
				this.newValue = ''
				this.showColorPicker = false
			}
		},
		removeProp: function(key) {
			this.$store.commit('removeCssPropFromSelectedElement', key);
		},
		loadPropertiesKeys: debounce(function(event) {
			let result = this.allCssPropertiesKeys.reduce((prev, next) => {
				if (next.includes(event.target.value)) {
					prev.push(next)
				}
				return prev
			}, [])
			this.autoCompleteNewProperty.allCssPropertiesKeysForAuto = result
		}, 200),
		loadPropertiesValues: debounce(function(event) {
			let result = this.autoCompleteNewProperty.currValues.reduce((prev, next) => {
				if (next.includes(event.target.value)) {
					prev.push(next)
				}
				return prev
			}, [])
			if (result.length === 0 && this.autoCompleteNewProperty.valueOnInputText === false) {
				this.newValue = document.getElementsByClassName('input-group--select__autocomplete')[1].value;
				this.autoCompleteNewProperty.valueOnInputText = true
				window.setTimeout(function () {
					document.getElementById('valueOnInputText').focus()
				}, 0);
			} else if (result.length !== 0 && this.autoCompleteNewProperty.valueOnInputText) {
				this.autoCompleteNewProperty.valueOnInputText = false
				window.setTimeout(function () {
					document.getElementsByClassName('input-group--select__autocomplete')[1].value = event.target.value
					document.getElementsByClassName('input-group--select__autocomplete')[1].focus()
				}, 0);
			}
			this.autoCompleteNewProperty.currValuesForAuto = result
		}, 200),
		getValuesBykey: function(key) {
			let object = this.allCssProperties[key];
			if (object) return object.values;
			return [];
		},
		chooseKey() {
			this.autoCompleteNewProperty.currValues = this.getValuesBykey(event.target.textContent);
			if (this.autoCompleteNewProperty.currValues.length === 0) {
				this.autoCompleteNewProperty.valueOnInputText = true
				window.setTimeout(function () {
					document.getElementById('valueOnInputText').focus()
				}, 0);
			} else if (this.newValue === '') {
				this.autoCompleteNewProperty.valueOnInputText = false
				this.autoCompleteNewProperty.currValuesForAuto = this.autoCompleteNewProperty.currValues;
				window.setTimeout(function () {
					document.getElementsByClassName('input-group--select__autocomplete')[1].focus()
				}, 0);
			}
		},
		mouseOverProperty(event) {
			var keyValue = event.target.innerText.substr(0, event.target.innerText.length - 1)
			document.getElementById('removeSignOf' + keyValue).innerHTML = '-'
		},
		mouseOutProperty(event) {
			var keyValue = event.target.innerText.substr(0, event.target.innerText.length - 1)
			document.getElementById('removeSignOf' + keyValue).innerHTML = ''
		},
		mouseOutRemoveDiv(event) {
			event.target.innerHTML = ''
		},
		mouseOverRemoveDiv(event) {
			event.target.innerHTML = '-'
		},
		pickColor() {
			this.newValue = this.colors.hex
			this.autoCompleteNewProperty.valueOnInputText = true
		}
	},
	computed: {
		properties() {
			return this.$store.state.layoutState.selectedCell.style
		},
		componentForPropertyValue() {
			return this.valueComponent;
		}
	},
	components: {
		'chrome-picker': Chrome
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

.CssEditor {
	color: black;
	height: 100%;
	padding: 5px 10px 10px 10px;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
}

.CssEditorGrid {
	display: grid;
	grid-template-columns: 10px 4fr 3fr;
	grid-auto-rows: 30px;
	align-items: center;
	grid-gap: 7px;
	height: 90%;
}

.CssEditorProps {
	overflow-y: auto;
	margin-bottom: 10px;
}

.cssRightInput {
	border-radius: 5px;
	padding-left: 6px;
	border: 0px;
}

.CssEditorAddNew {
	display: flex;
	font-size: 80%;
	min-height: 7%;
}

.CssEditorKeyText {
	max-width: 150px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	color: red;
}

.SelectOrderCss {
	width: 125%;
	font-size: 100%;
	flex: auto;
	padding: inherit
}

.CssEditorNewValue {
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

.colorPickerBtn {
	position: absolute;
    top: 90%;
    left: 97%;
}
</style>
