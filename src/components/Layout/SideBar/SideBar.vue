<template>
	<v-navigation-drawer width="250" stateless :mini-variant.sync="mini" v-model="drawer" dark>
		<v-toolbar class="grey darken-3" dark>
			<v-list class="pa-0">
				<v-list-tile avatar>
					<v-list-tile-avatar>
						<v-icon>build</v-icon>
					</v-list-tile-avatar>
					<v-list-tile-content>
						<v-list-tile-title class="toolsHeader">Tools</v-list-tile-title>
					</v-list-tile-content>
					<v-list-tile-action>
						<v-btn icon @click.native.stop="mini = !mini">
						<v-icon>chevron_left</v-icon>
						</v-btn>
					</v-list-tile-action>
				</v-list-tile>
			</v-list>
		</v-toolbar>
		<div class="menubar" v-if="!mini">
			<v-expansion-panel>
				<v-expansion-panel-content v-for="(category, index) in htmlComponents" :key="index">
				<div slot="header">{{category.name}}</div>
				<v-card>
					<v-list>
						<v-list-tile v-for="(member, index) in category.members" :key="index" @click="componentClicked">
							<v-list-tile-content>
								<v-list-tile-title>
									<super-component :attrs='member'></super-component>
								</v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
					</v-list>
				</v-card>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</div>
		<div class="rotation" v-else>
			Tools
		</div>
	</v-navigation-drawer>
</template>

<script>
import superComponent from './SuperComponent'

export default {
	name: 'SideBar',
	data() {
		return {
			drawer: true,
			mini: true
		}
	},
	components: {
		superComponent
	},
	computed: {
		htmlComponents () {
			return this.$store.state.ElementStore.Data;
		}
	},
	methods: {
		componentClicked() {
		}
	}
}
</script>

<style>

.sidebar .navigation-drawer {
	padding: 0;
}

.sidebar .SideBarList > div {
	line-height: 2.5em;
	cursor: pointer;
	text-align: center;
}

.sidebar .SideBarList > div:hover {
	background-color: #003b49;
}

#SideBarHeader {
	display: flex;
	justify-content: center;
	align-items: center;
}

#SideBarHeader .SideBarHeader {
	font-size: 2em;
}

.toolsHeader {
	font-size: 30px;
}

.rotation {
	transform: rotate(-90deg);
	font-size: 32px;
	margin-top: 250px;
}
</style>
