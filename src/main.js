// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import ElementStore from '@/GlobalState/ElementStore'
import LayoutState from '@/GlobalState/LayoutState/LayoutState'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css';
import vHtml from '@/directives/vHtml'
Vue.config.productionTip = false

Vue.use(Vuex);
Vue.use(Vuetify);

Vue.directive('cHtml', vHtml);

const store = new Vuex.Store({
	modules: {
		ElementStore,
		layoutState: LayoutState
	}
});

/* eslint-disable no-new */
new Vue({
	el: '#app',
	template: '<App/>',
	store,
	components: {
		App
	}
})
