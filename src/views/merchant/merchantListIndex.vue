<template>
  <div class="app-container">
    <div class="block">
      <el-row :gutter="10" type="flex">
        <el-col :span="6">
          <el-input v-model="search.merchantName" clearable class="filter-item input-tx" placeholder="输入商户名称"/>
        </el-col>
        <el-col :span="3">
          <el-select v-model="search.status" placeholder="请选择商户状态">
            <el-option
              v-for="item in merchantStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button class="filter-item" type="primary" icon="el-icon-search" :loading="loading" @click="search1">查询
          </el-button>
        </el-col>
      </el-row>
    </div>
    <el-table
      v-loading="loading"
      :element-loading-text="loadingText"
      :data="list"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        align="center"
        label="商户编号"
        min-width="200"
        prop="merchant_no"
      />
      <el-table-column
        align="center"
        label="商户名称"
        min-width="300"
        prop="merchant_name"
      />
<!--      <el-table-column-->
<!--        align="center"-->
<!--        label="微信渠道号"-->
<!--        width="100"-->
<!--        prop="wechat_no"-->
<!--      />-->
<!--      <el-table-column-->
<!--        align="center"-->
<!--        label="支付宝渠道号"-->
<!--        width="120"-->
<!--        prop="alipay_no"-->
<!--      />-->
      <el-table-column
        align="center"
        label="通联渠道号"
        width="200"
        prop="union_no"
      />
      <el-table-column
        align="center"
        label="商户费率"
        width="120"
        prop="pay_rate"
      />
      <el-table-column align="center" label="商户限额" width="120">
        <template slot-scope="scope">
          ￥{{ $common.jeFormat(scope.row.trading_limit, 2) }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="创建时间"
        width="160"
        prop="create_time"
      />
      <el-table-column
        v-if="!$route.meta.readOnly"
        align="center"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
            更多<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="openingUnoin(scope.row.id)">
                开通支付
              </el-dropdown-item>
              <el-dropdown-item @click.native="allinpayStatus(scope.row)">
                查看通联商户状态
              </el-dropdown-item>
              <el-dropdown-item @click.native="info(scope.row.id)">
                查看详情
              </el-dropdown-item>
              <el-dropdown-item v-if="scope.row.split_status===2" @click.native="openSplitAuth(scope.row)">
                开通分账权限
              </el-dropdown-item>
              <el-dropdown-item @click.native="alter(scope.row)">
                商户修改限额
              </el-dropdown-item>
              <el-dropdown-item @click.native="modifyPaymentRate(scope.row)">
                修改支付费率
              </el-dropdown-item>
              <el-dropdown-item @click.native="alterModifyBankCardNum(scope.row)">
                修改银行卡信息
              </el-dropdown-item>
              <el-dropdown-item @click.native="tradeDeviceList(scope.row.id)">
                门店管理
              </el-dropdown-item>
<!--              <el-dropdown-item @click.native="openingWechant(scope.row.id)">-->
<!--                开通微信支付-->
<!--              </el-dropdown-item>-->
<!--              <el-dropdown-item @click.native="wxStatus(scope.row)">-->
<!--                查看微信开通结果-->
<!--              </el-dropdown-item>-->
<!--              <el-dropdown-item @click.native="openingAlipay(scope.row.id)">-->
<!--                开通支付宝支付-->
<!--              </el-dropdown-item>-->

              <el-dropdown-item v-if="scope.row.merchant_status===1" @click.native="freezeMerchant(scope.row)">
                冻结
              </el-dropdown-item>
              <el-dropdown-item v-if="scope.row.merchant_status===2" @click.native="normalMerchant(scope.row)">
                解冻
              </el-dropdown-item>
              <el-dropdown-item v-if="scope.row.merchant_status===1" @click.native="rejectChange(scope.row)">
                驳回修改
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination-container block">
      <el-pagination
        :current-page="page"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        background
        layout="total, sizes, prev, pager, next"
        :page-size="pageSize"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
    <!-- 商户限额 -->
    <el-dialog title="商户修改限额" :visible.sync="dialogVisible" width="30%">
      <el-form ref="codeForm" :model="codeData" label-width="60px">
        <el-form-item label="限额" prop="amount">
          <el-input-number v-model="codeData.amount" :precision="2" :max="999999999" :min="0" :step="100"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">{{ $t('button.cancel') }}</el-button>
        <el-button type="primary" :loading="submitLoading" @click="submit">{{ $t('button.sure') }}</el-button>
      </span>
    </el-dialog>
    <!--    费率-->
    <el-dialog title="商户修改费率" :visible.sync="dialogVisible3" width="30%">
      <el-form ref="rateCodeForm" :model="rateCodeData" label-width="60px">
        <el-form-item label="费率" prop="amount">
          <el-input-number v-model="rateCodeData.amount" :precision="4" :step="0.0001" :min="0.0000"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rateClose">{{ $t('button.cancel') }}</el-button>
        <el-button type="primary" :loading="submitLoading" @click="rateSubmit">{{ $t('button.sure') }}</el-button>
      </span>
    </el-dialog>
    <!--  修改银行卡号  -->
    <el-dialog title="修改银行卡信息" :visible.sync="dialogVisible1" width="30%">
      <el-form ref="codeForm1" :model="bankCodeData" :rules="bankRules" label-width="100px">
        <el-form-item label="银行卡号" prop="bankCardNo">
          <el-input v-model="bankCodeData.bankCardNo"/>
        </el-form-item>
        <el-form-item label="银行名称" prop="bankName">
          <el-input v-model="bankCodeData.bankName"/>
        </el-form-item>
        <el-form-item label="支行名称" prop="bankNameSub">
          <el-input v-model="bankCodeData.bankNameSub"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="bankClose">{{ $t('button.cancel') }}</el-button>
        <el-button type="primary" :loading="submitLoading" @click="bankSubmit">{{ $t('button.sure') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./merchantList.js"/>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/common.scss";
</style>
<style lang="scss" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
  font-size: 12px;
}

.sup-merchant-item {
  margin-right: 20px;
}
</style>
