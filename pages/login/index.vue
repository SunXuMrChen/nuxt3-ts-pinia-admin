<template>
  <div class="login">
    <login-panel />
  </div>
</template>
<script lang="ts" setup>
import LoginPanel from '~/pages/login/c-cpn/login-panel.vue'
definePageMeta({
  layout: "empty-layout",
});
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background: url('../../assets/images/login-bg.svg');
}
</style>
