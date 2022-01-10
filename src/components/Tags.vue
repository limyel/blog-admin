<template>
  <div>
    <!-- todo 借助 vuex -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{name: 'Home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>标签管理</el-breadcrumb-item>
      <el-breadcrumb-item>标签列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
              placeholder="请输入内容"
              clearable
              v-model="keyword"
              @clear="getTags">
            <el-button
                slot="append"
                icon="el-icon-search"
                @click="handleCurrentChange(1);getTags;">
            </el-button>
          </el-input>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" @click="() => {this.dialogVisible = true;}">新增标签</el-button>
        </el-col>
      </el-row>

      <el-table :data="tags" stripe border>
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="name" label="标签名"></el-table-column>
        <el-table-column prop="slug" label="slug"></el-table-column>
        <el-table-column prop="createdAt" label="发布日期">
          <template v-slot="scope">
            {{ scope.row.createdAt | showTimeDetail }}
          </template>
        </el-table-column>
        <el-table-column prop="updatedAt" label="更新日期">
          <template v-slot="scope">
            {{ scope.row.updatedAt | showTimeDetail }}
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="() => {tag = scope.row; dialogVisible = true;}">
            </el-button>
            <el-button
                size="mini"
                type="warning"
                icon="el-icon-delete"
                @click="deleteTag(scope.row.id)">
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



    <!-- 添加标签对话框 -->
    <el-dialog
        title="编辑标签"
        :visible.sync="dialogVisible"
        width="50%"
        @close="addDialogClosed">
      <el-form :model="tag" label-width="70px">
        <el-form-item label="标签名" prop="name">
          <el-input v-model="tag.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="() => {dialogVisible = false; tag = {name: ''};}">取 消</el-button>
        <el-button type="primary" @click="saveTag">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {apiTagDelete, apiTags, apiTagSave, apiTagUpdate} from "@/request/api/tag";
import {showTimeDetail} from "@/utils/TimeUtil";

export default {
  name: "Tags",
  data() {
    return {
      tags: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 15,
        total: 0
      },
      dialogVisible: false,
      tag: {
        name: ''
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

<style lang="stylus" scoped>
.el-card
  margin-top 20px

.el-table
  width 100%
  margin-top 20px

.el-pagination
  margin-top 20px
</style>