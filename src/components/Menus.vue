<template>
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{name: 'Home'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>文章管理</el-breadcrumb-item>
        <el-breadcrumb-item>文章列表</el-breadcrumb-item>
      </el-breadcrumb>

      <el-card>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input
                placeholder="请输入内容"
                clearable
                v-model="keyword"
                @clear="getPosts">
              <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="handleCurrentChange(1);getPosts;">
              </el-button>
            </el-input>
          </el-col>

          <el-col :span="4">
            <el-button type="primary" @click="() => {this.$router.push({name: 'PostEdit'})}">新增文章</el-button>
          </el-col>
        </el-row>

        <el-table :data="posts" stripe border>
          <el-table-column type="index"> </el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column prop="tags" label="标签">
            <template v-slot="scope">
            <span v-for="tag in scope.row.tags" :key="tag.id">
              {{ tag.name }}&nbsp;&nbsp;&nbsp;
            </span>
            </template>
          </el-table-column>
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
                  @click="toEdit(scope.row.id)">
              </el-button>
              <el-button
                  size="mini"
                  type="warning"
                  icon="el-icon-delete"
                  @click="deletePost(scope.row.id)">
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="total"
            background>
        </el-pagination>
      </el-card>

    </div>
  </div>
</template>

<script>
export default {
  name: "Menus"
}
</script>

<style scoped>

</style>