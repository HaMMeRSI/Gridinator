import Vue from 'vue'

export default {
	state: {
		gridStates: {
			// MainGrid: [X, Y] { selected: false }
		},
		selectedGridPart: {
			gridId: '',
			rectangle: []
		}
	},
	mutations: {
		createGrid(state, {
			style,
			gridId
		}) {
			const newArr = [];

			const rowCount = getTemplateCount(style.gridTemplateRows);
			const colCount = getTemplateCount(style.gridTemplateColumns);

			for (let row = 0; row < rowCount; row++) {
				newArr.push((new Array(colCount)).fill(false));
			}

			Vue.set(state.gridStates, gridId, newArr);
		},
		updateGrid(state, {
			style,
			gridId
		}) {
			const newArr = [];
			const gridState = state.gridStates[gridId];

			const rowCount = getTemplateCount(style.gridTemplateRows);
			const colCount = getTemplateCount(style.gridTemplateColumns);

			if (!(gridState.length === rowCount && gridState[0].length === colCount)) {
				for (let row = 0; row < rowCount; row++) {
					newArr.push(new Array(colCount).fill(false));
				}

				state.gridStates[gridId] = newArr;
			}
		},
		selectGridCell(state, {
			gridId,
			position
		}) {
			if (state.selectedGridPart.gridId && state.selectedGridPart.gridId !== gridId) {
				return;
			}

			const gState = state.gridStates[gridId];
			const currentRec = state.selectedGridPart.rectangle;
			const newRec = currentRec.filter(x => !(x.row === position.row && x.col === position.col));

			// Removed 1 position, else added 1
			if (newRec.length !== currentRec.length) {
				// Was 1 position need to reset greed
				if (newRec.length === 0) {
					state.selectedGridPart.gridId = '';
					setArray(gState[currentRec[0].row], currentRec[0].col, false);
				} else {
					setGrid(gState, currentRec[0], currentRec[1], false);
					setArray(gState[newRec[0].row], newRec[0].col, true);
				}

				state.selectedGridPart.rectangle = newRec;
			} else {
				if (currentRec.length === 0) {
					state.selectedGridPart.gridId = gridId;
					setArray(gState[position.row], position.col, true);
				} else if (currentRec.length === 1) {
					setGrid(gState, currentRec[0], position, true);
				} else {
					setGrid(gState, currentRec[0], currentRec[1], false);
					setGrid(gState, currentRec[0], position, true);
				}

				currentRec.splice(1, 1, position);
			}
		}
	}
}

function getTemplateCount(temp) {
	if (temp.indexOf('repeat') === -1) {
		return temp.split(' ').length;
	}

	var [rep, items] = temp.replace('repeat(', '').replace(')', '').split(',').map(x => x.trim());

	return parseInt(rep) * items.split(' ').length;
}

function setGrid(grid, p1, p2, val) {
	const startRow = Math.min(p1.row, p2.row);
	const startCol = Math.min(p1.col, p2.col);

	for (let row = 0; row <= Math.abs(p1.row - p2.row); row++) {
		for (let col = 0; col <= Math.abs(p1.col - p2.col); col++) {
			setArray(grid[startRow + row], startCol + col, val);
		}
	}
}

function setArray(a, i, v) {
	a.splice(i, 1, v);
}
