/**
 * 公共方法
 */
exports.install = function (Vue,options){
    var Common=Vue.prototype.$common={};
    /**
     * 写入sessionStorage
     */
    Common.setSessionStorage=function(key,objData){
        if(typeof objData=='string'){
            sessionStorage.setItem(key,objData);
        }
        else{
            sessionStorage.setItem(key,JSON.stringify(objData));
        }
        
    }
    /**
     * 读取sessionStorage
     */
    Common.getSessionStorage=function(key,objData){
        var data= sessionStorage.getItem(key);
        if(typeof data=='string'){
            return data;
        }
        else{
            return JSON.parse(data);
        }
    },
     /**
     * 移除sessionStorage
     */
    Common.removeSessionStorage=function(key){
        sessionStorage.removeItem(key);
    }
    ,
    Common.timestampToTime =function(row, column) {
          var date = row[column.property];
          if (date == undefined) {
             return "";
          }
          return moment(date).format("YYYY-MM-DD HH:mm:ss");
    }
}
