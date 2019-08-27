<template>
	<div style="height:50%;overflow:auto;border-bottom: 1px solid black;padding:3px;">
		<svg v-bind:width="settings.width" v-bind:height="settings.height">
			<!--<svg width="100%" height="100%">-->
			<g transform="translate(0,0)">
				<transition-group tag="g" name="elements" mode="out-in">
					<g class="node" v-for="node in nodes" v-bind:key="node.id" v-bind:transform="node.style.transform" style="cursor:pointer">
						<path class="vertical-path" v-if="node.hasParent" v-bind:d="'M -'+(settings.barSpacingAncestor - settings.barWidth/2 + 1.5) + ' ' +(settings.barHeight/2) + ' H 40'">
						</path>
						<g v-show="node.selected&&node.hasParent" @click="removeElement(node.id)">
							<line v-bind:x1="(settings.barSpacingAncestor *1.1)" v-bind:x2="(settings.barSpacingAncestor * 1.1 )+ 10" v-bind:y1="(settings.barHeight/2) -5" v-bind:y2="(settings.barHeight/2) +5" stroke="red" stroke-width="5"/>
							<line v-bind:x1="(settings.barSpacingAncestor *1.1)" v-bind:x2="(settings.barSpacingAncestor * 1.1) + 10" v-bind:y1="(settings.barHeight/2) +5" v-bind:y2="(settings.barHeight/2) -5" stroke="red" stroke-width="5"/>
						</g>
						<rect rx="3" ry="3" class="elements-rect" v-bind:fill="node.fill" v-bind:height="settings.barHeight" v-bind:width="settings.barWidth" @click="onRowClick(node.id)" ></rect>
						<clipPath :id="node.id">
							<rect v-bind:height="settings.barHeight" v-bind:width="settings.barWidth" ></rect>
						</clipPath>
						<text :clip-path="'url(#'+ node.id+')'" dy="12" dx="5" width="" text-anchor="start"  @click="onRowClick(node.id)" >
						{{ node.text }}
						</text>
						<path class="vertical-path" v-if="(node.component.collapsed!=true) && node.lastchildY!= 0" v-bind:d="'M '+ (settings.barWidth/2) +' ' + (settings.barHeight) + ' V '+ ((node.lastchildY - node.x) + settings.barHeight/2)">
						</path>
						<circle v-bind:fill="node.component.collapsed? 'red':'yellow'" @click="expandOrCollapse(node.id, !node.component.collapsed)"   v-if="node.lastchildY!= 0"  r="5" v-bind:cx="'-'+(settings.barSpacingAncestor - settings.barWidth/2 )" v-bind:cy="(settings.barHeight/2)" stroke="black" stroke-width="2" />
						
					</g>
				</transition-group>
			</g>
		</svg>
	</div>
</template>

<script>
import * as d3Hierarchy from 'd3-hierarchy';

export default {
	data () {
		return {
			settings: {
				barSpacingAncestor: 20,
				barSpacingSibling: 20,
				barHeight: 15,
				barWidth: 70,
				width: 300,
				height: 300
			}
		}
	},
	name: 'HierarchyTree',
	mounted() {
		window.addEventListener('resize', this.onResize);
		this.onResize();
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.onResize);
	},
	computed: {
		root () {
			let that = this;
			let rootLayout = {};
			rootLayout.component = {};
			rootLayout.component.id = this.$store.state.layoutState.rootLayout.id;
			rootLayout.component.name = this.$store.state.layoutState.rootLayout.name;
			if (this.$store.state.layoutState.rootLayout.children.length > 0) {
				rootLayout.component.children = this.$store.state.layoutState.rootLayout.children;
			}
			let heirarchy = d3Hierarchy.hierarchy(rootLayout, function(d) {
				return d.component.children
			})
			let index = -1;
			heirarchy.each(function(node) {
				if (node.data.component.collapsed) {
					let dsc = node.descendants()
					dsc.shift();
					dsc.forEach(function(child) {
						child.hide = true;
					})
				}
			})
			heirarchy = heirarchy.each(function(node) {
				node
			})
			return this.tree(heirarchy).eachBefore((n) => {
				if (!n.hide) {
					n.x = ++index * that.settings.barSpacingSibling;
					n.y = n.depth * that.settings.barSpacingAncestor;
				}
			})
		},
		tree () {
			return d3Hierarchy.tree()
						.size([this.settings.height, this.settings.width - 160]);
		},
		nodes () {
			if (this.root) {
				let that = this;
				let nodes = [];
				this.root.descendants().forEach(function(d) {
					let mappedNode = {
						id: d.data.component.id,
						className: 'node' +
							(d.children ? ' node--internal' : ' node--leaf'),
						text: d.data.component.name,
						fill: (d.data.component.id === that.selectedElement ? 'red' : '#9e9e9e'),
						style: {
							transform: 'translate( ' + d.y + ',' + d.x + ' )'
						},
						textpos: {
							x: d.children ? -8 : 8,
							y: 3
						},
						textStyle: {
							textAnchor: d.children ? 'end' : 'start'
						},
						lastchildY: d.children ? Math.max.apply(Math, d.children.map((d) => d.x)) : 0,
						selected: d.data.component.id === that.selectedElement,
						hasParent: d.parent,
						x: d.x,
						y: d.y,
						component: d.data.component
					}
					if (!d.hide) {
						nodes.push(mappedNode);
					}
				});
				return nodes;
			}
		},
		selectedElement () {
			return this.$store.state.layoutState.selectedElement
		}
	},
	watch: {
		root: function (val) {
			var descRoots = val.descendants();
			this.settings.height = Math.max.apply(Math, descRoots.map((d) => Math.ceil(d.x))) + this.settings.barHeight;
			this.settings.width = Math.max.apply(Math, descRoots.map((d) => Math.ceil(d.y))) + this.settings.barWidth + 20;
		}
	},
	methods: {
		onResize() {
			this.settings.barHeight = Math.max(this.$el.offsetHeight * 0.05, 14);
			this.settings.barWidth = this.$el.offsetWidth * 0.14;
			this.settings.barSpacingAncestor = this.settings.barWidth * 1.1;
			this.settings.barSpacingSibling = this.settings.barHeight * 1.13;
		},
		onRowClick (componentId) {
			this.$store.commit('setSelectedElement', componentId);
		},
		expandOrCollapse (componentId, collapsedState) {
			this.$store.commit('setSelectedLayoutCollpaseExpand', {componentId, collapsedState});
		},
		removeElement (componentId) {
			this.$store.commit('removeElement', componentId);
		}
	}
}
</script>

<style>
	.elements-rect{
		stroke:lightgrey;
		stroke-width:0.2px;
	}
	.elements-enter-active{
		transition: all 0.6s;
	}
    .elements-enter{
      opacity: 0;
    }
	.vertical-path{
		stroke:black;
		stroke-width:3px;
	}

</style>