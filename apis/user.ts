export const Login = async (mobile: string, password: string) =>
	use$Post(
		'/user/login-mobile-pass',
		JSON.stringify({
			mobile: mobile,
			password: password
		})
	)

export const GetUserInfo = async (uid: number) =>
	use$Post(
		'/user/info',
		JSON.stringify({
			user_id: uid
		})
	)

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
	sms: string
) =>
	use$Post(
		'/user/register',
		JSON.stringify({
			user_name: name,
			password: password,
			mobile: mobile,
			verifyCode: sms
		})
	)
