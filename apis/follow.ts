/*
 * 版权所有(c) Trih(HUA Haohui) 2025 - 2025
 * Copyright (c)Trih(HUA Haohui) 2025 - 2025, All Rights Reserved.
 */

import type { https } from '~/types/http'

export const toggleFollow = async (
	id: number
): Promise<
	https & {
		data?: {
			status: string
		}
	}
> => {
	return use$Post('/follow/follow', {
		user_id: id
	})
}
