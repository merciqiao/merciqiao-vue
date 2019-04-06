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
            type:type,

        };
        return Axios.post('/api/loginlog-api/save', param);
    },
    /**
     * 还原数据
     */ 
    rollBackTables: function () {
        return Axios.post('/api/loginlog-api/rollBackTables');
    },
     /**
     * 记录吸越分数
     */ 
    addYcyScore: function ({ip,city,score,mintime}) {
        var param={
            ip:ip,
            city:city,
            score:score,
            mintime:mintime,                
        };
        return Axios.post('/api/ycyscore-api/add', param);
    },
     /**
     * 查询个人排名
     */ 
    queryRank: function ({ip}) {
        var param={
            ip:ip,             
        };
        return Axios.post('/api/ycyscore-api/queryRank', param);
    },
     /**
     * 查询个人分数
     */ 
    queryScore: function ({ip}) {
        var param={
            ip:ip,             
        };
        return Axios.post('/api/ycyscore-api/queryScore', param);
    },
     /**
     * 查询个人分数
     */ 
    queryMinTime: function ({ip}) {
        var param={
            ip:ip,             
        };
        return Axios.post('/api/ycyscore-api/queryMinTime', param);
    },
     /**
     * 查询个人分数
     */ 
    queryTodayScore: function ({ip}) {
        var param={
            ip:ip,             
        };
        return Axios.post('/api/ycyscore-api/queryTodayScore', param);
    },
     /**
     * 查询总排名
     */ 
    queryRankList: function ({currentPage,pageSize}) {
        var param={
            currentPage:currentPage,
            pageSize:pageSize            
        };
        return Axios.post('/api/ycyscore-api/queryList', param);
    },
     /**
     * 查询个人速度排名
     */ 
    querySpeedRank: function ({ip}) {
        var param={
            ip:ip,             
        };
        return Axios.post('/api/ycyscore-api/querySpeedRank', param);
    },
     /**
     * 查询个人今日排名
     */ 
    queryRankToday: function ({ip}) {
        var param={
            ip:ip,             
        };
        return Axios.post('/api/ycyscore-api/queryRankToday', param);
    },
     /**
     * 查询总速度排名
     */ 
    querySpeedList: function ({currentPage,pageSize}) {
        var param={
            currentPage:currentPage,
            pageSize:pageSize            
        };
        return Axios.post('/api/ycyscore-api/querySpeedList', param);
    },
     /**
     * 查询今日排名
     */ 
    queryToday: function ({currentPage,pageSize}) {
        var param={
            currentPage:currentPage,
            pageSize:pageSize            
        };
        return Axios.post('/api/ycyscore-api/queryToday', param);
    },
     /**
     * 查询总分排名列表
     */ 
    queryListTotal: function ({currentPage,pageSize}) {
        var param={
            currentPage:currentPage,
            pageSize:pageSize            
        };
        return Axios.post('/api/ycyscore-api/queryListTotal', param);
    },
     /**
     * 查询个人总分排名
     */ 
    queryRankTotal: function ({ip}) {
        var param={
            ip:ip,             
        };
        return Axios.post('/api/ycyscore-api/queryRankTotal', param);
    },
     /**
     * 查询总分个人分数
     */ 
    queryScoreTotal: function ({ip}) {
        var param={
            ip:ip,             
        };
        return Axios.post('/api/ycyscore-api/queryScoreTotal', param);
    },
}
