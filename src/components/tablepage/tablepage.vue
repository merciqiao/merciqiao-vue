<template>
  <div>
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column prop="date" label="日期" width="180" sortable>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180" sortable>
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="total,sizes,prev, pager, next,jumper"  :current-page="pageInfo.pageIndex"  :page-size="pageInfo.pageSize" :total="pageInfo.pageTotal"  :page-sizes="[5, 10, 20, 50]" @size-change="handleSizeChange" @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageInfo: {
        pageIndex: 3,
        pageSize: 5,
        pageTotal: 80
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "李紫婷",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "杨超越",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "赖小七",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "张紫宁",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    handleEdit(index, rowData) {
      var msg = "索引是:" + index + ",行内容是:" + JSON.stringify(rowData);
      this.$message({
        message: msg,
        type: "success"
      });
    },
    handleDelete(index, rowData) {
      var msg = "索引是:" + index + ",行内容是:" + JSON.stringify(rowData);
      this.$message({
        message: msg,
        type: "warning"
      });
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize=val;
      this.$message({
        message: '第'+this.pageInfo.pageIndex+'页，'+'size:'+this.pageInfo.pageSize,
        type: "success"
      });
    },
    handleCurrentChange(val) {
      this.pageInfo.pageIndex=val;
      this.$message({
        message: '第'+this.pageInfo.pageIndex+'页，'+'size:'+this.pageInfo.pageSize,
        type: "success"
      });

    }
  }
};
</script>
