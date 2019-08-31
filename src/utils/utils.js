
import {getRequest} from './api'
export const initMenu=(router, store)=>{
  if (store.state.routes.length > 0) {
    return;
  }
  getRequest("/config/sysmenu").then(xhr=>{
    if(xhr && xhr.status==200){
      let fmtRoutes = formatRoutes(xhr.data);
      router.addRoutes(fmtRoutes);
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
  routes.forEach(router=> {
    let {
      path,
      component,
      name,
      meta,
      iconCls,
      children
    } = router;
    if (children && children instanceof Array) {
      children = formatRoutes(children);
    }
    let fmRouter = {
      path: path,
      component(resolve){
        if (component.startsWith("Home")) {
          require(['../components/' + component + '.vue'], resolve)
        } else if (component.startsWith("Emp")) {
        //  require(['../components/emp/' + component + '.vue'], resolve)
        } else if (component.startsWith("Per")) {
        //  require(['../components/personnel/' + component + '.vue'], resolve)
        } else if (component.startsWith("Sal")) {
       //   require(['../components/salary/' + component + '.vue'], resolve)
        } else if (component.startsWith("Sta")) {
        //  require(['../components/statistics/' + component + '.vue'], resolve)
        } else if (component.startsWith("Sys")) {
         // require(['../components/system/' + component + '.vue'], resolve)
        }
      },
      name: name,
      iconCls: iconCls,
      meta: meta,
      children: children
    };
    fmRoutes.push(fmRouter);
  })
  return fmRoutes;
}
