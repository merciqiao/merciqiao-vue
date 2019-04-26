/**
 * 公共方法
 */
exports.install = function (Vue,options){
    var _this=Vue.prototype;
    var Common=Vue.prototype.$common={};
    
    /**
     * 在新页面打开
     * @param {*} $this
     * @param {*} routeName
     * @param {*} param 参数对象，对象格式
     */
    Common.OpenNewPage=function($this,routePath,param){
        let routeData=$this.$router.resolve({
            path:routePath,
            query:param
        });
        window.open(routeData.href,'_blank');
    }
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
    Common.getSessionStorage=function(key,isObj){
        var data= sessionStorage.getItem(key);
        if(isObj){
            return JSON.parse(data);
        }
        return data;
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
    },
     Common.getCity =function() {
            if(CONST_CityName!=''&&CONST_CityName!='全国'){
                return CONST_CityName;
            }
            else{
                return returnCitySN["cname"]
            }
    },
    Common.getYcyLev =function(myRank) {
        var lev='';
                            if(myRank<10){
                                lev='Lv1萌新';
                            }
                            else if(myRank<30){
                                lev='Lv2青铜';
                            }
                            else if(myRank<50){
                                lev='Lv3白银';
                            }
                            else if(myRank<70){
                                lev='Lv4黄金';
                            }
                            else if(myRank<100){
                                lev='Lv5铂金';
                            }
                            else if(myRank<150){
                                lev='Lv6钻石';
                            }
                            else if(myRank<200){
                                lev='Lv6星耀';
                            }
                            else if(myRank<300){
                                lev='Lv7王者';
                            }
                            else{
                                lev='Lv8铁粉';
                            }
                            return lev;
    }
    Common.getYcyTotalLev =function(myRank) {
        var lev='';         if(myRank<5){
                                lev='Lv1|初级粉丝';
                            }
                            else if(myRank<15){
                                lev='Lv2|中级粉丝';
                            }
                            else if(myRank<30){
                                lev='Lv3|高级粉丝';
                            }
                            else if(myRank<=50){
                                lev='Lv4|进阶粉丝';
                            }
                            else if(myRank<100){
                                lev='Lv5|进阶粉丝';
                            }
                            else if(myRank<200){
                                lev='Lv6|活跃粉丝';
                            }
                            else if(myRank<500){
                                lev='Lv7|活跃粉丝';
                            }
                            else if(myRank<1000){
                                lev='Lv8|忠实粉丝';
                            }
                            else if(myRank<2000){
                                lev='Lv9|忠实粉丝';
                            }
                            else if(myRank<3000){
                                lev='Lv10|知名粉丝';
                            }
                            else if(myRank<6000){
                                lev='Lv11|知名粉丝';
                            }
                            else if(myRank<10000){
                                lev='Lv12|人气粉丝';
                            }
                            else if(myRank<18000){
                                lev='Lv13|人气粉丝';
                            }
                            else if(myRank<30000){
                                lev='Lv14|资深元老';
                            }
                            else if(myRank<60000){
                                lev='Lv15|资深元老';
                            }
                            else if(myRank<100000){
                                lev='Lv16|掌门元老';
                            }
                            else if(myRank<300000){
                                lev='Lv17|荣誉元老';
                            }
                            else{
                                lev='Lv18|精神领袖'
                            }
                            return lev;
    }
    Common.getTimeLev =function(myRank) {
        var lev='';
                            if(myRank<10){
                                lev=8;
                            }
                            else if(myRank<30){
                                lev=7;
                            }
                            else if(myRank<50){
                                lev=6;  
                            }
                            else if(myRank<70){
                                lev=5;
                            }
                            else if(myRank<100){
                                lev=4;
                            }
                            else if(myRank<150){
                                lev=3;
                            }
                            else if(myRank<200){
                                lev=2;
                            }
                            else if(myRank<300){
                                lev=2;
                            }
                            else{
                                lev=1;
                            }
                            return lev;
    }
    Common.getLevColor =function(myRank) {
        var lev='';
                            if(myRank<10){
                                lev='';
                            }
                            else if(myRank<30){
                                lev='#A3D4F1';
                            }
                            else if(myRank<50){
                                lev='#A3D4F1'; 
                            }
                            else if(myRank<70){
                                lev='#2094D3';  
                            }
                            else if(myRank<100){
                                lev='#72C2B3';
                            }
                            else if(myRank<150){
                                lev='#F094BA';
                            }
                            else if(myRank<200){
                                lev='#F7D573';
                            }
                            else if(myRank<300){
                                lev='#57B7DF';
                            }
                            else{
                                lev='#CBA7F9';
                            }
                            return lev;
    }
    Common.getGuid =function() {
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }
    }
  }

