import $ from 'jquery'

export function isNotBlank(obj) {
  if (obj === null || obj === undefined || obj === "" || $.trim(obj) === "" || obj === [] || obj === {}) {
    return false;
  } else {
    return true;
  }
}

export function closePage($this, name, params) {
  const view = {
    name: $this.$route.name,
    path: $this.$route.path
  };
  $this.$store.dispatch('tagsView/delView', view).then(({visitedViews}) => {
    if (isNotBlank(name)) {
      $this.$router.push({
        name: name,
        params: params
      })
    }
  })
}
