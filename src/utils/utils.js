
import {getRequest} from './api'
export const initMenu=(router, store)=>{
  if (store.state.routes.length > 0) {
    return;
  }
  getRequest("/config/sysmenu").then(xhr=>{
    if(xhr && xhr.status==200){
      var fmtRoutes = formatRoutes(resp.data);
      store.commit('initMenu', fmtRoutes);
      store.dispatch('connect');
    }
  })
}

/**
 * 加载组件
 * @param routes
 */
export const formatRoutes=(routes)=>{
  let fmRoutes = [];
  routes.forEach((router)=>{
    let {
      path,
      component,
      name,
      meta,
      iconCls,
      children
    }=router;
    if(children && children instanceof Array){
      children = formatRoutes(children);
    }
    let fmRouter = {
      path: path,
      name:name,
      iconCls:iconCls,
      meta:meta,
      children:children,
      component(resolve){
        if(component.startsWith("Home")){
          require(['../components/' + component + '.vue'], resolve)
        }

      }
    }
    fmRoutes.push(fmRouter);
  })
}
