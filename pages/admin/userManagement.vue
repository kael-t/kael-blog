<template>
  <el-table
    :data="userData"
    style="width: 100%"
    :default-sort="{prop: 'date', order: 'descending'}">
    <el-table-column
      prop="account"
      label="账号">
    </el-table-column>
    <el-table-column
      prop="nickname"
      label="昵称">
    </el-table-column>
    <el-table-column
      prop="isGithuber"
      label="是否为github账号"
      width="180"
      :formatter="formatGithuber">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱">
    </el-table-column>
    <el-table-column
      prop="priv"
      label="权限"
      width="100"
      :formatter="formatPriv">
    </el-table-column>
    <el-table-column
      prop="created_at"
      label="创建时间"
      sortable
      :formatter="formatDate">
    </el-table-column>
    <el-table-column>
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="请输入用户名"/>
      </template>
      <template slot-scope="scope">
        <a v-if="scope.row.priv === 0" @click="setPriv(scope.row, 'admin')">设为管理员</a>
        <a v-else-if="scope.row.priv === 1" @click="setPriv(scope.row, 'normal')">设为普通人员</a>
      </template>
    </el-table-column>
    <div class="pagination-wrapper" slot="append">
      <el-pagination
        background
        @size-change="getUserData"
        @current-change="getUserData"
        :current-page.sync="pageNo"
        :page-sizes="[10, 20, 30, 50]"
        :page-size.sync="pageSize"
        layout="prev, pager, next, jumper, sizes, total"
        :total="total">
      </el-pagination>
    </div>
  </el-table>
</template>

<script>
export default {
  layout: 'admin',
  data () {
    return {
      userData: [],
      search: '',
      pageSize: 20,
      pageNo: 1,
      total: 0,
    }
  },
  created () {
    this.getUserData()
  },
  methods: {
    formatPriv (row) {
      const privText = ["普通用户", "管理员"]
      return privText[row.priv]
    },
    formatGithuber (row) {
      return row.isGithuber ? '是' : '否'
    },
    formatDate (row) {
      return new Date(row.created_at).toLocaleString()
    },
    getUserData () {
      this.$store.dispatch('user/GET_USER_LIST', { pageNo: this.pageNo, pageSize: this.pageSize }).then(data => {
        if (data.code === 0) {
          this.userData = data.rows
          this.total = data.count
        }
      })
    },
    // 设为管理员
    setPriv (row, role) {
      let params = {
        userId: row.userId
      }
      switch (role) {
        case 'admin': params.priv = 1;break;
        case 'normal': params.priv = 0;break;
        default: params.priv = 0
      }
      this.$store.dispatch('user/SET_PRIV', params).then(data => {
        if (data.code === 0) {
          this.$message.success(data.msg)
          row.priv = params.priv
        }
      })
    }
  }
}
</script>
<style lang="less">
.pagination-wrapper {
  text-align: center;
  padding: 10px;
}
</style>
