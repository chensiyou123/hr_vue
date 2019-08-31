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
    nfDot: false
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
    toggleNFDot(state, newValue){
      state.nfDot = newValue;
    },
    //更新系统信息
    updateMsgList(state, newMsgList){
      state.msgList = newMsgList;
    },
  },
  actions:{
    connect(context){
      context.state.stomp = Stomp.over(new SockJS("/ws/endpointChat"));
      context.state.stomp.connect({}, frame=> {
        context.state.stomp.subscribe("/user/queue/chat",message=>{
          var msg = JSON.parse(message.body);
          var oldMsg = window.localStorage.getItem(context.state.user.username + "#" + msg.from);
          if (oldMsg == null) {
            oldMsg = [];
            oldMsg.push(msg);
            window.localStorage.setItem(context.state.user.username + "#" + msg.from, JSON.stringify(oldMsg))
          } else {
            var oldMsgJson = JSON.parse(oldMsg);
            oldMsgJson.push(msg);
            window.localStorage.setItem(context.state.user.username + "#" + msg.from, JSON.stringify(oldMsgJson))
          }
          if (msg.from != context.state.currentFriend.username) {
            context.commit("addValue2DotMap", "isDot#" + context.state.user.username + "#" + msg.from);
          }
          //更新msgList
          var oldMsg2 = window.localStorage.getItem(context.state.user.username + "#" + context.state.currentFriend.username);
          if (oldMsg2 == null) {
            context.commit('updateMsgList', []);
          } else {
            context.commit('updateMsgList', JSON.parse(oldMsg2));
          }
        });
        context.state.stomp.subscribe("/topic/nf", message=> {
          context.commit('toggleNFDot', true);
        });
      },failedMsg=> {

      })
    }
  }
})
