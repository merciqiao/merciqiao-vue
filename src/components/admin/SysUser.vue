<template>  
     <section> 
        <div class="table"> <!-- 页面表格begin -->
          <div class="crumbs"> <!-- 页面标题begin -->
              <el-breadcrumb separator="/">
                  <el-breadcrumb-item><i class="el-icon-tickets"></i>用户管理</el-breadcrumb-item>
              </el-breadcrumb>
          </div> <!-- 页面标题end--> 
          <div class="container"><!-- 页面内容区begin -->
             <div class="handle-box"> <!-- 搜索区begin -->
  <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">                  
                <el-form-item>
                   姓名： <el-input v-model="filters.userName"  placeholder="姓名" style="width:200px; heght:30px;" size="mini"></el-input>
                </el-form-item>  
                 <el-form-item>
                   编码：<el-input v-model="filters.userNo"   placeholder="编码" style="width:200px; heght:30px;" size="mini"></el-input>
                </el-form-item> 
                 <el-form-item>
                   岗位： <el-input v-model="filters.job"  placeholder="岗位" style="width:200px; heght:30px;" size="mini"></el-input>
                </el-form-item> 
                <br> 
                 <el-form-item>
                   登录名：<el-input v-model="filters.loginName"   placeholder="登录名" style="width:200px; heght:30px;" size="mini"></el-input>
                </el-form-item>  
                 <el-form-item>
                   手机：<el-input v-model="filters.mobile"   placeholder="手机" style="width:200px; heght:30px;" size="mini"></el-input>
                </el-form-item>  
                <el-form-item>
                   性别：<el-select v-model="filters.sex" placeholder="请选择" clearable size="mini">
                      <el-option  v-for="item in filters.sexOptions"   :key="item.value"  :label="item.label"  :value="item.value" ></el-option>
                 </el-select>
                </el-form-item>                             
                <el-form-item>
                   <el-button type="primary" icon="el-icon-search" @click="getResult(1)" size="mini">搜索</el-button>
                </el-form-item>
            </el-form>
        </el-col>
         </div> <!-- 搜索区end -->    
          <!--新增按钮-->
            <el-button type="success" icon="el-icon-circle-plus-outline" @click="handleAdd" size="mini" round>新增</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="handleDeleteList" size="mini" round>删除</el-button>
            <template>
        <!--表格数据及操作-->
        <el-table :data="tableData" size="mini"  highlight-current-row border   class="el-tb-edit mgt20" ref="multipleTable" tooltip-effect="dark" v-loading="listLoading" @selection-change="selectChange">
            <!--勾选框-->
            <el-table-column type="selection" width="55">
            </el-table-column>
            <!--索引-->
            <el-table-column type="index" :index="indexMethod">
            </el-table-column>
            <el-table-column prop="userName" label="姓名">
               <template slot-scope="scope">
              <el-button @click="handleSelect(scope.$index,scope.row)" type="text" size="small">{{scope.row.userName}}</el-button>      
              </template>
            </el-table-column>
            <el-table-column prop="id" label="编码" >
            </el-table-column>  
             <el-table-column prop="loginName" label="登录名" >
            </el-table-column>        
             <el-table-column prop="orgname" label="机构" >
            </el-table-column>  
             <el-table-column prop="positionname" label="岗位" >
            </el-table-column>           
             <el-table-column prop="mobile" label="手机" >
            </el-table-column>    
             <el-table-column prop="email" label="邮件" >
            </el-table-column> 
             <el-table-column prop="sex" label="性别" :formatter="formatSex" sortable>
            </el-table-column> 
             <!-- <el-table-column prop="birthday" label="出生日期" >
            </el-table-column>   -->
             <el-table-column prop="nationality" label="民族"  :formatter="formatNationality" sortable>
            </el-table-column>    
             <el-table-column prop="education" label="学历"  :formatter="formatEducation" sortable>
            </el-table-column>    
             <el-table-column prop="job" label="职务"  :formatter="formatJob" sortable>
            </el-table-column> 
             <el-table-column prop="validateState" label="是否有效" :formatter="formatState" sortable>
            </el-table-column>    
             <!-- <el-table-column prop="isLocked" label="是否锁定" :formatter="formatLocked" sortable>
            </el-table-column>     -->            
              <el-table-column  fixed="right" label="操作" width="150">
               <template slot-scope="scope">				         
                    			   	<el-button type="primary" plain size="small" @click="handleRole(scope.$index,scope.row)">角色</el-button>  
                      	<el-button size="small" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>	                          
			        	</template>
            </el-table-column>     
        </el-table>
        </template>
        <br>
        <br>
        <!-- 分页 -->
        <el-pagination @current-change="getResult"  :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="count" >
        </el-pagination>
        </div><!-- 页面内容区end-->            
        </div><!-- 页面表格end -->
     <!--新增界面-->
		<el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">         
			<el-form :inline="true" :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="姓名" prop="userName">
					<el-input v-model="addForm.userName" auto-complete="off"></el-input>
				</el-form-item>
        &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <el-form-item label="登录名" prop="loginName">	
					<el-input v-model="addForm.loginName" auto-complete="off"></el-input>
				</el-form-item>
        	<el-form-item label="登录密码" prop="password">
					<el-input v-model="addForm.password" auto-complete="off"></el-input>
				</el-form-item>
         &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <el-form-item label="主机构" prop="orgname">	
					<!-- <el-input v-model="addForm.orgid" auto-complete="off"></el-input> -->
          <el-button @click="orgSelect" type="text" size="medium">{{addForm.orgname}}</el-button>  
				</el-form-item>
        <el-form-item label="任职岗位" prop="positionname">	
					<!-- <el-input v-model="addForm.positionid" auto-complete="off"></el-input> -->
          <el-button @click="positionSelect" type="text" size="small">{{addForm.positionname}}</el-button>  
				</el-form-item>
         &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <el-form-item label="手机" prop="mobile">	
					<el-input v-model="addForm.mobile" auto-complete="off"></el-input>
				</el-form-item>
        <el-form-item label="邮件" prop="email">	
					<el-input v-model="addForm.email" auto-complete="off"></el-input>
				</el-form-item>
         &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
         <el-form-item label="性别" prop="sex">						
          <el-select v-model="addForm.sex" placeholder="请选择" clearable>
              <el-option  v-for="item in sexOptions"   :key="item.value"  :label="item.label"  :value="item.value" ></el-option>
           </el-select>
				</el-form-item>
         <el-form-item label="出生日期" prop="birthday">
          <el-date-picker  v-model="addForm.birthday" type="date"  placeholder="选择日期" value-format="yyyy-MM-dd"> </el-date-picker>
				</el-form-item>
         &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
          <el-form-item label="民族" prop="nationality">
            <el-select v-model="addForm.nationality" placeholder="请选择" clearable>
              <el-option  v-for="item in nationalityOptions"   :key="item.value"  :label="item.label"  :value="item.value" ></el-option>
           </el-select>
				</el-form-item>
          <el-form-item label="学历" prop="education">
            <el-select v-model="addForm.education" placeholder="请选择" clearable>
              <el-option  v-for="item in educationOptions"   :key="item.value"  :label="item.label"  :value="item.value" ></el-option>
           </el-select>
				</el-form-item>
         &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
         <el-form-item label="职务" prop="job">	
           <el-select v-model="addForm.job" placeholder="请选择" clearable>
              <el-option  v-for="item in jobOptions"   :key="item.value"  :label="item.label"  :value="item.value" ></el-option>
           </el-select>
				</el-form-item>
         <el-form-item label="家庭住址" prop="homeAddress">	
					<el-input v-model="addForm.homeAddress" auto-complete="off"></el-input>
				</el-form-item>
         &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
         <el-form-item label="家庭邮编" prop="homeZipcode">	
					<el-input v-model="addForm.homeZipcode" auto-complete="off"></el-input>
				</el-form-item>
         <el-form-item label="家庭电话" prop="homeTel">	
					<el-input v-model="addForm.homeTel" auto-complete="off"></el-input>
				</el-form-item>
         &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <el-form-item label="办公电话" prop="officeTel">	
					<el-input v-model="addForm.officeTel" auto-complete="off"></el-input>
				</el-form-item>
        <el-form-item label="办公地址" prop="officeAddress">	
					<el-input v-model="addForm.officeAddress" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
        <!--详细界面-->
		<el-dialog title="详细信息" :visible.sync="selectFormVisible" :close-on-click-modal="false">         
			<el-form :inline="true" :model="selectForm" label-width="80px"  ref="selectForm">
				<el-form-item label="姓名" prop="userName">
					<el-input v-model="selectForm.userName" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
        &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <el-form-item label="登录名" prop="loginName">	
					<el-input v-model="selectForm.loginName" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
        	<el-form-item label="登录密码" prop="password">
					<el-input v-model="selectForm.password" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
         &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <el-form-item label="主机构" prop="orgname">	
					<el-input v-model="selectForm.orgname" auto-complete="off" :disabled="true"></el-input>
         
				</el-form-item>
        <el-form-item label="任职岗位" prop="positionname">	
					<el-input v-model="selectForm.positionname" auto-complete="off" :disabled="true"></el-input>
        
				</el-form-item>
         &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <el-form-item label="手机" prop="mobile">	
					<el-input v-model="selectForm.mobile" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
        <el-form-item label="邮件" prop="email">	
					<el-input v-model="selectForm.email" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
         &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
         <el-form-item label="性别" prop="sex">						
          <el-select v-model="selectForm.sex" placeholder="请选择" clearable disabled >
              <el-option  v-for="item in sexOptions"   :key="item.value"  :label="item.label"  :value="item.value" ></el-option>
           </el-select>
				</el-form-item>
         <el-form-item label="出生日期" prop="birthday">
          <el-date-picker  v-model="selectForm.birthday" type="date"  placeholder="选择日期" value-format="yyyy-MM-dd" disabled> </el-date-picker>
				</el-form-item>
         &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
          <el-form-item label="民族" prop="nationality">
            <el-select v-model="selectForm.nationality" placeholder="请选择" clearable disabled>
              <el-option  v-for="item in nationalityOptions"   :key="item.value"  :label="item.label"  :value="item.value" ></el-option>
           </el-select>
				</el-form-item>
          <el-form-item label="学历" prop="education">
            <el-select v-model="selectForm.education" placeholder="请选择" clearable disabled>
              <el-option  v-for="item in educationOptions"   :key="item.value"  :label="item.label"  :value="item.value" ></el-option>
           </el-select>
				</el-form-item>
         &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
         <el-form-item label="职务" prop="job">	
           <el-select v-model="selectForm.job" placeholder="请选择" clearable disabled>
              <el-option  v-for="item in jobOptions"   :key="item.value"  :label="item.label"  :value="item.value" ></el-option>
           </el-select>
				</el-form-item>
         <el-form-item label="家庭住址" prop="homeAddress">	
					<el-input v-model="selectForm.homeAddress" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
         &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
         <el-form-item label="家庭邮编" prop="homeZipcode">	
					<el-input v-model="selectForm.homeZipcode" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
         <el-form-item label="家庭电话" prop="homeTel">	
					<el-input v-model="selectForm.homeTel" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
         &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <el-form-item label="办公电话" prop="officeTel">	
					<el-input v-model="selectForm.officeTel" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
        <el-form-item label="办公地址" prop="officeAddress">	
					<el-input v-model="selectForm.officeAddress" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="selectFormVisible = false">取消</el-button>			
			</div>
		</el-dialog>
     <!--编辑界面-->
		<el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">         
			<el-form :inline="true" :model="editForm" label-width="80px" :rules="addFormRules" ref="editForm">
				<el-form-item label="姓名" prop="userName">
					<el-input v-model="editForm.userName" auto-complete="off"></el-input>
				</el-form-item>
          &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;      
        <el-form-item label="登录名" prop="loginName">	
					<el-input v-model="editForm.loginName" auto-complete="off"></el-input>
				</el-form-item> 
      
        	<el-form-item label="登录密码" prop="password">
					<el-input v-model="editForm.password" auto-complete="off"></el-input> 
				</el-form-item>
        <el-form-item label="" prop="">	
				<el-checkbox v-model="checked">是否修改密码</el-checkbox>
				</el-form-item>
        <el-form-item label="主机构" prop="orgName">
            <el-button @click="orgSelect" type="text" size="small">{{editForm.orgname}}</el-button>  
				</el-form-item>
        <el-form-item label="任职岗位" prop="positionname">	
					<!-- <el-input v-model="editForm.positionid" auto-complete="off"></el-input> -->
            <el-button @click="positionSelect" type="text" size="small">{{editForm.positionname}}</el-button>  
				</el-form-item>
      
        <el-form-item label="手机" prop="mobile">	
					<el-input v-model="editForm.mobile" auto-complete="off"></el-input>
				</el-form-item>
          &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <el-form-item label="邮件" prop="email">	
					<el-input v-model="editForm.email" auto-complete="off"></el-input>
				</el-form-item>
        
         <el-form-item label="性别" prop="sex">						
          <el-select v-model="editForm.sex" placeholder="请选择" clearable>
              <el-option  v-for="item in sexOptions"   :key="item.value"  :label="item.label"  :value="item.value" ></el-option>
           </el-select>
				</el-form-item>
          &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker  v-model="editForm.birthday" type="date"  placeholder="选择日期" value-format="yyyy-MM-dd"> </el-date-picker>
				</el-form-item>
 
          <el-form-item label="民族" prop="nationality">
            <el-select v-model="editForm.nationality" placeholder="请选择" clearable>
              <el-option  v-for="item in nationalityOptions"   :key="item.value"  :label="item.label"  :value="item.value" ></el-option>
           </el-select>
				</el-form-item>
             &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
          <el-form-item label="学历" prop="education">
            <el-select v-model="editForm.education" placeholder="请选择" clearable>
              <el-option  v-for="item in educationOptions"   :key="item.value"  :label="item.label"  :value="item.value" ></el-option>
           </el-select>
				</el-form-item>
    
         <el-form-item label="职务" prop="job">	
           <el-select v-model="editForm.job" placeholder="请选择" clearable>
              <el-option  v-for="item in jobOptions"   :key="item.value"  :label="item.label"  :value="item.value" ></el-option>
           </el-select>
				</el-form-item>
         &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
         <el-form-item label="家庭住址" prop="homeAddress">	
					<el-input v-model="editForm.homeAddress" auto-complete="off"></el-input>
				</el-form-item>
     
         <el-form-item label="家庭邮编" prop="homeZipcode">	
					<el-input v-model="editForm.homeZipcode" auto-complete="off"></el-input>
				</el-form-item>
          &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
         <el-form-item label="家庭电话" prop="homeTel">	
					<el-input v-model="editForm.homeTel" auto-complete="off"></el-input>
				</el-form-item>
     
        <el-form-item label="办公电话" prop="officeTel">	
					<el-input v-model="editForm.officeTel" auto-complete="off"></el-input>
				</el-form-item>
          &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <el-form-item label="办公地址" prop="officeAddress">	
					<el-input v-model="editForm.officeAddress" auto-complete="off"></el-input>
				</el-form-item>
 
        <el-form-item label="证件号码" prop="cardNo">	
					<el-input v-model="editForm.cardNo" auto-complete="off"></el-input>
				</el-form-item>
          &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <el-form-item label="政治面貌" prop="officeTel">					
          <el-select v-model="editForm.politicalStatus" placeholder="请选择" clearable>
              <el-option  v-for="item in politicalStatusOptions"   :key="item.value"  :label="item.label"  :value="item.value" ></el-option>
           </el-select>
				</el-form-item>
       
        <el-form-item label="员工关系" prop="userRelation">						
          <el-select v-model="editForm.userRelation" placeholder="请选择" clearable>
              <el-option  v-for="item in userRelationOptions"   :key="item.value"  :label="item.label"  :value="item.value" ></el-option>
           </el-select>
				</el-form-item>
          &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
        <el-form-item label="试用期" prop="probationPeriod">	
					<el-input v-model="editForm.probationPeriod" auto-complete="off"></el-input>
				</el-form-item>
      
        <el-form-item label="入职日期" prop="entryDate">				
            <el-date-picker  v-model="editForm.entryDate" type="date"  placeholder="选择日期" value-format="timestamp"> </el-date-picker>
				</el-form-item>
          &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
        <el-form-item label="离职日期" prop="quitDate">					
            <el-date-picker  v-model="editForm.quitDate" type="date"  placeholder="选择日期" value-format="timestamp"> </el-date-picker>
				</el-form-item>
        
        <el-form-item label="参加工作日期" prop="workDate" label-width="100px">					
           <el-date-picker  v-model="editForm.workDate" type="date"  placeholder="选择日期" value-format="timestamp"> </el-date-picker>
				</el-form-item>     
          &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;  
        <el-form-item label="标准年假" prop="annualLeave">	
					<el-input v-model="editForm.annualLeave" auto-complete="off"></el-input>
				</el-form-item>       
        <el-form-item label="年假起始日期" prop="njqsrq" label-width="100px">					
            <el-date-picker  v-model="editForm.njqsrq" type="date"  placeholder="选择日期" value-format="timestamp"> </el-date-picker>
				</el-form-item>
        <el-form-item label="" prop="">					
				</el-form-item>
        <el-form-item label="操作提示" prop="">
         <span style="color:#F00"> 修改登入密码请选中“修改密码”并点击保存；如果不需要修改密码请直接点击保存，密码将不会同步更新					
         </span>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
     <!--组织结构界面-->
		<el-dialog title="主机构" :visible.sync="orgFormVisible" :close-on-click-modal="false">         
			<el-form :inline="true" label-width="500px"   v-loading="treeLoading">
				<el-form-item >           
                <el-tree   :data="treeData" :props="defaultProps"   node-key="id"    :expand-on-click-node="false"  >   
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span>{{node.label}}                           
                           <i class="el-icon-plus" @click="() => append(node)">选择</i>                          
                           </span>   
                        </span>
                </el-tree>  
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="orgFormVisible = false">取消</el-button>				
			</div>
		</el-dialog>
    <!--岗位界面-->
		<el-dialog title="岗位列表" :visible.sync="positionFormVisible" :close-on-click-modal="false">         
			<el-form :inline="true" label-width="500px"   v-loading="positionListLoading">
				<el-form-item >          
            <!--工具条-->
              <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                  <el-form :inline="true" :model="filters">                  
                      <el-form-item>
                        岗位名称 <el-input v-model="filters.positionName"  placeholder="岗位名称" style="width:200px; heght:30px;"></el-input>
                      </el-form-item>  
                      <el-form-item>
                        岗位编码：<el-input v-model="filters.positionCode"   placeholder="岗位编码：" style="width:200px; heght:30px;"></el-input>
                      </el-form-item>                                        
                      <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="getPositionResult(1)" size="mini">搜索</el-button>
                      </el-form-item>
                  </el-form>
              </el-col>       
                <!--表格数据及操作-->
              <el-table :data="positionTableData" size="mini"  highlight-current-row border   class="el-tb-edit" ref="multipleTable" tooltip-effect="dark" v-loading="positionListLoading">                
                  <!--索引-->
                  <el-table-column type="index" :index="indexMethod">
                  </el-table-column>
                  <el-table-column prop="positionName" label="岗位名称">                  
                  </el-table-column>
                  <el-table-column prop="positionCode" label="岗位编码" >
                  </el-table-column>  
                  <el-table-column prop="orderBy" label="排序" >
                  </el-table-column>
                    <el-table-column prop="" label="操作" width="150">
                    <template slot-scope="scope">
                              <el-button size="small" @click="handleChoice(scope.$index,scope.row)">选中</el-button>	                          
                      </template>
                  </el-table-column>     
              </el-table>
              <br>
              <br>
              <!-- 分页 -->
              <el-pagination @current-change="getPositionResult"  :current-page="positionCurrentPage" :page-size="positionPageSize" layout="total, prev, pager, next" :total="positionCount" >
              </el-pagination>

				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="positionFormVisible = false">取消</el-button>				
			</div>
		</el-dialog>
       <!-- 查看角色 -->
              <el-dialog title="查看角色" :visible.sync="roleFormVisible" :close-on-click-modal="false">         
                <el-form :model="infoForm" label-width="80px"  ref="infoForm" :inline="true">
                  <el-form-item label="姓名" prop="positionName">
                    <el-input v-model="infoForm.userName" auto-complete="off" :disabled="true"></el-input>
                  </el-form-item>           
                <el-form-item label="编码" prop="positionCode">
                    <el-input v-model="infoForm.id" auto-complete="off" :disabled="true"></el-input>
                  </el-form-item>                  
                </el-form>
                <el-form  label-width="80px" :inline="true"> 
                  <div v-for="item in roleData" :key="item.id">
                  <el-form-item label="角色名称" prop="">
                    <el-input v-model="item.roleName" auto-complete="off" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="角色编码" prop="">
                    <el-input v-model="item.roleCode" auto-complete="off" :disabled="true"></el-input>
                  </el-form-item>      
                </div>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="roleFormVisible = false">取消</el-button>               
                </div>
              </el-dialog>
  </section>      
 </template>
 <script>
