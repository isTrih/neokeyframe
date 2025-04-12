/*
 * 版权所有(c) Trih(HUA Haohui) 2025 - 2025
 * Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
 */

// 1: 色情, 2: 骚扰, 3: 广告, 4: 政治, 5: 引战, 6: 辱骂, 7: 其他
export const doReport = (
	type: number,
	object_type: number,
	object_id: number,
	owner_id: number
) =>
	use$Post('/report/new-report', {
		type: type,
		object_type: object_type,
		object_id: object_id,
		owner_id: owner_id
	})
