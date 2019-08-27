import Vue from 'vue'

export default {
	state: {
		rootLayout: {
			id: 'root',
			name: 'Grid',
			vComponent: 'grid',
			attributes: {
				columns: 10,
				rows: 10,
				editMode: true
			},
			style: {
				backgroundColor: 'lightgrey',
				width: '100%',
				height: '100%'
			},
			areas: [],
			children: []
		},
		selectedCell: {
			style: {},
			attributes: {},
			innerHTML: {}
		},
		selectedLayout: 'root',
		selectedElement: 'root'
	},
	mutations: {
		insertNewComponent (state, component) {
			const layout = searchComponent(state.rootLayout, state.selectedLayout);
			let freeRow = -1;
			let freeCol = -1;
			let found = false;

			for (let row = 0; row < layout.areas.length && !found; row++) {
				for (let col = 0; (col < layout.areas[0].length && !found); col++) {
					if (layout.areas[row][col] === '.') {
						freeRow = row;
						freeCol = col;
						found = true;
					}
				}
			}

			if (!found) {
				throw new Error('Free space was not found please make some');
			}

			layout.children.push({
				component,
				colLineStart: freeCol,
				rowLineStart: freeRow,
				colSpan: 1,
				rowSpan: 1
			})
		},
		removeElement (state, component) {
			let layoutParent = searchComponentParent(state.rootLayout, component);
			layoutParent.children.forEach(function (v, index) {
				if (v.component.id === component) {
					Vue.delete(layoutParent.children, index);
					state.selectedLayout = layoutParent.id;
					let component = searchComponent(state.rootLayout, layoutParent.id);
					state.selectedCell.style = component.style;
					if (!component.attributes) component.attributes = {};
					state.selectedCell.attributes = component.attributes;
				}
			})
		},
		updateAreas (state, {areas, layoutId}) {
			const layout = searchComponent(state.rootLayout, layoutId);
			layout.areas = areas;
		},
		setSelectedElement (state, compId) {
			let component = searchComponent(state.rootLayout, compId);

			if (component === null) {
				state.selectedElement = '';
				state.selectedLayout = '';
				state.selectedCell.style = {};
				state.selectedCell.attributes = {};
				state.selectedCell.innerHTML = {};
				return;
			}

			state.selectedElement = compId;

			if (component.vComponent !== 'grid') {
				state.selectedLayout = searchComponentParent(state.rootLayout, compId).id;
			} else {
				state.selectedLayout = compId;
			}

			if (!component.attributes) {
				Vue.set(component, 'attributes', {});
			}

			state.selectedCell.style = component.style;
			state.selectedCell.attributes = component.attributes;
			state.selectedCell.innerHTML = component.innerHTML;
		},
		setSelectedLayoutCollpaseExpand (state, {componentId, collapsedState}) {
			const layout =	searchComponent(state.rootLayout, componentId);
			layout.collapsed === undefined ? Vue.set(layout, 'collapsed', collapsedState) : layout.collapsed = collapsedState;
		},
		removeCssPropFromSelectedElement (state, key) {
			Vue.delete(state.selectedCell.style, key);
		},
		removeAttributePropFromSelectedElement (state, key) {
			Vue.delete(state.selectedCell.attributes, key);
		}
	},
	getters: {
		getComponentFromLayout (state) {
			return (layoutID) => {
				return searchComponent(state.rootLayout, layoutID);
			}
		},
		getParentComponent (state) {
			return (layoutID) => {
				return searchComponentParent(state.rootLayout, layoutID);
			}
		}
	}
}

function searchComponent (currComponent, id) {
	if (currComponent.id === id) {
		return currComponent;
	} else if (!currComponent.children) {
		return null;
	}

	for (const {component} of currComponent.children) {
		const result = searchComponent(component, id);
		if (result) {
			return result;
		}
	}

	return null;
}

function searchComponentParent(currComponent, id) {
	if (!currComponent.children) {
		return null;
	}

	if (currComponent.children.filter(({component}) => component.id === id).length > 0) {
		return currComponent
	}

	for (const {component} of currComponent.children) {
		const result = searchComponentParent(component, id);
		if (result) {
			return result;
		}
	}

	return null;
}
