export const Login = async function (mobile: string, password: string) {
    return use$Post('/user/login-mobile-pass', JSON.stringify({
        "mobile": mobile,
        "password": password
    }));
}


export const SendCode = async (mobile: string) => {
    return use$Post('/user/verify-code', JSON.stringify({
        mobile: mobile
    }))
}


export const Register = async function (name: string, mobile: string, password: string, sms: string) {
    return use$Post('/user/register', JSON.stringify({
        "user_name": name,
        "password": password,
        "mobile": mobile,
        "verifyCode": sms
    }))
}