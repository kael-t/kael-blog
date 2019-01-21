<template>
  <div>这是adminpage</div>
</template>

<script>
export default {
  layout: 'admin',
  async asyncData({ store, route, error }) {
    let id = route.params.id || ''
    const data = await store.dispatch('blogger/GET_BLOGGER_INFO')
    return {
      article: data || {}
    }
  },
  mounted () {
    console.log(this.article)
  },
}
</script>
