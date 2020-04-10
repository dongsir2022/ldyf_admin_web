<template>
  <div class="app-container">
    <div class="block">
      <el-row>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-circle-plus" @click.native="addRootMenu">添加一级菜单</el-button>
        </el-col>
      </el-row>
    </div>
    <!--树结构菜单 -->
    <div class="custom-tree-container">
      <div class="block">
        <el-tree
          v-loading="loading"
          :data="data"
          :props="props"
          node-key="id"
          default-expand-all
          :expand-on-click-node="true">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>
              <i v-if="data.type===1" class="el-icon-folder-opened"></i>
              <i v-else class="el-icon-document"></i>
              <span>{{ node.label }}</span>
              <span style="margin-left: 10px;">( {{ data.name}} )</span>
              <span v-if="data.hidden == 1" style="margin-left: 10px;">隐藏</span>
            </span>
            <span style="margin-right: 550px">
              <el-button
                type="text"
                size="mini"
                @click.stop="() => append(node,data)">
                添加子菜单
              </el-button>
              <el-button
                type="text"
                size="mini"
                style="color: #ffac38"
                @click.stop="() => edit(node, data)">
                编辑
              </el-button>
              <el-button
                type="text"
                size="mini"
                style="color: #f54545"
                @click.stop="() => remove(node, data)">
                删除
              </el-button>
            </span>
          </span>
        </el-tree>

      </div>
    </div>
    <!--添加dialog-->
    <el-dialog
      :title="formTitle"
      :visible.sync="formVisible"
      width="50%"
      :before-close="cancel">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="22">
            <el-form-item label="名称" prop="name">
              <el-input v-model="form.name" minlength="1" maxlength="30" placeholder="用英文id唯一标记该菜单"
                        show-word-limit></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="22">
            <el-form-item label="标题" prop="title">
              <el-input v-model="form.title" minlength="1" maxlength="60" placeholder="请输入菜单名称"
                        show-word-limit></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="类型" prop="type">
              <el-select v-model="form.type" style="width: 100%;" @change="menuTypeChange(form)">
                <el-option
                  v-for="item in options.type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7" v-if="form.type==1">
            <el-form-item label="总是展开">
              <el-switch
                v-model="form.always_show"
                active-color="#13ce66"
                :active-value=1
                :inactive-value=0>
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="7" v-else>
            <el-form-item label="缓存页面">
              <el-switch
                v-model="form.cache"
                active-color="#13ce66"
                :active-value=1
                :inactive-value=0>
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="22">
            <el-form-item label="path" prop="path">
              <el-input v-model="form.path" minlength="1" maxlength="100" placeholder="请输入路由地址"
                        show-word-limit></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="22">
            <el-form-item label="页面地址" prop="component">
              <el-input v-model="form.component" minlength="1" maxlength="255" placeholder="文件夹请输入Layout"
                        show-word-limit></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="22">
            <el-form-item label="图标" prop="icon">
              <el-input v-model="form.icon" minlength="1" maxlength="50" placeholder="请输入图标id"
                        show-word-limit></el-input>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item label="排序值" prop="sort_value">
              <el-input v-model="form.sort_value" minlength="1" maxlength="11" placeholder="请输入整数值代表显示顺序"
                        show-word-limit></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="隐藏" prop="hidden">
              <el-switch
                v-model="form.hidden"
                active-color="#13ce66"
                :active-value=1
                :inactive-value=0>
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="22">
            <el-form-item label="备注">
              <el-input v-model="form.comments" maxlength="100" placeholder="选填" show-word-limit></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="save">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script src="./menu.js"></script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
