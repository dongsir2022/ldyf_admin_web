<template>
  <div>
    <el-calendar v-model="myDate" v-loading="loading">
      <template
        slot="dateCell"
        slot-scope="{date, data}"
      >
        <div>
          <el-row style="height: 40px;padding-top: 10px;padding-left: 5px;">
            <el-col :span="8">{{ data.day.split('-').slice(1).join('-') }}</el-col>
            <el-col :span="16">
              <el-tag v-if="data.type==='current-month'&&holidayMap[data.day]!==undefined" type="danger" size="mini">
                {{ holidayMap[data.day].holiday_name }}
              </el-tag>
            </el-col>
          </el-row>
          <el-row type="flex" justify="end">
            <el-col v-if="data.type==='current-month'&&holidayMap[data.day]!==undefined" :span="4">
              <el-popconfirm
                confirm-button-text="好的"
                cancel-button-text="不用了"
                icon="el-icon-info"
                icon-color="red"
                title="确认删除该节假日么？"
                @confirm="removeHoliday(holidayMap[data.day])"
              >
                <el-button slot="reference" type="text" style="color: red">删除</el-button>
              </el-popconfirm>
            </el-col>
            <el-col v-if="data.type==='current-month'&&holidayMap[data.day]===undefined" :span="4">
              <el-button type="text" @click="addHoliday(data.day)">新增</el-button>
            </el-col>
          </el-row>
        </div>
      </template>
    </el-calendar>
    <el-dialog
      title="添加节假日"
      :visible.sync="addHolidayVisible"
      width="35%"
    >
      <el-form ref="holidayForm" :model="holidayForm" :rules="rules" label-width="100px">
        <el-form-item label="节日日期" prop="holiday_date">
          <el-date-picker
            v-model="holidayForm.holiday_date"
            style="width: 100%"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="节日名称" prop="holiday_name">
          <el-input v-model="holidayForm.holiday_name" maxlength="10" show-word-limit />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">{{ $t('button.cancel') }}</el-button>
        <el-button type="primary" :loading="submitLoading" @click="submitHoliday">{{ $t('button.sure') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./holiday.js"/>
<style scoped>
  .is-selected {
    color: #1989FA;
  }
</style>
