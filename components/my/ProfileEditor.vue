<script setup lang="ts">
import { ref } from 'vue'
import { VueCropper } from 'vue-cropper'
import 'vue-cropper/dist/index.css'
import {
	type FormInst,
	NButton,
	NCard,
	NDialogProvider,
	NForm,
	NFormItem,
	NInput,
	NModal
} from 'naive-ui'
import { uploadFileBuffer } from '~/composables/upload'

const props = defineProps({
	user: {
		type: Object,
		required: true
	}
})

const emit = defineEmits(['update:user'])

const showModal = ref(false)
const cropModalVisible = ref(false) // 新增裁剪模态控制变量
const cropperAvatar = ref()
const avatarFile = ref<string | ArrayBuffer>()
const eventBus = useEventBus<{
	type: string
	msg: string
}>('msg')
// 修改后的头像点击处理
const triggerFileInput = () => {
	const fileInput = document.createElement('input')
	fileInput.type = 'file'
	fileInput.accept = 'image/*'
	fileInput.onchange = (e: Event) => {
		const file = (e.target as HTMLInputElement).files?.[0]
		if (file) {
			// 创建一个FileReader来读取文件
			const reader = new FileReader()

			reader.readAsDataURL(file)
			reader.onloadend = () => {
				avatarFile.value = reader.result
				cropModalVisible.value = true
			}
		}
	}
	fileInput.click()
}

const formValue = ref({
	user_name: props.user.user_name,
	signature: props.user.signature,
	avatar: props.user.avatar
})
const formRules = {
	user_name: {
		required: true,
		message: '用户名不超过12个字',
		trigger: 'blur',
		pattern: /^.{0,12}$/
	},
	signature: {
		required: false,
		pattern: /^[\s\S]{0,100}$/,
		message: '签名不超过100个字',
		trigger: 'blur'
	}
}
const cropImage = () => {
	cropperAvatar.value.getCropBlob(async (blob: Blob) => {
		const file = new File([blob], 'avatar.jpg', {
			type: 'image/jpeg'
		})
		console.log(file)
		const buffer = await file.arrayBuffer()
		console.log(buffer)
		const uploader = uploadFileBuffer(buffer, 'avatar')
		uploader.onComplete(result => {
			const parsedResult = JSON.parse(result)
			formValue.value.avatar = parsedResult.key
			eventBus.emit({ type: 'success', msg: '上传成功' })
			// 处理上传结果
			cropModalVisible.value = false
		})
		uploader.onError(error => {
			console.log('上传失败', error)
			eventBus.emit({ type: 'error', msg: '上传失败' })
		})
		await uploader.start()
	})
}
const editorFormRef = ref<FormInst | null>(null)

const handleSubmit = (e: MouseEvent) => {
	e.preventDefault()
	editorFormRef.value?.validate(errors => {
		if (errors) {
			eventBus.emit({
				type: 'error',
				msg: '请检查填写要求'
			})
		} else {
			emit('update:user', formValue.value)
			showModal.value = false
		}
	})
}
</script>

<template>
  <n-dialog-provider>
    <n-button class="w-6rem" strong round type="primary" @click="showModal = true">
      {{ t('ui.editProfile') }}
    </n-button>
    <n-modal v-model:show="showModal">
      <n-card class="min-w-220px max-w-380px" title="编辑资料">
        <n-form ref="editorFormRef" :rules="formRules" :model="formValue">
          <n-grid :cols="24">
            <n-form-item-gi :span="12" label="头像">
              <n-avatar
                  round
                  :src="avatarUrl(formValue.avatar)"
                  :size="40"
                  class="cursor-pointer"
                  @click="triggerFileInput"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="用户名" path="user_name">
              <n-input v-model:value="formValue.user_name"/>
            </n-form-item-gi>
          </n-grid>
          <n-form-item label="签名" path="signature">
            <n-input
                v-model:value="formValue.signature"
                type="textarea"
                :autosize="{ minRows: 3 }"
            />
          </n-form-item>
          <n-button block type="primary" @click="handleSubmit">保存</n-button>
        </n-form>
      </n-card>
    </n-modal>
    <n-modal v-model:show="cropModalVisible">
      <n-card style="width: 500px" title="裁剪头像">
        <client-only>

          <VueCropper
              ref="cropperAvatar"
              class="avatar-cropper"
              style="height: 250px"
              :img="avatarFile"
              auto-crop
              :output-type="'jpeg'"
              :outputSize="0.7"
              :maxImgSize="1080"
              :center-box="true"
              :info="false"
              :info-true="true"
              fixed
              @touchmove.prevent></VueCropper>
        </client-only>
        <n-button @click="cropImage">确认裁剪</n-button>
      </n-card>
    </n-modal>
  </n-dialog-provider>
</template>