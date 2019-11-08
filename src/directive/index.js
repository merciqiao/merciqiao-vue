import Vue from 'vue'
import store from '../store'




/** 全局注册*/
Vue.directive('permission',{
  /**
   * 当被绑定元素插入到DOM时 */
  inserted(el, binding, vnode) {
    const { value } = binding;//读取指令绑定值，相当于binding.value
    const permissions = store.getters &&store.getters.btnPermissions;

    if (value) {
      const btn_permission = value;

      const hasPermission = permissions&&permissions.some(permission => {
        return btn_permission.includes(permission)
      })
    
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error('need btn_permission! Like v-permission="liuyan:add"');
    }
  }
})