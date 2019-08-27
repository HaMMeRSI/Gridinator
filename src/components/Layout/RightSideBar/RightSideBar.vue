<template>
	<v-navigation-drawer v-model="drawerRight" right stateless :mini-variant.sync="mini">
		<v-toolbar class="grey darken-3" dark>
			<v-list class="pa-0">
				<v-list-tile avatar>
					<v-list-tile-avatar>
						<v-icon>format_list_bulleted</v-icon>
					</v-list-tile-avatar>
					<v-list-tile-content>
						<v-list-tile-title class="hierarchyHeader">Hierarchy</v-list-tile-title>
					</v-list-tile-content>
					<v-list-tile-action>
						<v-btn icon @click.native.stop="mini = !mini">
						<v-icon>chevron_right</v-icon>
						</v-btn>
					</v-list-tile-action>
				</v-list-tile>
			</v-list>
		</v-toolbar>
		<div class="menubar" v-if="!mini">
			<div id="RightSide">
				<div id="FloatContainer">
					<hierarchy-tree></hierarchy-tree>
					<v-btn-toggle v-model="type" style="background-color: #424242!important; color: white;display:flex;">
              			<v-btn flat value="css" style="flex:1;">
                			Css
              			</v-btn>
              			<v-btn flat value="attribute" style="flex:1;">
                			Attribute
              			</v-btn>
						<v-btn flat value="html" style="flex:1;">
                			Innter text
              			</v-btn>
            		</v-btn-toggle>
					<div style="height: 46%;">
						<div style="height: 100%;" v-show="type==='css'">
							<css-editor></css-editor>
						</div>
						<div style="height: 100%;" v-show="type==='attribute'">
							<attribute-editor></attribute-editor>
						</div>
						<div style="height: 100%;" v-show="type==='html'">
							<html-editor></html-editor>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="hierarchyRotation" v-else>
			Hierarchy
		</div>
	</v-navigation-drawer>
</template>

<script>
import attributeEditor from './Editors/AttributeEditor/AttributeEditor'
import cssEditor from './Editors/CssEditor/CssEditor'
import htmlEditor from './Editors/HtmlEditor/HtmlEditor'
import hierarchyTree from './Hierarchy/HierarchyTree'

export default {
	name: 'RightSideBar',
	data() {
		return {
			drawerRight: true,
			mini: false,
			type: 'css'
		}
	},
	components: {
		attributeEditor,
		cssEditor,
		hierarchyTree,
		htmlEditor
	},
	methods: {
	}
}
</script>

<style>
.navigation-drawer{
	padding: 0;
	transform: none !important;
	will-change: unset !important;
}

#RightSide {
  height: 100%;
  width: 300px;
  border-left: 1px solid grey;
}

.hierarchyHeader {
  font-size: 30px;
}

#FloatContainer {
  width: inherit;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.hierarchyRotation {
  transform: rotate(90deg);
  font-size: 32px;
  margin-top: 235px;
  color: black;
}

.toolbar{
	height: 6%;
}

.tabs{
	height: 50%;
	color: white;
	/*position: unset!important;*/
}

.tabs__bar{
	height: 9%;
	background-color: #424242!important;
}

.tabs__items{
	height: 91%;
	/*position: unset!important;*/
}

.tabs__div {
  text-transform: none;
  width: 50%;
}

.tabs__container {
	height: 43px;
}
.menubar{
	height: 94%;
}
.btn{
  text-transform: none;
}
</style>
