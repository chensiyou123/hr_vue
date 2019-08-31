import Vue from 'vue'
import Vuex from 'vuex'
import '../lib/stomp'
import '../lib/sockjs'
Vue.use(Vuex)
export default new Vuex.Store({
  state:{
    user:{
      name: window.localStorage.getItem('user' || '[]') == null ? '未登录' : JSON.parse(window.localStorage.getItem('user' || '[]')).name,
      userface: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).userface,
      username: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).username,
      roles: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).roles
    },
    routes: [],
    stomp: null,
  },
  mutations:{
    //登陆用户存入
    login(state,user){
      state.user = user;
      window.localStorage.setItem('user', JSON.stringify(user));
    },
    logout(state){
      window.localStorage.removeItem('user');
      state.routes = [];
    },
    //菜单信息存入
    initMenu(state, menus){
      state.routes = menus;
    },
  },
  actions:{
    connect(context){
      context.state.stomp = Stomp.over(new SockJS("/ws/endpointChat"));
    }
  }
})
