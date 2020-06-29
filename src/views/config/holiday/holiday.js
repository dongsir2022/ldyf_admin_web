import { createHoliday, getHolidayDataByMonth, removeHoliday } from '@/api/config/holidayApi'
import moment from 'moment'
// import fa from 'element-ui/src/locale/lang/fa'

export default {
  name: 'holidayIndex',
  data() {
    return {
      loading: false,
      myDate: new Date(),
      holidayMap: {},
      addHolidayVisible: false,
      submitLoading: false,
      holidayForm: {},
      rules: {
        holiday_date: [
          { required: true, message: '请输入节日日期', trigger: 'blur' }
        ],
        holiday_name: [
          { required: true, message: '请输入节日名称', trigger: 'blur' }
        ]
      },
      removeLoading: false
    }
  },
  watch: {
    myDate(newValue, oldValue) {
      const newMouth = moment(newValue).format('YYYY-MM')
      const oldMouth = moment(oldValue).format('YYYY-MM')
      if (newMouth !== oldMouth) {
        this.fetchData(newMouth)
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData(currentMount) {
      if (currentMount === undefined || currentMount === '') {
        currentMount = moment(this.myDate).format('YYYY-MM')
      }
      this.loading = true
      getHolidayDataByMonth(currentMount).then(res => {
        this.holidayMap = {}
        res.data.forEach((holidayInfo) => {
          this.holidayMap[holidayInfo.holiday_date] = holidayInfo
        })
        this.loading = false
      })
    },
    addHoliday(day) {
      this.holidayForm = {
        holiday_date: [day, day]
      }
      this.addHolidayVisible = true
    },
    close() {
      this.addHolidayVisible = false
      this.submitLoading = false
      this.$refs.holidayForm.resetFields()
    },
    submitHoliday() {
      this.$refs.holidayForm.validate(valid => {
        if (valid) {
          const data = {
            holiday_start_date: this.holidayForm.holiday_date[0],
            holiday_end_date: this.holidayForm.holiday_date[1],
            holiday_name: this.holidayForm.holiday_name
          }
          this.submitLoading = true
          createHoliday(data).then(res => {
            this.$message({
              message: this.$t('alert.optionSuccess'),
              type: 'success'
            })
            this.fetchData()
            this.close()
          })
        }
      })
    },
    removeHoliday(data) {
      removeHoliday(data.id).then(res => {
        this.$message({
          message: this.$t('alert.optionSuccess'),
          type: 'success'
        })
        this.fetchData()
      })
    }
  }
}
