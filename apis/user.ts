/*
 * 版权所有(c) Trih(HUA Haohui) 2025 - 2025
 * Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
 */

import { use$Get } from '~/composables/httpCore'

export const Login = async (
	mobile: string,
	password: string
) =>
	use$Post(
		'/user/login-mobile-pass',
		JSON.stringify({
			mobile: mobile,
			password: password
		})
	)

export const GetUserInfo = async (uid: number) =>
	use$Get(`/user/${uid}`)

export const SendCode = async (mobile: string) => {
	return use$Post(
		'/user/verify-code',
		JSON.stringify({
			mobile: mobile
		})
	)
}

export const Register = async (
	name: string,
	mobile: string,
	password: string,
	sms: string,
	czj_code: string | null
) =>
	use$Post('/user/register', {
		user_name: name,
		password: password,
		mobile: mobile,
		verifyCode: sms,
		czj_code: czj_code
	})

export const GetUserRelation = async () =>
	use$Get('/user/relation')

export const EditUserInfo = async (
	nick_name: string,
	signature: string,
	avatar: string
) =>
	use$Post('/user/change-info', {
		nick_name,
		signature,
		avatar
	})
