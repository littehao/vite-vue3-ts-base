<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item label="用户名" prop="pass">
      <el-input v-model="ruleForm.mobile" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item label="密码" prop="checkPass">
      <el-input
        v-model="ruleForm.password"
        type="password"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">Submit</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import LoginApi from '@/api/loginApi'

const ruleForm = reactive({
  mobile: '18888888883',
  password: '111111'
})

const submitForm = () => {
  let data = {
    ...ruleForm
  }
  LoginApi.login(data).then((res) => {
    console.log(res)
    ElMessage({
      message: '登录成功',
      type: 'success'
    })
  }).catch(err => {
    console.log(err)
    ElMessage({
      message: '请求失败',
      type: 'error'
    })
  })
}
</script>
