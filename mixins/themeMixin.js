export default {
  mounted () {
    this.$store.commit('user/SET_THEME', window.localStorage.getItem('theme') || 'light')
    document.body.id = this.$store.state.user.theme
  },
  methods: {
    toggleTheme () {
      const isLight = document.body.id === 'light'
      this.$store.commit('user/SET_THEME', isLight ? 'dark' : 'light')
      document.body.id = this.$store.state.user.theme
    }
  }
}