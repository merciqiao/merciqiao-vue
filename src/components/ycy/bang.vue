<template>
  <div class="_frontindex">
    <div class='wrapper' ref="wrapper">
      <div class='flexContainer'>
        <header class='head'>
            <el-row type="flex" justify="center">
                <el-col :xs="22" :sm="22" :md="20" :lg="20" :xl="14">
                    <nav class='nav'>
                        <div class='left'>
                            <a @click="goBack">返回</a>
                        </div>
                        <div class="rank">
                            <div>我的排名:{{myRank}}</div>
                            <div>打榜总数:{{allCount}}</div>
                        </div>
                        
                        <div class='right'>
                            <a @click="onSearch">刷新</a>
                        </div>
                    </nav>
                </el-col>
            </el-row>
            
        </header>
        <main class='main'>
            <el-row type="flex" justify="center">
                <el-col :xs="24" :sm="22" :md="20" :lg="20" :xl="14">
                   
                    <el-table :data="tableData" @row-click="openDetail" :row-class-name="getRowClass" v-loading="listLoading" stripe  @selection-change="handleSelectionChange">
                        <el-table-column label="排名"
                        type="index"
                        width="40">
                        </el-table-column>
                        <el-table-column prop="city" label="城市" width="110" align="center">
                            <template slot-scope="scope">
                                <h4 class="line-limit-length">{{scope.row.city}}</h4>
                            </template>
                        </el-table-column>
                        <el-table-column  prop="ip" label="ip" min-width="78" align="center">
                            <template slot-scope="scope">
                                <h4 class="line-limit-length">{{scope.row.ip|convertIp}}</h4>
                            </template>
                        </el-table-column>
                       
                        <el-table-column  prop="score" label="分数" align="center" min-width="40">
                        </el-table-column>
                        <el-table-column  prop="score" label="段位" align="center" min-width="59">
                            <template slot-scope="scope">
                                <h4 class="line-limit-length">{{scope.row.score|convertLev}}</h4>
                            </template>
                        </el-table-column>
                        <el-table-column v-if="getContentShow"  prop="times" label="次数" align="center"  width="50">
                        </el-table-column>
                        
                        
                    </el-table>
                    <el-pagination v-show="pageInfo.pageTotal>pageInfo.pageSize" layout="total,prev, pager, next" :current-page="pageInfo.currentPage" :page-size="pageInfo.pageSize" :total="pageInfo.pageTotal" :page-sizes="[5, 10, 20, 50]" @size-change="handleSizeChange" @current-change="handleCurrentChange">
                    </el-pagination>
                </el-col>
            </el-row>
        </main>
        

        
      </div>
    </div>

  </div>
