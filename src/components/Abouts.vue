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
                icon="el-icon-more"
                @click="showItems(scope.row.id)">
            </el-button>
            <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="() => {about.title = scope.row.title; about.sequence = scope.row.sequence; about.id = scope.row.id; editVisible = true; }">
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




    <el-dialog
        title="编辑item"
        :visible.sync="editItemVisible"
        width="50%"
        @close="() => {editItemVisible = false; aboutId = null;}">

      <el-form :model="aboutItem" label-width="70px">
        <el-form-item label="项目名" prop="name">
          <el-input v-model="aboutItem.name"></el-input>
        </el-form-item>
        <el-form-item label="链接" prop="link">
          <el-input v-model="aboutItem.link"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="aboutItem.description"></el-input>
        </el-form-item>
        <el-form-item label="顺序" prop="sequence">
          <el-input v-model="aboutItem.sequence"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="() => {editItemVisible = false; aboutItem = {name: '', link: '', description: '', aboutId: null, sequence: 0};}">取 消</el-button>
        <el-button type="primary" @click="saveAboutItem">保 存</el-button>
      </span>

    </el-dialog>



    <el-dialog
      title="关于items"
      :visible.sync="itemsVisible"
      width="50%"
      @close="() => {itemsVisible = false;}">

      <el-row :gutter="20">
        <el-col :span="4">
          <el-button type="primary" @click="() => {editItemVisible = true;}">新增关于item</el-button>
        </el-col>
      </el-row>

      <el-table :data="aboutItems" stripe border>
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="name" label="项目名"></el-table-column>
        <el-table-column prop="link" label="链接"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column prop="sequence" label="顺序"></el-table-column>

        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="() => {aboutItem = scope.row; editItemVisible = true; }">
            </el-button>
            <el-button
                size="mini"
                type="warning"
                icon="el-icon-delete"
                @click="deleteAboutItem(scope.row.id)">
            </el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-dialog>


    <!-- 编辑关于对话框 -->
    <el-dialog
        title="编辑关于"
        :visible.sync="editVisible"
        width="50%"
        @close="() => {editVisible = false; about = {title: '', sequence: 0}}">
      <el-form :model="about" label-width="70px">
        <el-form-item label="名称" prop="title">
          <el-input v-model="about.title"></el-input>
        </el-form-item>
        <el-form-item label="顺序" prop="sequence">
          <el-input v-model="about.sequence"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="() => {editVisible = false; about = {title: '', sequence: 0};}">取 消</el-button>
        <el-button type="primary" @click="updateAbout">更 新</el-button>
      </span>
    </el-dialog>


    <!-- 添加关于对话框 -->
    <el-dialog
        title="添加关于"
        :visible.sync="dialogVisible"
        width="50%"
        @close="() => {dialogVisible = false; about = {title: '', sequence: null}}">
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

import {showTimeDetail} from "@/utils/TimeUtil";
import {apiAboutDelete, apiAbouts, apiAboutSave, apiAboutUpdate} from "@/request/api/about";
import {apiAboutItemDelete, apiAboutItems, apiAboutItemSave, apiAboutItemUpdate} from "@/request/api/aboutItem";

export default {
  name: "Abouts",
  data() {
    return {
      abouts: [],
      aboutItems: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 15,
        total: 0
      },
      dialogVisible: false,
      editVisible: false,
      itemsVisible: false,
      editItemVisible: false,
      about: {
        title: '',
        sequence: 0,
      },
      aboutItem: {
        name: '',
        link: '',
        description: '',
        aboutId: null,
        sequence: 0
      },
      aboutId: null
    }
  },
  methods: {
    getAbouts() {
      apiAbouts(this.pageInfo.pageNum, this.pageInfo.pageSize).then(response => {
        this.abouts = response.data.list;
        this.pageInfo.total = response.data.total;
        this.pageInfo.pageNum = response.data.pageNum;
      });
    },
    updateAbout() {
      apiAboutUpdate(this.about.id, this.about).then(response => {
        if (response.code === 0) {
          this.editVisible = false;
          this.about = {
            title: '',
            sequence: 0,
          };
          this.getAbouts();
        }
      });
    },
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum;
      this.getTags();
    },
    saveAbout() {
      apiAboutSave(this.about).then(response => {
        if (response.code === 0) {
          this.dialogVisible = false;
          this.getAbouts();
        }
      });
    },
    deleteAbout(aboutId) {
      apiAboutDelete(aboutId).then(response => {
        if (response.code === 0) {
          this.getAbouts();
        }
      });
    },
    deleteAboutItem(aboutItemId) {
      apiAboutItemDelete(aboutItemId).then(response => {
        if (response.code === 0) {
          this.getAboutItems(this.aboutId);
        }
      })
    },
    getAboutItems(id) {
      apiAboutItems(id).then(response => {
        this.aboutItems = response.data;
      });
    },
    showItems(aboutId) {
      this.itemsVisible = true;
      this.aboutId = aboutId;
      this.getAboutItems(aboutId);
    },
    saveAboutItem() {
      if (this.aboutItem.id !== undefined) {
        apiAboutItemUpdate(this.aboutItem).then(response => {
          if (response.code === 0) {
            this.editItemVisible = false;
            this.aboutItem = {
              name: '',
              link: '',
              description: '',
              aboutId: null,
              sequence: 0
            };
          }
        });
      } else {
        this.aboutItem.aboutId = this.aboutId;
        apiAboutItemSave(this.aboutItem).then(response => {
          if (response.code === 0) {
            this.editItemVisible = false;
            this.aboutItem = {
              name: '',
              link: '',
              description: '',
              sequence: 0
            };
          }
        })
      }
    }
  },
  mounted() {
    this.getAbouts();
  },
  filters: {
    showTimeDetail
  }
}
</script>

<style scoped>

</style>