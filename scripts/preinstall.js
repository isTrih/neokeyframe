// 如果安装依赖使用的包管理工具不是 pnpm，则在终端控制台中打印警告，然后退出本次执行的命令
if (!/pnpm/.test(process.env.npm_execpath || '')) {
    console.warn(
        `\u001b[33m 本项目中必须使用 pnpm 作为包管理工具 ` +
        `请使用 'npm i -g pnpm' 或 'npm i pnpm' 安装 pnpm \u001b[39m\n`,
    )
    process.exit(1)
}