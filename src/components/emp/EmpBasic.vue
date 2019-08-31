<template>
  <div>
    <el-container>
      <el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center">
        <div style="display: inline">
          <el-input placeholder="通过员工名搜索员工,记得回车哦..." clearable style="width: 300px;margin: 0px;padding: 0px;" size="mini"   prefix-icon="el-icon-search"
                    @change="query"  @keyup.enter.native="query" v-model="keywords">
          </el-input>
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
                keywords: '',
                currentPage: 1,
                emps:[],
                tableQuery: {
                    page: 1,
                    size: 12,
                    draw: 0,
                    filter: {

                    },
                },
                tableData: {
                    aaData: [],
                    draw: 0,
                    iTotalDisplayRecords: 0,
                    iTotalRecords: 0,
                },
            }
        },
        methods:{
            searchEmp() {
                this.query();
            },
            query() {
                let vm = this;
                let obj = $.extend({}, vm.tableQuery, {filter: vm.eduFilterParam(vm.tableQuery.filter)});
                vm.getRequest("/employee/basic/emp", {params: obj}).then(function (xhr) {
                    if(xhr.data.code)return
                    vm.emps = xhr.data.emps;
                    vm.totalCount =xhr.data.count;
                })
            }
        },
        mounted() {
            let vm = this;
            vm.query();
        }

    }
</script>

<style scoped>

</style>
