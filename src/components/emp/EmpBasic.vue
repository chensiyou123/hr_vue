<template>
  <div>
    <el-container>
      <el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center">
        <div style="display: inline">
          <el-input placeholder="通过员工名搜索员工,记得回车哦..." clearable style="width: 300px;margin: 0px;padding: 0px;" size="mini"   prefix-icon="el-icon-search" @change="query"  @keyup.enter.native="query" v-model="tableQuery.filter.keywords"></el-input>
          <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="query">搜索</el-button>
          <el-button slot="reference" type="primary" size="mini" style="margin-left: 5px" @click="showAdvanceSearchView"><i class="fa fa-lg" :class="[advanceSearchViewVisible ? faangledoubleup:faangledoubledown]" style="margin-right: 5px"></i>高级搜索</el-button>
        </div>
        <div style="margin-left: 5px;margin-right: 20px;display: inline">
          <el-upload :show-file-list="false"   accept="application/vnd.ms-excel"  action="/employee/basic/importEmp"  :on-success="fileUploadSuccess"   :on-error="fileUploadError"  :before-upload="beforeFileUpload" style="display: inline">
            <el-button size="mini" type="success" :loading="fileUploadBtnText=='正在导入'"><i class="fa fa-lg fa-level-up" style="margin-right: 5px"></i>{{fileUploadBtnText}}</el-button>
          </el-upload>
          <el-button type="success" size="mini" @click="exportEmps"><i class="fa fa-lg fa-level-down" style="margin-right: 5px"></i>导出数据</el-button>
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="showAddEmpView">添加员工</el-button>
        </div>
      </el-header>
    </el-container>
  </div>
</template>
<script>
    export default {
        name: "EmpBasic",
        data(){
            return{
                dialogVisible:false,//添加弹窗控制
                dialogTitle: '',//弹窗
                fileUploadBtnText: '导入数据',
                currentPage: 1,
                emps:[],
                advanceSearchViewVisible: false,//高级收索
                faangledoubledown: 'fa-angle-double-down',//收起样式
                faangledoubleup: 'fa-angle-double-up',//展开样式
                tableQuery: {
                    page: 1,
                    size: 10,
                    draw: 0,
                    filter: {
                        keywords:'',
                    },
                },//查询条件
                tableData: {
                    aaData: [],
                    draw: 0,
                    iTotalDisplayRecords: 0,
                    iTotalRecords: 0,
                },//返回结果
                emp: {
                    name: '',
                    gender: '',
                    birthday: '',
                    idCard: '',
                    wedlock: '',
                    nationId: '',
                    nativePlace: '',
                    politicId: '',
                    email: '',
                    phone: '',
                    address: '',
                    departmentId: '',
                    departmentName: '所属部门...',
                    jobLevelId: '',
                    posId: '',
                    engageForm: '',
                    tiptopDegree: '',
                    specialty: '',
                    school: '',
                    beginDate: '',
                    workState: '',
                    workID: '',
                    contractTerm: '',
                    conversionTime: '',
                    notWorkDate: '',
                    beginContract: '',
                    endContract: '',
                    workAge: ''
                },
                tableLoading:false,//加载
            }
        },
        methods:{
            //文件上传成功
            fileUploadSuccess(response, file, fileList){
                let vm = this;
                if (response) {
                    this.$message({type: response.status, message: response.msg});
                }
                vm.query();
                this.fileUploadBtnText = '导入数据';
            },
            //导入错误
            fileUploadError(err, file, fileList) {
                this.$message({type: 'error', message: "导入失败!"});
                this.fileUploadBtnText = '导入数据';
            },
            //导入预处理
            beforeFileUpload(file) {
                this.fileUploadBtnText = '正在导入';
            },
            //查询员工信息
            query() {
                let vm = this;
                let obj = $.extend({}, vm.tableQuery, {filter: vm.eduFilterParam(vm.tableQuery.filter)});
                vm.tableLoading = true;
                vm.getRequest("/employee/basic/emp", obj).then(function (xhr) {
                    vm.emps = xhr.data.emps;
                    vm.totalCount =xhr.data.count;
                    vm.tableLoading = false;
                })
            },
            //高级搜索
            showAdvanceSearchView() {
                this.advanceSearchViewVisible = !this.advanceSearchViewVisible;
                this.tableQuery.filter.keywords = '';
                if (!this.advanceSearchViewVisible) {
                    this.emptyEmpData();
                    this.beginDateScope = '';
                    this.query();
                }
            },
            //重置数据
            emptyEmpData() {
                this.emp = {
                    name: '',
                    gender: '',
                    birthday: '',
                    idCard: '',
                    wedlock: '',
                    nationId: '',
                    nativePlace: '',
                    politicId: '',
                    email: '',
                    phone: '',
                    address: '',
                    departmentId: '',
                    departmentName: '所属部门...',
                    jobLevelId: '',
                    posId: '',
                    engageForm: '',
                    tiptopDegree: '',
                    specialty: '',
                    school: '',
                    beginDate: '',
                    workState: '',
                    workID: '',
                    contractTerm: '',
                    conversionTime: '',
                    notWorkDate: '',
                    beginContract: '',
                    endContract: '',
                    workAge: ''
                }
            },
            //到处数据
            exportEmps() {
                window.open("/employee/basic/exportEmp", "_parent");
            },
            //添加员工
            showAddEmpView() {
                let vm = this;
                vm.dialogTitle = "添加员工";
                vm.dialogVisible = true;
                vm.getRequest("/employee/basic/maxWorkID").then(xhr => {
                    if (xhr && xhr.status == 200) {
                        vm.emp.workID = xhr.data;
                    }
                })
            },
        },
        mounted() {
            let vm = this;
            vm.query();
        }

    }
</script>

<style scoped>

</style>
