import Axios from "axios";
/**
 * 提供msg相关接口
 */
export default {
    add:function({name,city,type,age,gender,qq}){
         var param={
            name:name,
            city:city,
            type:type,
            age:age,
            gender:gender,
            qq:qq
        };
        return Axios.post('/api/msg-api/add', param);
    },
    getList({currentPage,pageSize}){
        var param={
            currentPage:currentPage,
            pageSize:pageSize
        };
        return Axios.post('/api/msg-api/queryList', param);
    }
}