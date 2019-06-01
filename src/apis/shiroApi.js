import Axios from "axios";

/**
 * 系统认证接口
 */
export default {
    /**
     * 系统登陆
     */
    loginIn: function ({ loginName, password }) {
        var param = {
            loginName: loginName,
            password: password
        };
        return Axios.post('/api/shiro-api/login', param);

    },
    /**
     * 退出登陆
     */
    loginOut: function () {
        return Axios.post('/api/shiro-api/loginout');
    },
    /**
     * 记录登陆日志
     */ 
    loginLog: function ({ip,city,type}) {
        var param={
            ip:ip,
            city:city,
            type:type              
        };
        return Axios.post('/api/loginlog-api/save', param);
    },
    /**
     * 还原数据
     */ 
    rollBackTables: function () {
        return Axios.post('/api/loginlog-api/rollBackTables');
    }
}
