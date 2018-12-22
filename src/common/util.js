/**
 * 公共方法
 */
exports.install = function (Vue,options){
    var _this=Vue.prototype;
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
    },
    Common.isSuccess =function(data,callback) {
        if (data && data.data) {   
            var json = data.data;
            if (json.status == 'SUCCESS') {
                _this.$message({message: '执行成功',type: "success"});
                callback(json);
            }
            else if (json.message) {
                _this.$message({message: json.message,type: "error"});
            }
        }
        else{
            _this.$message({message: '执行异常，请重试',type: "error"});
        }
    }
}
