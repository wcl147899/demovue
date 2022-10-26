-- Active: 1664358051782@@127.0.0.1@3306@users
<template>
  <div class="content-box" >
    <!--    功能区域-->
    <!-- <div style="margin: 10px 0px">
      
      <el-button type="primary">导入</el-button>
      <el-button type="primary" @click=" handleDownload">导出</el-button>
      <el-button type="primary" @click="prev">返回</el-button>
      <el-button type="primary" @click="deleteFileOrDirectory(sels)" :disabled="this.sels.length === 0"> 批量删除</el-button>
      <el-button type="primary" @click="cancelSelection">取消选择</el-button>
    </div> -->
    <!--    搜索区域-->
    <div style="margin: 10px 0px">
      <el-input v-model="search" placeholder="请输入关键字" style="width:20%" clearable  @keyup.enter.native="load"></el-input>
      <el-button type="primary" style="margin-left: 5px" @click="load">查询</el-button>
      <el-button type="primary" @click="add">新增</el-button>
    </div>
    <!-- 表格数据 -->
    <el-table :data="tableData" ref="sels" border style="width: 100%" @selection-change="selsChange"  :row-key="getRowKey">
      <!-- <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column> -->
      <el-table-column label="序号"><template slot-scope="scope">{{scope.$index+1 }}</template></el-table-column>
      <el-table-column
          prop="id"
          label="科室编号" sortable="sortable">
      </el-table-column>
      <el-table-column
          prop="name"
          label="科室名称" >
      </el-table-column>
      <el-table-column
          prop="englishName"
          label="英文名">
      </el-table-column>
      <el-table-column
          prop="status"
          label="状态">
      </el-table-column>
       <el-table-column
          prop="belongHospitalName"
          label="所属医院">
      </el-table-column>
     <el-table-column
          prop="belongCamplusName"
          label="所属院区">
      </el-table-column>
      <el-table-column fixed="right" label="操作" >
        <template #default="scope">
          <el-button @click="handleEdit(scope.row)" type="success">编辑</el-button>
          <el-popconfirm title="删除后不可恢复，是否确定删除？" @confirm="handleDelete(scope.row.id)">
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
           <el-form-item label="科室编号">
            <el-input v-model="form.id" readonly style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="科室名称">
            <el-input v-model="form.name" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="英文名">
            <el-input v-model="form.englishName" style="width: 80%"></el-input>
          </el-form-item>
           <el-form-item label="状态">
            <el-input v-model="form.status" style="width: 80%"></el-input>
          </el-form-item>

          <el-form-item label="所属医院">
            <el-select clearable filterable class="filter-item" style="width: 80%" placeholder="请选择所属医院" v-model="form.belongHospitalName">
              <el-option v-for="item in typeOptions1" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="所属院区">
            <el-select clearable filterable class="filter-item" style="width: 80%" placeholder="请选择所属院区" v-model="form.belongCamplusName">
              <el-option v-for="item in typeOptions2" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key"></el-option>
            </el-select>
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
           <el-form-item label="科室编号">
            <el-input v-model="form.id" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="科室名称">
            <el-input v-model="form.name" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="英文名">
            <el-input v-model="form.englishName" style="width: 80%"></el-input>
          </el-form-item>
           <el-form-item label="状态">
            <el-input v-model="form.status" style="width: 80%"></el-input>
          </el-form-item>

           <el-form-item label="所属医院">
            <el-select clearable filterable class="filter-item" style="width: 80%" placeholder="请选择所属医院" v-model="form.belongHospitalName" >
              <el-option v-for="item in typeOptions1" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key"></el-option>
            </el-select>
            <!-- <el-input v-model="form.belongHospitalName" style="width: 80%"></el-input> -->
          </el-form-item>
           <el-form-item label="所属院区">
            <!-- <el-input v-model="form.belongCamplusName" style="width: 80%"></el-input> -->
            <el-select clearable filterable class="filter-item" style="width: 80%" placeholder="请选择所属院区" v-model="form.belongCamplusName">
              <el-option v-for="item in typeOptions2" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key"></el-option>
            </el-select>
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
import request from '../../util/request'
export default {
  name: 'Home',
  components: {
  },
  data(){
    return{
      form:{
        id:'',
        name:'',
        englishName:'',
        status:'',
        belongHospitalName:'',
        belongCamplusName:'',
      },
      dialogVisible:false,
      dialogFormVisible:false,
      search:'',
      currentPage:1,
      pageSize:5,
      total:0,
      tableData:[],
      sels: [],//选中的选项
       typeOptions1: [
        {key: '001', display_name: '妇科'},
        {key: '002', display_name: '儿科'},
        {key: '003', display_name: '助产科'},
        {key: '004', display_name: '急诊科'},
        {key: '005', display_name: '精神科'}
      ],
      typeOptions2: [
        {key: '001', display_name: '妇科1'},
        {key: '002', display_name: '儿科1'},
        {key: '003', display_name: '助产科1'},
        {key: '004', display_name: '急诊科1'},
        {key: '005', display_name: '精神科1'}
      ],

    }
  },
  // 页面加载
  created(){
    this.load();
    this.getDropdown1();
    this.getDropdown2();
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
        let arr=[];
        if(this.search!==''){
          for(let i =0;i<res.data.total;i++){
            if(this.search===res.data.Array[i].name){
               arr.push(res.data.Array[i]);
            }
          }
          this.tableData=arr;
        }else{
        console.log(res)
        this.tableData = res.data.Array
        this.total = res.data.total
        }
        
      })
    },

    add(){
      this.dialogFormVisible = true
      this.form = {}
    },

    save(){
          console.log("我在编辑菜单下");
          console.log(this.form);
          console.log(this.tableData[this.form.id-1]);
          request.put("/put",this.form).then(res => {
          console.log(res)
          if (res.code ==='0'){
            //this.tableData[this.form.id-1]=this.form;
            this.tableData.splice(this.form.id-1,1,this.form);
            console.log("修改之后");
            console.log(this.tableData);
            this.$message({
              type:"success",
              message:"更新成功！"
            })
          }else {
            this.$message({
              type:"error",
              message:"更新失败"
            })
          }
         // this.load()  //刷新表格数据
        this.dialogVisible=false;
        })
    },

    getDropdown1(){
      request.get("/dropdown1").then(res => {
          console.log("我在下拉框");
          console.log(res);
          this.typeOptions1=res.data.dropdown;
      })
    },

     getDropdown2(){
      request.get("/dropdown2").then(res => {
          console.log("我在下拉框");
          console.log(res);
          this.typeOptions2=res.data.dropdown;
      })
    },

    submit(){
      request.post("/save",this.form)
      .then(res => {
          let vm=this;
          console.log(res)
          if (res.code ==='0'){
            vm.tableData.push(this.form);
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
         // this.load()  //刷新表格数据
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
        let vm=this;
        if (res.code ==='0'){
          this.tableData.splice(id-1,1);
          this.$message({
            type:"success",
            message:"删除成功！"
          })
        }else {
          this.$message({
            type:"error",
            message:"删除失败"
          })
        }
        //this.load() //重新加载表格数据
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
    },


  }
}
</script>
<style>
.content-box{
  position: absolute;
  left: 258px;      /* 控制左侧二级菜单栏的宽度 */
  right: 8px;
  top: 78px;
  bottom: 0;
  padding: 10px 20px;
  background: #f9fafb;
}
</style>