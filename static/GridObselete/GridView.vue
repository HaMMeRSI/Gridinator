<template>
	<div class="GridClass" :id="gridId">
		<template v-for="(comp, index) in elements">
			<component class="gridItem" v-if="!comp.isComp" :is="comp" :key="index" :style="comp.styleData"></component>  
			<component v-if="comp.isComp" :is="comp.component" v-bind="comp.props" :style="comp.style" :key="index"></component>  
		</template> 
	</div>
</template>

<script>
	export default {
		name: 'grid',
		props: ['dataSource', 'styleData', 'gridId'],
		computed: {
			elements () {
				var parsedHier = [];

				for (let comp of this.dataSource) {
					var RenderedComp;
					if (!comp.isComp) {
						RenderedComp = {
							id: comp.id,
							name: comp.name + '1',
							template: comp.render(),
							styleData: comp.style,
							isComp: comp.isComp
						};
					} else {
						RenderedComp = comp;
					}

					parsedHier.push(RenderedComp);
				}

				return parsedHier;
			}
		}
	}
</script>

<style>
	.GridClass {
		display: grid;
		width: 100%;
		height: 100%;
		position: relative;
	}
</style>
