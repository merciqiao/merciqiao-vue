import Axios from "axios";

/**
 * 系统认证接口
 */
export default {
    /**
     * 系统登陆
     */
    loginIn:function({loginName, password}) {
        var param={
            loginName:loginName,
            password:password
        };
        return Axios.post('/api/shiro-api/login',param);
        
    },
    /**
     * 退出登陆
     */
    loginOut:function(){
         return Axios.post('/api/shiro-api/loginout');
    }
}
