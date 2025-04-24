<template>
  <div class="panel-account">
    <el-form :model="account" :rules="accountRules" label-width="60px" size="large" status-icon ref="formRef">
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <!-- SSR 阶段渲染基础输入框 -->
        <template v-if="!isMounted">
          <el-input v-model="account.password" placeholder="请输入密码" />
        </template>
        <ClientOnly>
          <el-input v-model="account.password" show-password placeholder="请输入密码" />
        </ClientOnly>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { ElForm, FormRules } from 'element-plus'
import type { IAccount } from '@/types'
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
import useLoginStore from '@/store/login/login'
import { localCache } from '@/utils/cache'

const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'

const account = reactive<IAccount>({
  name: localCache?.getCache(CACHE_NAME) ?? '',
  password: localCache?.getCache(CACHE_PASSWORD) ?? ''
})

const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入帐号信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{5,20}$/,
      message: '必须是5~20数字或字母组成~',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或字母组成',
      trigger: 'blur'
    }
  ]
}

const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction (isRemPwd: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      const name = account.name
      const password = account.password
      loginStore.loginAccountAction({ name, password }).then(() => {
        if (isRemPwd) {
          localCache?.setCache(CACHE_NAME, name)
          localCache?.setCache(CACHE_PASSWORD, password)
        } else {
          localCache?.removeCache(CACHE_NAME)
          localCache?.removeCache(CACHE_PASSWORD)
        }
      })
    } else {
      ElMessage.error('请您输入正确的格式后再操作~~.')
    }
  })
}

const isMounted = ref(false)
onMounted(() => {
  isMounted.value = true
})

defineExpose({
  loginAction
})
</script>

<style lang="scss" scoped></style>
