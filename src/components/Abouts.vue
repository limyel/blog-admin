<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{name: 'Home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>关于管理</el-breadcrumb-item>
      <el-breadcrumb-item>关于列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button type="primary" @click="() => {this.dialogVisible = true;}">新增关于</el-button>
        </el-col>
      </el-row>

      <el-table :data="abouts" stripe border>
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="title" label="名称"></el-table-column>
        <el-table-column prop="sequence" label="顺序"></el-table-column>

        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="() => {this.$router.push({name: 'AboutEdit'})}">
            </el-button>
            <el-button
                size="mini"
                type="warning"
                icon="el-icon-delete"
                @click="deleteAbout(scope.row.id)">
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
          @current-change="handleCurrentChange"
          :current-page="pageInfo.pageNum"
          :page-size="pageInfo.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="pageInfo.total"
          background>
      </el-pagination>
    </el-card>



    <!-- 添加关于对话框 -->
    <el-dialog
        title="添加关于"
        :visible.sync="dialogVisible"
        width="50%"
        @close="addDialogClosed">
      <el-form :model="about" label-width="70px">
        <el-form-item label="名称" prop="title">
          <el-input v-model="about.title"></el-input>
        </el-form-item>
        <el-form-item label="顺序" prop="sequence">
          <el-input v-model="about.sequence"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="() => {dialogVisible = false; about = {title: '', sequence: null};}">取 消</el-button>
        <el-button type="primary" @click="saveAbout">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {apiTagDelete, apiTags, apiTagSave, apiTagUpdate} from "@/request/api/tag";
import {showTimeDetail} from "@/utils/TimeUtil";

export default {
  name: "Abouts",
  data() {
    return {
      abouts: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 15,
        total: 0
      },
      dialogVisible: false,
      about: {
        title: '',
        sequence: null,
      }
    }
  },
  methods: {
    getTags() {
      apiTags(this.pageInfo.pageNum, this.pageInfo.pageSize).then(response => {
        this.tags = response.data.list;
        this.pageInfo.total = response.data.total;
        this.pageInfo.pageNum = response.data.pageNum;
      });
    },
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum;
      this.getTags();
    },
    saveTag() {
      if (this.tag.id !== undefined) {
        apiTagUpdate(this.tag.id, this.tag);
      } else {
        apiTagSave(this.tag);
      }
    },
    deleteTag(id) {
      apiTagDelete(id);
    }
  },
  mounted() {
    this.getTags();
  },
  filters: {
    showTimeDetail
  }
}
</script>

<style scoped>

</style>