import Axios from "axios";

/**
 * 提供msg相关接口
 */
export default {
    add:function({name,city,type,age,gender,qq,text}){
         var param={
            name:name,
            city:city,
            type:type,
            age:age,
            gender:gender,
            text:text,
            qq:qq
        };
        return Axios.post('/api/msg-api/add', param);
    },
    update:function({id,name,city,type,age,gender,qq,text}){
        var param={
            id:id,
           name:name,
           city:city,
           type:type,
           age:age,
           gender:gender,
           text:text,
           qq:qq
       };
       return Axios.post('/api/msg-api/update', param);
   },
   delete:function({id}){
        var param={
            id:id
        };
        return Axios.post('/api/msg-api/delete', param);
    },
    deleteBatch:function({ids}){
        var param={
            ids:ids
        };
        return Axios.post('/api/msg-api/deleteBatch', param);
    },
    getList({name,city,type,age,gender,qq,startdate,enddate,currentPage,pageSize}){
        var param={
            name:name,
            city:city,
            type:type,
            age:age,
            gender:gender,
            qq:qq,
            startdate:startdate,
            enddate:enddate,
            currentPage:currentPage,
            pageSize:pageSize
        };
        return Axios.post('/api/msg-api/queryList', param);
    }
}
