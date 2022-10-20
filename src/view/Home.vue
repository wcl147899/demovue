-- Active: 1664358051782@@127.0.0.1@3306@users
<template>
  <div style="padding: 10px" >
    <!--    功能区域-->
    <div style="margin: 10px 0px">
      <el-button type="primary" @click="add">新增</el-button>
      <el-button type="primary">导入</el-button>
      <el-button type="primary" @click=" handleDownload">导出</el-button>
      <el-button type="primary" @click="prev">返回</el-button>
      <el-button type="primary" @click="deleteFileOrDirectory(sels)" :disabled="this.sels.length === 0"> 批量删除</el-button>
      <el-button type="primary" @click="cancelSelection">取消选择</el-button>
    </div>
    <!--    搜索区域-->
    <div style="margin: 10px 0px">
      <el-input v-model="search" placeholder="请输入关键字" style="width:20%" clearable  @keyup.enter.native="load"></el-input>
      <el-button type="primary" style="margin-left: 5px" @click="load">查询</el-button>
    </div>
    <!-- 表格数据 -->
    <el-table :data="tableData" ref="sels" border style="width: 100%" @selection-change="selsChange"  :row-key="getRowKey">
      <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
      <el-table-column
          prop="id"
          label="ID" sortable="sortable" >
      </el-table-column>
      <el-table-column
          prop="name"
          label="用户名" >
      </el-table-column>
      <el-table-column
          prop="age"
          label="年龄">
      </el-table-column>
      <el-table-column fixed="right" label="操作" >
        <template #default="scope">
          <el-button @click="handleEdit(scope.row)" type="success">编辑</el-button>
          <el-popconfirm title="确定删除吗？" @confirm="handleDelete(scope.row.id)">
            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin: 10px 0">
      <el-pagination
          background="blue"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>

      <!-- 编辑信息 -->
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <el-form :model="form" label-width="120px">
           <el-form-item label="ID">
            <el-input v-model="form.id" readonly style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="form.name" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="form.age" style="width: 80%"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="save" >确 定</el-button>
          </span>
        </template>
      </el-dialog>

       <!-- 添加信息 -->
      <el-dialog title="提示" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="form" label-width="120px">
           <el-form-item label="ID">
            <el-input v-model="form.id" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="form.name" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="form.age" style="width: 80%"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit" >确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>

import request from '../util/request'
export default {
  name: 'Home',
  components: {

  },
  data(){
    return{
      form:{
        id:'',
        name:'',
        age:'',
      },
      dialogVisible:false,
      dialogFormVisible:false,
      search:'',
      currentPage:1,
      pageSize:5,
      total:0,
      tableData:[],
      sels: [],//选中的选项
    }
  },
  // 页面加载
  created(){
    this.load()
  },
  methods:{

    // 加载数据库数据进行渲染
    load(){
    request.get("/findPage",{
        params:{
          pageNum:this.currentPage,
          pageSize:this.pageSize,
          search:this.search
        }
      })
      .then(res =>{
        console.log(res)
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    // 新增用户
    add(){
      this.dialogFormVisible = true
      // 先清空表单域
      this.form = {}
    },
    // 保存用户传送给后台，使用常见的api:axios
    save(){
        request.put("/put",this.form).then(res => {
          console.log(res)
          if (res.code ==='0'){
            this.$message({
              type:"success",
              message:"更新成功！"
            })
          }else {
            this.$message({
              type:"error",
              message:res.msg
            })
          }
          this.load()  //刷新表格数据
          this.dialogVisible=false
        })
    },
    submit(){
      request.post("/save",this.form).then(res => {
          console.log(res)
          if (res.code ==='0'){
            this.$message({
              type:"success",
              message:"新增成功！"
            })
          }else {
            this.$message({
              type:"error",
              message:res.msg
            })
          }
          this.load()  //刷新表格数据
          this.dialogFormVisible=false
        })
    },
    handleEdit(row){
      // 设置弹窗内独立对象
      this.form =JSON.parse(JSON.stringify(row));
      this.dialogVisible=true;
    },
    // 删除用户
    handleDelete(id){
      console.log(id)
      console.log(Object.prototype.toString.call(id));
      request.delete("/delete/"+id).then(res =>{//注意delete请求的参数要用+号拼接到路径上，和后台代码是一致的
        if (res.code ==='0'){
          this.$message({
            type:"success",
            message:"删除成功！"
          })
        }else {
          this.$message({
            type:"error",
            message:res.msg
          })
        }
        this.load() //重新加载表格数据
      })
    },
    handleSizeChange(pageSize){  //改变当前每页的个数触发
      this.pageSize = pageSize
      this.load()
    },

    handleCurrentChange(pageNum){    //改变当前页码触发
      this.currentPage = pageNum
      this.load()
    },
    handleDownload () {
      var vm = this;
      require.ensure([], () => {
        const { export_json_to_excel } = require('vendor/Export2Excel');
        const tHeader = ['ID', '姓名', '年龄'];//Excel的表格第一行的标题
        const filterVal = ['id', 'name', 'age'];
        const table = vm.tableData;
        const data = vm.formatJson(filterVal, table);
        export_json_to_excel(tHeader, data, '人物信息excel');
      });
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    //返回上一个页面
    prev(){
      this.load();
    },
    selsChange(sels){
      this.sels = sels;
      //console.log(this.sels); sels是选中复选框里的多行数据
    },
    deleteFileOrDirectory() {
        var ids= this.sels.map(item => item.id).join();//获取所有选中行的id组成的字符串，以逗号分隔 
        console.log(ids);//4,3
        console.log(Object.prototype.toString.call(ids));
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          request.delete('/deletes/'+ids).then((res)=>{
            if(res.code==='0'){
              this.$message({
                type:'success',
                message:'删除成功'
              });
              this.$refs.sels.clearSelection();
            }else{
              this.$message({
                type:'error',
                message:"删除失败"
              })
            }
            this.load()  //刷新表格数据
          })      
        
          })
        },
        getRowKey(row) {
      return row.id
    },

    cancelSelection(){
      this.$refs.sels.clearSelection();//取消勾选
    }

  }
}
</script>
