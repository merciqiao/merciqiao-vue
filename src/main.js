// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import ElementUI from 'element-ui';
// import axios from 'axios'



import App from './App'
import router from './router'

import 'babel-polyfill'
import util from './common/util'
import Vuex from 'vuex'
import store from './store'
// import CKEditor from '@ckeditor/ckeditor5-vue';
window.moment=require('moment')


// import 'element-ui/lib/theme-chalk/index.css';
// import '../static/css/theme-green/index.css';

//引入多语言支持
import i18n from './common/i18n'


Vue.prototype.$ajax=axios
Vue.config.productionTip = false

// Vue.use(ElementUI);
Vue.use(util);
Vue.use(Vuex);
// Vue.use(CKEditor);


process.env.MOCK && require('@/apimock')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,//挂载i18n
  router,
  store,
  components: { App },
  template: '<App/>'
})

