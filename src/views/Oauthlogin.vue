<template>
  <div style="color: white">
    登录中。。。。
  </div>
</template>

<script>
  export default {
    name: "oauthlogin",
    created() {
      console.log(this.$route);
      this.$store.dispatch('QQLoginAuthSuccess', {
        code: this.$route.query.code,
        state: this.$route.query.state
      }).then(() => {
        this.$router.push('/')
      })
    }
  }
</script>

<style scoped>

</style>
