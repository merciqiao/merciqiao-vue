import Axios from "axios";
/**
 * 提供组织,用户,角色等相关接口
 */
export default {
    add:function({city,ip,code}){
         var param={
            ip:ip,
            city:city,
            code:code           
        };
        return Axios.post('/api/mayi-api/add', param);
    },
    copy({ip,addid}){
        var param={
            ip:ip,
            addid:addid
        }
        return Axios.post('/api/mayirecord-api/add', param);
    },
    getList({ip,currentPage,pageSize}){
        var param={
            ip:ip,
            currentPage:currentPage,
            pageSize:pageSize
        };
        return Axios.post('/api/mayi-api/queryList', param);
    }
}