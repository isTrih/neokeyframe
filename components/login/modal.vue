<script setup lang="ts">
import type {FormInst, FormItemRule} from 'naive-ui';
// import { useMessage } from 'naive-ui';
//
// // const message = useMessage();

// 当前表单
const currentLogin = ref('login');
//切换表单
const loginTitle = computed(() => [
  {label: '登录', key: 'login'},
  {label: '注册', key: 'register'}
]);

function regCheck(checked: boolean) {
  regFormValue.value.agreement = checked;
}

function logCheck(checked: boolean) {
  logFormValue.value.agreement = checked;
}

// region 注册
function sendSms() {
  console.log('发送验证码');
}

// 表单对象
const regFormRef = ref<FormInst | null>(null);
// 表单内容
const regFormValue = ref({
  name: '',
  sms: '',
  phone: '',
  password: '',
  rePassword: '',
  agreement: false
});
// 表单验证
const regRules = {
  password: {
    required: true,
    message: '请输入密码'
  },
  phone: {
    required: true,
    trigger: 'blur',
    message: '请输入正确的手机号',
    validator: (rule: FormItemRule, value: string) => {
      console.log(rule, value);
      return /^1+[3,8]+\d{9}$/.test(value);
    }
  },
  agreement: {
    required: true,
    trigger: 'change',
    message: '请阅读并同意协议',
    validator: (rule: FormItemRule, value: boolean) => {
      console.log(rule, value);
      return value;
    }
  }
};
// endregion
// region 登录
// 登录表单
const logFormRef = ref<FormInst | null>(null);
// 登录表单内容
const logFormValue = ref({
  phone: '',
  password: '',
  agreement: false
});
// 登录表单验证
const logRules = {
  password: {
    required: true,
    message: '请输入密码'
  },
  phone: {
    required: true,
    trigger: 'blur',
    validator: (rule: FormItemRule, value: string) => {
      console.log(rule, value);
      return /^1+[3,8]+\d{9}$/.test(value);
    }
  }
};
// endregion
</script>

<template>
  <div class="w-full h-full">
    <n-grid class="w-full h-full" cols="2" item-responsive>
      <n-gi span="0 580:1">
        <div class="flex justify-center items-center">
          <login-animation/>
        </div>
      </n-gi>
      <n-gi span="2 580:1">
        <div class="w-full">
          <n-menu
              v-model:value="currentLogin"
              class="flex items-center w-full justify-center"
              :options="loginTitle"
              mode="horizontal"
          />
        </div>
        <div v-if="currentLogin === 'login'" class="h-full items-center mt-12">
          <n-form ref="logFormRef" :show-label="false" :label-width="80" :model="logFormValue" :rules="logRules">
            <n-form-item label="账号" path="phone">
              <n-input v-model:value="logFormValue.phone" round placeholder="请输入账号（手机号）"/>
            </n-form-item>
            <n-form-item label="密码" path="password">
              <n-input v-model:value="logFormValue.password" round placeholder="请输入密码"/>
            </n-form-item>
            <n-form-item path="agreement">
              <n-checkbox size="small" @update:checked="logCheck">
                <div class="text-3">
                  我已阅读并同意
                  <nuxt-link
                      style="color:var(--czjB-6);text-decoration: none;"
                      to="/doc/agreement"
                      target="_blank">关键帧平台用户服务协议
                  </nuxt-link>
                  和
                  <nuxt-link
                      style="color:var(--czjB-6);text-decoration: none;"
                      to="/doc/privacy"
                      target="_blank">关键帧隐私政策
                  </nuxt-link>
                  。
                </div>
              </n-checkbox>
            </n-form-item>
            <n-form-item>
              <n-button type="primary" round block> 登录</n-button>
            </n-form-item>
          </n-form>
        </div>
        <div v-else class="">
          <n-form
              ref="regFormRef" require-mark-placement="right-hanging" :show-label="false" :label-width="80"
              :model="regFormValue" :rules="regRules">
            <n-form-item path="name" feedback-class="text-1">
              <n-input v-model:value="regFormValue.name" round placeholder="请输入昵称"/>
            </n-form-item>
            <n-form-item path="phone" feedback-class="text-1">
              <n-input-group>
                <n-input v-model:value="regFormValue.phone" round placeholder="请输入手机号"/>
                <n-button round type="primary" @click="sendSms">发送验证码</n-button>
              </n-input-group>
            </n-form-item>
            <n-form-item path="sms">
              <n-input v-model:value="regFormValue.sms" round placeholder="请输入验证码"/>
            </n-form-item>
            <n-form-item path="password">
              <n-input v-model:value="regFormValue.password" round placeholder="请输入密码"/>
            </n-form-item>
            <n-form-item path="rePassword">
              <n-input v-model:value="regFormValue.rePassword" round placeholder="请确认密码"/>
            </n-form-item>
            <n-form-item path="agreement">
              <n-checkbox size="small" @update:checked="regCheck">
                <div class="text-3">
                  我已阅读并同意
                  <nuxt-link
                      style="color:var(--czjB-6);text-decoration: none;"
                      to="/doc/agreement"
                      target="_blank">关键帧平台用户服务协议
                  </nuxt-link>
                  和
                  <nuxt-link
                      style="color:var(--czjB-6);text-decoration: none;"
                      to="/doc/privacy"
                      target="_blank">关键帧隐私政策
                  </nuxt-link>
                  。
                </div>
              </n-checkbox>
            </n-form-item>
            <n-form-item>
              <n-button type="primary" round block>注册</n-button>
            </n-form-item>
          </n-form>
        </div>
      </n-gi>
    </n-grid>
  </div>
</template>

<style scoped>
.divi {
  --n-color: #6a9ece !important;
}
</style>
