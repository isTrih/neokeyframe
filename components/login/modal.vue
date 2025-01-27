<script setup lang="ts">
import type { FormInst, FormItemRule } from 'naive-ui'
import { SendCode } from '~/apis/user'

// 关闭弹窗事件
const emit = defineEmits(['closeLogin'])
// 发送消息
const message = useMessage()

// 当前表单
const currentLogin = ref('login')
//切换表单
const loginTitle = computed(() => [
	{ label: t('ui.login'), key: 'login' },
	{ label: t('ui.register'), key: 'register' }
])

function regCheck(checked: boolean) {
	regFormValue.value.agreement = checked
}

function logCheck(checked: boolean) {
	logFormValue.value.agreement = checked
}

// region 注册
function sendSms() {
	SendCode('18655311015')
}

// 表单对象
const regFormRef = ref<FormInst | null>(null)
// 表单内容
const regFormValue = ref({
	name: '',
	sms: '',
	phone: '',
	password: '',
	rePassword: '',
	agreement: false
})
// 表单验证
const regRules = {
	name: {
		required: true,
		message: '用户名不超过12个字',
		trigger: 'blur',
		validator: (rule: FormItemRule, value: string) => {
			console.log(rule)
			return !(value.length > 12 || value.length <= 0)
		}
	},
	sms: {
		required: true,
		message: '请输入6位验证码',
		trigger: 'blur',
		validator: (rule: FormItemRule, value: string) => {
			console.log(rule)
			return value.length === 6
		}
	},
	rePassword: {
		required: true,
		trigger: 'blur',
		message: '两次密码输入不一致',
		validator: (rule: FormItemRule, value: string) => {
			console.log(rule)
			return value === regFormValue.value.password
		}
	},
	password: {
		required: true,
		message: '请输入密码'
	},
	phone: {
		required: true,
		trigger: 'blur',
		message: '请输入正确的手机号',
		validator: (rule: FormItemRule, value: string) => {
			console.log(rule, value)
			return /^1[3456789]\d{9}$/.test(value)
		}
	},
	agreement: {
		required: true,
		trigger: 'change',
		message: '请阅读并同意协议',
		validator: (rule: FormItemRule, value: boolean) => {
			console.log(rule, value)
			return value
		}
	}
}
// endregion
// region 登录
// 登录表单
const logFormRef = ref<FormInst | null>(null)
// 登录表单内容
const logFormValue = ref({
	phone: '',
	password: '',
	agreement: false
})
// 登录表单验证
const logRules = {
	password: {
		required: true,
		trigger: 'blur',
		message: '请输入6-20位密码',
		validator: (rule: FormItemRule, value: string) => {
			console.log(rule, value)
			return !(value.length < 6 || value.length > 20)
		}
	},
	phone: {
		required: true,
		trigger: 'blur',
		message: '请输入账号',
		validator: (rule: FormItemRule, value: string) => {
			console.log(rule, value)
			return /^1[3456789]\d{9}$/.test(value)
		}
	},
	agreement: {
		required: true,
		trigger: 'change',
		message: '请阅读并同意协议',
		validator: (rule: FormItemRule, value: boolean) => {
			console.log(rule, value)
			return value
		}
	}
}

const login = (e: MouseEvent) => {
	e.preventDefault()
	logFormRef.value?.validate(errors => {
		if (errors) {
			message.error('请检查填写要求', { duration: 1800 })
		} else {
			message.loading('登录中')
			const useUser = useUserStore()
			useUser
				.UserLogin({
					mobile: logFormValue.value.phone,
					password: logFormValue.value.password
				})
				.then(res => {
          console.log('res', res)
					if (res.code === 0) {
						message.destroyAll()
						message.success('登录成功')
						emit('closeLogin')
					} else {
						message.destroyAll()
						message.error(res.msg)
					}
				})
		}
	})
}
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
              <n-input
                  v-model:value="logFormValue.password" type="password" show-password-on="mousedown"
                  autocomplete="current-password" maxlength="20" round placeholder="请输入密码"/>
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
              <n-button class="mt-2" type="primary" round block @click="login"> 登录</n-button>
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
              <n-input
                  v-model:value="regFormValue.password" type="password" maxlength="20"
                  show-password-on="mousedown" round autocomplete="new-password"

                  placeholder="请输入密码"/>
            </n-form-item>
            <n-form-item path="rePassword">
              <n-input
                  v-model:value="regFormValue.rePassword" type="password" maxlength="20"
                  autocomplete="new-password" show-password-on="mousedown" round
                  placeholder="请确认密码"/>
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
              <n-button class="mt-2" type="primary" round block>{{$t('ui.register')}}</n-button>
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
