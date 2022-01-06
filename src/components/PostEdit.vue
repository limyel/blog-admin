<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{name: 'Home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>编辑</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-form
        :model="post"
        label-position="top">
        <el-form-item label="标题" prop="title">
          <el-input v-model="post.title"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="introduction">
          <el-input v-model="post.introduction"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" v-model="post.content"></el-input>
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <el-select v-model="post.tagIds" multiple placeholder="标签">
            <el-option v-for="tag in tags" :key="tag.id" :label="tag.name" :value="tag.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <el-button type="primary" @click="save">保存</el-button>
    </el-card>
  </div>
</template>

<script>
import {apiTags} from "@/request/api/tag";
import {apiPost, apiPostSave, apiPostUpdate} from "@/request/api/post";

export default {
  name: "PostEdit",
  data() {
    return {
      post: {
        title: '',
        introduction: '',
        content: '',
        tags: [],
        tagIds: []
      },
      tags: [],
      id: null
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    if (this.id !== null && this.id != undefined) {
      apiPost(this.id).then(response => {
        this.post = response.data;
      })
    }

    apiTags().then(response => {
      this.tags = response.data.list;
    })
  },
  methods: {
    save() {
      if (this.id !== null && this.id != undefined) {
        apiPostUpdate(this.id, this.post);
      } else {
        apiPostSave(this.post);
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

.el-card
  margin-top 20px

</style>