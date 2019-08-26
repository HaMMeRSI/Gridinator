<template>
	<div id="app">
		<div id="SideBar">
			<side-bar></side-bar>
		</div>
		<div id="GridSide" ref="GridSide">
			<grid id="root" />
		</div>
		<right-side-bar></right-side-bar>
		<v-btn id="exportBtn" small fab color="grey lighten-2" dark @click="exportData()"><v-icon>cloud_download</v-icon></v-btn>
		<v-btn id="importBtn" small fab color="grey lighten-2" dark @click="importData()"><v-icon>cloud_upload</v-icon></v-btn>
	</div>
</template>

<script>
import grid from '@/components/Layout/Grid/Grid'
import sideBar from './components/Layout/SideBar/SideBar'
import rightSideBar from './components/Layout/RightSideBar/RightSideBar'
import JSZip from 'jszip'
import saveAs from 'save-as'

export default {
	name: 'app',
	components: {
		grid,
		sideBar,
		rightSideBar
	},
	created () {
		this.$store.commit('setSelectedElement', 'root');
	},
	methods: {
		async exportData() {
			const selectedLayoutId = this.$store.state.layoutState.selectedLayout;

			this.$store.commit('setSelectedElement', '');
			await this.$nextTick();

			const mainGrid = this.$refs['GridSide'];

			const htmlTemplate = `
			<html>
				<head>
					<link rel="stylesheet" type="text/css" href="main.css">
				</head>
				<body>
					${mainGrid.innerHTML.replace(new RegExp('&quot;', 'g'), `'`)}
				</body>
			</html>
			`;

			const styles = document.getElementsByTagName('style');

			let fullCss = '';
			for (let style of styles) {
				fullCss = `${fullCss}\n${style.innerText}`
			}

			const zip = new JSZip();
			zip.file('main.html', htmlTemplate);
			zip.file('main.css', fullCss);
			zip.file('gridinator.txt', JSON.stringify(this.$store.state.layoutState.rootLayout));
			const content = await zip.generateAsync({ type: 'blob' });
			saveAs(content, 'site.zip');

			this.$store.commit('setSelectedLayout', selectedLayoutId);
		},
		importData () {
			const inputFile = document.createElement('input');
			inputFile.type = 'file';
			inputFile.onchange = (e) => {
				const reader = new FileReader();
				reader.onload = (r) => {
					const object = JSON.parse(r.target.result);
					this.$store.state.layoutState.rootLayout = object;
					console.log(object);
				};

				reader.readAsText(event.target.files[0]);
			};

			inputFile.click();
		}
	}
}
</script>

<style lang="less">
	html {
		overflow-x: hideen;
		overflow-y: auto;
	}
	body {
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	}

	input {
		box-sizing: border-box;
		width: 100%;
	}

	#app {
		display: flex;
		width: 100%;
		height: 100vh;
		position: relative;
	}

	#SideBar {
		height: 100%;
	}
	#GridSide {
		flex: 1;
	}

	input {
		width: 100%;
		margin: 0;
		padding: 0;
		border: 1px solid black;
	}

	#exportBtn {
		position: absolute;
		bottom: 5px;
		left: 10px;
	}

	#importBtn {
		position: absolute;
		bottom: 60px;
		left: 10px;
	}
  
</style>
