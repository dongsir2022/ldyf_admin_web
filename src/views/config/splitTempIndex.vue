<template>
  <div class="app-container">
    <div class="block">
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-steps :active="active" finish-status="success">
            <el-step title="编辑基本信息">
            </el-step>
            <el-step title="分润设置">
            </el-step>
          </el-steps>
        </el-col>
      </el-row>
    </div>
    <el-card v-if="active===1" class="box-card">
      <el-form ref="form" :model="infoForm" label-width="120px">
        <el-row>
          <el-col :span="16">
            <el-form-item label="模版名称" prop="title">
              <el-input v-model="infoForm.temp_name" minlength="1" maxlength="60" placeholder="请输入模版名称"
                        show-word-limit></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="备注" prop="title">
              <el-input v-model="infoForm.temp_remark" minlength="1" maxlength="60" placeholder="请输入备注"
                        show-word-limit></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" :offset="2">
            <el-button type="primary" @click="infoNext" plain>下一步</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card v-if="active===2" class="box-card">
      <el-form ref="form" :model="settingForm" label-width="120px">
        <el-row>
          <el-col :span="16">
            <el-form-item label="分润方式" prop="type">
              <el-radio v-model="settingForm.type" label="1">按百分比分润</el-radio>
              <el-radio v-model="settingForm.type" label="2">按固定金额分润</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="模版层级" prop="type">
              <el-select v-model="settingForm.level" placeholder="请选择">
                <el-option
                  v-for="item in levelArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="分润规则" prop="type">
              <el-input v-model="settingForm.input1" placeholder="平台分润">
                <template slot="append">{{settingForm.type|dict}}</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-if="settingForm.level>=1" v-model="settingForm.input2" placeholder="一级商户分润">
                <template slot="append">{{settingForm.type|dict}}</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-if="settingForm.level>=2" v-model="settingForm.input3" placeholder="二级商户分润">
                <template slot="append">{{settingForm.type|dict}}</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-if="settingForm.level>=3" v-model="settingForm.input4" placeholder="三级商户分润">
                <template slot="append">{{settingForm.type|dict}}</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-if="settingForm.level>=4" v-model="settingForm.input5" placeholder="四级商户分润">
                <template slot="append">{{settingForm.type|dict}}</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-if="settingForm.level>=5" v-model="settingForm.input6" placeholder="五级商户分润">
                <template slot="append">{{settingForm.type|dict}}</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" :offset="2">
            <el-button type="primary" @click="gotoInfo" plain>上一步</el-button>
            <el-button type="primary" @click="submit" plain>提交</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>
<script src="./splitTemp.js"/>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
