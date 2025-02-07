/*
 * 版权所有(c) Trih(HUA Haohui) 2025 - 2025
 * Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
 */

export function t(args1: any,args2?:any, args3?:any){
    const { $i18n } = useNuxtApp()
    return $i18n.t(args1, args2, args3) as string
}