</template>
<style lang="scss">
._frontindex {
  .wrapper {
    // position: absolute;
    // top: 0;
    // bottom: 0;
    height:100vh;
    width: 100%;
    overflow: auto;
    .flexContainer {
      display: flex;
      flex-direction: column;
      min-height: 100vh;//页面可视区高度
      .head {
        background-color: #27ae60;
        flex: 0 0 60px;
        padding-top:10px;
        .nav{
            display: flex;
            justify-content:space-between;//两端对齐
            .left{
                display: flex;
                width:100px;
                height:50px;
                align-items: center;
                justify-content: center;
                color:white;
                // background-color: red;
                font-family:Microsoft YaHei;
                font-size: 22px;
                width:100px;
                height:50px;
                a{
                    color:white;
                    cursor: pointer;
                }
                a:hover{
                    text-shadow: 0 0 1px white;
                }
            }
            .rank{
                color:white;
            }
            .right{
                display: flex;
                width:100px;
                height:50px;
                align-items: center;
                justify-content: center;
                color:white;
                // background-color: red;
                font-family:Microsoft YaHei;
                font-size: 22px;
                width:100px;
                height:50px;
                a{
                    color:white;
                    cursor: pointer;
                }
                a:hover{
                    text-shadow: 0 0 1px white;
                }
                
                
            }
        }
        .search{
            // border:1px solid red;
            height:300px;
            // display: flex;
            // flex-direction: column;
            // align-items: center;
            h1{
                text-align: center;
                margin-top:20px;
                color:white;
                font-size:46px;
                text-shadow: -5px 5px 0 rgba(0,0,0,.1);
            }
            //超小屏幕（手机，小于 768px）
            @media (max-width: 768px) { 
                h1{
                    font-size:36px;
                }
            }
            //小屏幕（平板，大于等于 768px）
            @media (min-width: 768px) and (max-width: 992px) { 
                 h1{
                    font-size:38px;
                 }
             }
            
            //中等屏幕（桌面显示器，大于等于 992px）
            @media (min-width: 992px) and (max-width: 1200px) { 
                h1{
                    font-size:40px;
                 }
             }
            
            //大屏幕（大桌面显示器，大于等于 1200px）
            @media (min-width: 1200px) and (max-width: 1920px){ 
                h1{
                    font-size:44px;
                }
            }
            //1K+屏幕
            @media (min-width: 11920px) { 
                h1{
                    font-size:46px;
                }
            }

            p{
                text-align: center;
                margin-top:12px;
                color:#f4f4f4;
                font-size:21px;
                span{
                    font-size:14px;
                    line-height: 38px;
                }
            }
            .search-outer{
                display: flex;
                justify-content: center;
                margin-top:20px;
                .search-text{
                    width:700px;
                    .el-input__inner{
                        height:52px;
                        text-align: center;
                            border-radius: 0;
                    }
                }
            }
            
            
            input::-ms-input-placeholder{text-align: center;font-size:16px;color: #999;}
            input::-webkit-input-placeholder{text-align: center;font-size:16px;color:#999;}
        }
       
      }
      .main {
        // border: 1px solid red;
        flex: auto;
        .rowClass{
            cursor: pointer;
        }
      }
    }
  }
}
</style>
<script>
import apis from '../../apis/apis';
export default {
    data(){
        return{
            msg:'',
            searchText:'',
            listLoading : false,
            pageInfo: { //分页
                currentPage: 1,
                pageSize: 30,
                pageTotal: 30
            },
            tableData: [  //表单列表
                {   
                    ip:'',
                    times:0,
                    name:'',
                    wxname:'',
                    city:'',
                    score:0,
                    
                }
            ],
            formSearch: { //表单查询


            },
            myRank:0,
            allCount:0,
        }
    },
    mounted(){
        var loginLog = {
                    ip: returnCitySN["cip"],
                    city: returnCitySN["cname"],
                    type:'查询吸越榜'
                };
                apis.shiroApi.loginLog(loginLog);
        this.onSearch();
    },
    methods:{

        /**
         * 查询列表
         */
        onSearch(){
            this.listLoading=true;

            let param = Object.assign({}, this.formSearch,this.pageInfo);
            apis.shiroApi.queryRankList(param)
            .then((data)=>{
                // console.log(JSON.stringify(data) );
                this.listLoading=false;
                if (data && data.data) {
                    
                        var json = data.data;
                        if (json.status == 'SUCCESS') {
                            this.allCount=json.count;
                            this.pageInfo.pageTotal=30;
                            this.tableData=json.data;
                            try{
                                if(!this.scroll){
                                    this.$nextTick(() => {
                                        this.scroll = new BScroll(this.$refs.wrapper,  {click: true});
                                    })
                                }
                                else{
                                    this.scroll.refresh()
                                }
                               
                            }
                            catch(e){
                                console.log('初始化better-scroll失败');
                            }
                        }
                        else if (json.message) {
                            this.$message({message: json.message,type: "error"});
                        }
                }
            })
            .catch((err)=>{
                this.listLoading=false;
                this.$message({message: '查询异常，请重试',type: "error"});
            });
             apis.shiroApi.queryRank({ip:returnCitySN["cip"]})
            .then((data)=>{
                // console.log(JSON.stringify(data) );
                this.listLoading=false;
                if (data && data.data) {
                        var json = data.data;
                        if (json.status == 'SUCCESS') {
                            
                            this.myRank=json.data;
                        }
                        else if (json.message) {
                            this.$message({message: json.message,type: "error"});
                        }
                }
            })
            .catch((err)=>{
                this.listLoading=false;
                this.$message({message: '查询异常，请重试',type: "error"});
            });
        },
         /**
         * 分页大小切换
         */
        handleSizeChange(val) {
            this.pageInfo.pageSize = val;
            this.onSearch();
        },
        /**
         * 分页切换
         */
        handleCurrentChange(val) {
            this.pageInfo.currentPage = val;
            this.onSearch();
        },
        /**
         * 点击选择
         */
        handleSelectionChange(val) {
            this.multipleSelection = val;
            // this.$message({
            //     message: '选中的项是:' + JSON.stringify(this.multipleSelection),
            //     type: "success"
            // });
        },
        /**
         * 行样式
         */
        getRowClass(){
            return "rowClass";
        },
        openDetail(row, event, column){
            //this.$message({message: '选择id:'+row.id,type: "success"});
            // var param={
            //     docid:row.id
            // };
            // this.$common.OpenNewPage(this,'docinfo',param);
        },
        goBack(){
            // this.$router.go(-1)
            window.location.href='/ttcy';
        }
    },
    computed:{
        /**
         * 内容和日期是否显示
         */
        getContentShow(){
            return document.body.clientWidth>768;
        }
    },
    filters: {
        convertIp:(ip)=>{
            if(ip){
                var a=ip.split("."); 
                var b=ip.replace(a[a.length-1],"*");
                return b;
                // var index=ip.lastIndexOf('.');
                // ip=ip.substring(0,index);
                // index=ip.lastIndexOf('.');
                // ip=ip.substring(0,index);
                // return ip+'.*.*';
            }
            else{
                return "";
            }
            
        },
        convertLev:(myRank)=>{
            var lev=Vue.prototype.$common.getYcyLev(myRank);
            return lev;
        }
    },
}
</script>