export default {
  name: 'SysUser',
  data() {
    return {
      //搜索区域参数
      filters: {
        userName: "",
        userNo: "",
        job: "",
        loginName: "",
        mobile: "",
        sex: "",
        //性别下拉框
        sexOptions: [
          {
            value: "1",
            label: "男"
          },
          {
            value: "0",
            label: "女"
          }
        ],
        //岗位列表搜索参数
        positionName: "",
        positionCode: "",
      },
      //table返回的数据
      tableData: [],
      //列表Loading加载
      listLoading: false,
      //批量选中data
      selectList: [],
      //分页
      count: 0,
      currentPage: 1,
      pageSize: 10,
      //角色信息
      roleData:[],
      //新增界面是否显示
      addFormVisible: false,
      //添加按钮Loading加载
      addLoading: false,
      //输入框验证
      addFormRules: {
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        loginName: [
          { required: true, message: "请输入登录名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" }
        ],
        orgid: [{ required: true, message: "请选择主机构", trigger: "blur" }],
        positionid: [{ required: true, message: "请选择岗位", trigger: "blur" }]
      },
      //新增界面数据
      addForm: {
        id: "0",
        userName: "",
        loginName: "",
        password: "",
        orgid: "",
        orgname: "选择主机构",
        positionid: "",
        positionname: "选择岗位",
        mobile: "",
        email: "",
        sex: "",
        birthday: "",
        nationality: "",
        education: "",
        job: "",
        homeAddress: "",
        homeZipcode: "",
        homeTel: "",
        officeTel: "",
        officeAddress: ""
      },
       //查看详细
      selectForm: {        
        userName: "",
        loginName: "",
        password: "",        
        orgname: "",      
        positionname: "",
        mobile: "",
        email: "",
        sex: "",
        birthday: "",
        nationality: "",
        education: "",
        job: "",
        homeAddress: "",
        homeZipcode: "",
        homeTel: "",
        officeTel: "",
        officeAddress: ""
      },
      //详细界面是否显示
      selectFormVisible:false,
      //性别下拉框
      sexOptions: [
        {
          value: "1",
          label: "男"
        },
        {
          value: "0",
          label: "女"
        }
      ],
      //民族下拉框
      nationalityOptions: [
        {
          value: "1",
          label: "汉族"
        },
        {
          value: "2",
          label: "回族"
        },
        {
          value: "3",
          label: "满族"
        },
        {
          value: "4",
          label: "蒙古族"
        },
        {
          value: "5",
          label: "苗族"
        },
        {
          value: "6",
          label: "壮族"
        },
        {
          value: "7",
          label: "维吾尔族"
        },
        {
          value: "8",
          label: "朝鲜族"
        },
        {
          value: "9",
          label: "藏族"
        },
        {
          value: "10",
          label: "其他少数民族"
        }
      ],
      //学历下拉框
      educationOptions: [
        {
          value: "01",
          label: "初中以下"
        },
        {
          value: "02",
          label: "高中"
        },
        {
          value: "03",
          label: "中专"
        },
        {
          value: "04",
          label: "大学专科"
        },
        {
          value: "05",
          label: "大学本科"
        },
        {
          value: "06",
          label: "硕士"
        },
        {
          value: "07",
          label: "博士"
        },
        {
          value: "08",
          label: "博士后"
        }
      ],
      //职务下拉框
      jobOptions: [
        {
          value: "1",
          label: "高层管理人员"
        },
        {
          value: "2",
          label: "次高层管理人员"
        },
        {
          value: "3",
          label: "中层管理人员"
        },
        {
          value: "4",
          label: "初级管理人员"
        },
        {
          value: "5",
          label: "普通员工"
        }
      ],
      //编辑界面是否显示
      editFormVisible: false,
      //是否修改密码复选框
      checked: false,
      //编辑按钮Loading加载
      editLoading: false,
      //编辑界面数据
      editForm: {
        id: "",
        userName: "",
        loginName: "",
        password: "",
        orgid: "",
        orgname: "选择主机构",
        positionid: "",
        positionname: "选择岗位",
        mobile: "",
        email: "",
        sex: "",
        birthday: "",
        nationality: "",
        education: "",
        job: "",
        homeAddress: "",
        homeZipcode: "",
        homeTel: "",
        officeTel: "",
        officeAddress: "",
        cardNo: "",
        politicalStatus: "",
        userRelation: "",
        probationPeriod: "",
        entryDate: "",
        quitDate: "",
        workDate: "",
        annualLeave: "",
        njqsrq: "",
        isLocked: ""
      },
      //政治面貌下拉框
      politicalStatusOptions: [
        {
          value: "00",
          label: "群众"
        },
        {
          value: "01",
          label: "中共党员"
        },
        {
          value: "02",
          label: "预备党员"
        },
        {
          value: "03",
          label: "共青团员"
        },
        {
          value: "12",
          label: "民主党派"
        }
      ],
      //员工关系下拉框
      userRelationOptions: [
        {
          value: "001",
          label: "正式员工"
        },
        {
          value: "002",
          label: "试用员工"
        },
        {
          value: "003",
          label: "停薪留职"
        },
        {
          value: "007",
          label: "长期病假"
        },
        {
          value: "012",
          label: "离休"
        },
        {
          value: "013",
          label: "返聘"
        },
        {
          value: "030",
          label: "失踪"
        },
        {
          value: "035",
          label: "待分配"
        },
        {
          value: "S001",
          label: "长学"
        },
        {
          value: "S002",
          label: "实习"
        },
        {
          value: "S003",
          label: "实习终止"
        },
        {
          value: "S004",
          label: "劳务派遣"
        },
        {
          value: "S005",
          label: "派遣终止"
        },
        {
          value: "S006",
          label: "临时工"
        },
        {
          value: "S007",
          label: "临时工终止"
        },
        {
          value: "S008",
          label: "返聘终止"
        },
        {
          value: "S009",
          label: "离职"
        }
      ],
      //组织结构界面是否显示
      orgFormVisible: false,
      //结构树Loading
      treeLoading: false,
      //组织结构数据
      treeData: [],
      //属性名称转换
      defaultProps: {
        children: "children",
        label: "name"
      },      
      //岗位table返回的数据
      positionTableData: [],
      //岗位列表Loading加载
      positionListLoading: false,
      //是否显示岗位列表
      positionFormVisible:false,
      //岗位table分页
      positionCount: 0,
      positionCurrentPage: 1,
      positionPageSize: 10,
      //用户信息
      infoForm:[],
      //角色Loading加载
      roleListLoading:false,
      //角色信息
      roleData:[],
      //是否显示角色信息
      roleFormVisible:false,
    };
  },
  methods: {
    getResult: function(val) {
      var _this = this;
      this.listLoading = true;
      let param = Object.assign(
        {},
        {
          currentPage: val,
          pageSize: 10,
          userName: this.filters.userName,
          userNo: this.filters.userNo,
          job: this.filters.job,
          loginName: this.filters.loginName,
          mobile: this.filters.mobile,
          sex: this.filters.sex
        }
      );
      this.$ajax({
        method: "post",
        url: "/api/sysuser-api/querySysUserList",
        data: param
      }).then(function(resultData) {
        _this.tableData = resultData.data.data;
        _this.count = resultData.data.count;
        _this.listLoading = false;
      });
    },
    //性别显示转换
    formatSex: function(row, column) {
      return row.sex == 1 ? "男" : row.sex == 0 ? "女" : "未知";
    },
    //民族显示转换
    formatNationality: function(row, column) {
      return row.nationality == 1
        ? "汉族"
        : row.nationality == 2
          ? "回族"
          : row.nationality == 3
            ? "满族"
            : row.nationality == 4
              ? "蒙古族"
              : row.nationality == 5
                ? "苗族"
                : row.nationality == 6
                  ? "壮族"
                  : row.nationality == 7
                    ? "维吾尔族"
                    : row.nationality == 8
                      ? "朝鲜族"
                      : row.nationality == 9
                        ? "藏族"
                        : row.nationality == 10 ? "其他少数民族" : "未知";
    },
    //学历显示转换
    formatEducation: function(row, column) {
      return row.education == "01"
        ? "初中以下"
        : row.education == "02"
          ? "高中"
          : row.education == "03"
            ? "中专"
            : row.education == "04"
              ? "大学专科"
              : row.education == "05"
                ? "大学本科"
                : row.education == "06"
                  ? "硕士"
                  : row.education == "07"
                    ? "博士"
                    : row.education == "08" ? "博士后" : "未知";
    },
    //职务显示转换
    formatJob: function(row, column) {
      return row.job == 1
        ? "高层管理人员"
        : row.job == 2
          ? "次高层管理人员"
          : row.job == 3
            ? "中层管理人员"
            : row.job == 4
              ? "初级管理人员"
              : row.job == 5 ? "普通员工" : "未知";
    },
    //是否有效显示转换
    formatState: function(row, column) {
      return row.validateState == 1
        ? "有效"
        : row.validateState == 0 ? "无效" : "";
    },
    //是否锁定显示转换
    formatLocked: function(row, column) {
      return row.isLocked == 1 ? "锁定" : row.isLocked == 0 ? "未锁定" : "";
    },
    //查看角色
    handleRole: function(index, row) {
      //显示角色信息页面
      this.roleFormVisible=true;

      var _this = this;
      _this.infoForm=Object.assign({}, row);
      this.roleListLoading = true;
      let param = Object.assign({},{targetId: row.id});
      this.$ajax({
        method: "post",
        url: "/api/sysrole-api/queryRoleUserList",
        data: param
      }).then(function(resultData) {
        _this.roleData = resultData.data.data;       
        _this.roleListLoading = false;
        console.log(_this.roleData);
      });


    },
    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;
    },
    //新增
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          //主机构必填提示
          if (this.addForm.orgid == "") {
            this.$message({
              message: "请选择主机构",
              type: "error"
            });
            return;
          }
          //岗位必填提示
          if (this.addForm.positionid == "") {
            this.$message({
              message: "请选择岗位",
              type: "error"
            });
            return;
          }
          //如果性别未选择给默认值
          if (this.addForm.sex == "") {
            this.addForm.sex = "-1";
          }
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            let param = Object.assign({}, this.addForm);
            console.log(param);
            this.$ajax({
              method: "post",
              url: "/api/sysuser-api/addUser",
              data: param
            }).then(res => {
              this.addLoading = false;
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["addForm"].resetFields();
              this.addFormVisible = false;
              this.getResult(1);
            });
          });
        }
      });
    },
    //显示组织结构
    orgSelect: function() {
      //加载组织结构树
      this.getTreeResult();

      //显示组织结构界面
      this.orgFormVisible = true;
    },
    //获取组织结构信息
    getTreeResult: function() {
      var _this = this;
      this.treeLoading = true;
      let param = Object.assign({}, {});
      this.$ajax({
        method: "post",
        url: "/api/sysorg-api/querySysOrgList",
        data: param
      }).then(
        function(resultData) {
          _this.treeData = resultData.data.data;
          _this.treeLoading = false;
        },
        function(resultData) {
          _this.treeData.message = "Local Reeuest Error!";
        }
      );
    },
    //组织结构节点赋值
    append(node, param) {
      //新增信息赋值
      this.addForm.orgname = node.data.name;
      this.addForm.orgid = node.data.id;
      //编辑信息赋值
      this.editForm.orgname = node.data.name;
      this.editForm.orgid = node.data.id;
      this.orgFormVisible = false;
    },
    //批量删除
    handleDeleteList: function() {
      const length = this.selectList.length;
      let id = "";
      for (let i = 0; i < length; i++) {
        id += this.selectList[i].id + ",";
      }
      //去掉结尾,
      id = id.substring(0, id.length - 1);
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          let param = new URLSearchParams();
          param.append("ids", id);
          console.log("ids:" + param);
          this.$ajax({
            method: "post",
            url: "/api/sysuser-api/delSysUserByUserId",
            data: param
          }).then(res => {
            this.listLoading = false;
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.selectList = [];
            this.getResult(1);
          });
        })
        .catch(() => {});
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
      if(row.positionname==null)
      {
         this.editForm.positionname="选择岗位";
      }
    }, //编辑
    editSubmit: function() {
      if (this.checked == true) {
        this.editForm.isLocked = "1";
      }
      if (this.checked == false) {
        this.editForm.isLocked = "0";
      }
      //主机构必填提示
      if (this.editForm.orgid == "") {
        this.$message({
          message: "请选择主机构",
          type: "error"
        });
        return;
      }
       //岗位必填提示
          if (this.editForm.positionid == "") {
            this.$message({
              message: "请选择岗位",
              type: "error"
            });
            return;
          }
      //如果性别未选择给默认值
      if (this.editForm.sex == "") {
        this.editForm.sex = "-1";
      }
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            let param = Object.assign({}, this.editForm);
            console.log(param);
            this.$ajax({
              method: "post",
              url: "/api/sysuser-api/addUser",
              data: param
            }).then(res => {
              this.editLoading = false;
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["editForm"].resetFields();
              this.editFormVisible = false;
              this.getResult(1);
            });
          });
        }
      });
    },
    //查看详细信息
    handleSelect: function(index, row) {

      this.selectFormVisible = true;
      this.selectForm = Object.assign({}, row);
    },
    //批量选中
    selectChange: function(val) {
      this.selectList = val;
    },
    //table序号
    indexMethod(index) {
      return index + 1;
    },
    //显示岗位列表
    positionSelect: function() {
      //加载岗位列表
      this.getPositionResult(1);

      //显示岗位构界面
      this.positionFormVisible = true;
    },
    //获取岗位列表
     getPositionResult: function(val) {
      var _this = this;
      this.positionListLoading = true;
      let param = Object.assign(
        {},
        {
          currentPage: val,
          pageSize: 10,
          positionName: this.filters.positionName,
          positionCode: this.filters.positionCode
        }
      );
      this.$ajax({
        method: "post",
        url: "/api/api/sysPosition/Web/getSysPositionList",
        data: param
      }).then(function(resultData) {
        _this.positionTableData = resultData.data.data;
        _this.positionCount = resultData.data.count;
        _this.positionListLoading = false;
      });
    },
    //选中岗位
    handleChoice:function(index, row) {    
      //新增信息赋值
      this.addForm.positionid =row.id;
      this.addForm.positionname = row.positionName;
      //编辑信息赋值
      this.editForm.positionid =row.id;
      this.editForm.positionname =row.positionName;
      console.log(row.positionname);

      this.positionFormVisible=false;
    }

  },
  mounted() {
    //初始加载
    this.getResult(1);
  }
};
</script>
        
        