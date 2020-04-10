import {mapGetters} from 'vuex'
import {getRoleMenuTree, saveRoleMenus} from '@/api/system/role'

export default {
  name: 'system-role-edit',
  data() {
    return {
      isLoadData: false,
      rules: {},
      roleId: 0,
      roleInfo: {},
      loading: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      defaultMenuIds: [],
      menuTree: []
    }
  },
  created() {
    const roleId = this.$route.params.id
    if (roleId) {
      this.roleId = roleId
      this.getMenuTree(this.roleId)
    }
  },
  methods: {
    getMenuTree(roleId) {
      this.isLoadData = true
      getRoleMenuTree(roleId).then(res => {
        const data = res.data
        this.roleInfo = data
        this.menuTree = data.menu_tree
        this.defaultMenuIds = data.permission_menu_ids
      })
    },
    isActive(route) {
      return route.path === this.$route.path || route.name === this.$route.name
    },
    closeSelectedTag() {
      const route = this.$route
      const view = {
        name: route.name,
        path: route.path
      }
      this.$store.dispatch('delVisitedView', view).then((views) => {
        if (this.isActive(view)) {
          this.$router.push('/system/role')
        }
      })
    },
    handleCheck(data, checkedObj) {
      const keys = checkedObj.checkedKeys
      const checked = keys.indexOf(data.id) > -1
      let currentNode = this.$refs.tree.getNode(data.id)
      this.checkChildNodes(currentNode, checked)
    },
    handleCheckChange(data, checked, indeterminate) {
      //由于该方法会冒泡，因此子节点的选中逻辑不能在该方法中处理

      //处理父节点
      const parentId = data.parent_id
      if (parentId) {
        //将父节点选中或取消
        if (checked) {
          this.$refs.tree.setChecked(parentId, true)
        } else {
          //如果没有同辈节点选中，则将父节点取消选中
          let parentNode = this.$refs.tree.getNode(parentId)
          let childNodes = parentNode.childNodes
          let existsChildChecked = false
          for (let i = 0; i < childNodes.length; i++) {
            if (childNodes[i].checked) {
              existsChildChecked = true
              break
            }
          }
          if (!existsChildChecked) {
            this.$refs.tree.setChecked(parentId, false)
          }
        }
      }
    },
    checkChildNodes(node, checked) {
      //递归处理子节点的选中逻辑
      if (!node.isLeaf) {
        let childNodes = node.childNodes
        for (let i = 0; i < childNodes.length; i++) {
          if (childNodes[i].checked != checked) {
            this.$refs.tree.setChecked(childNodes[i], checked)
          }
          this.checkChildNodes(childNodes[i], checked)
        }
      }
    },
    submitRole() {
      let checkedMenus = []
      let checkedNodes = this.$refs.tree.getCheckedNodes()
      checkedNodes.forEach((node, number) => {
        checkedMenus.push({menu_id: node.id, read_only: node.read_only})
      })

      let data = {
        id: this.roleId,
        role_menus: checkedMenus
      }
      saveRoleMenus(data).then(res => {
        this.$message({
          message: '设置成功',
          type: 'success',
        });
        this.closeSelectedTag()

      })
    }
  }
}
