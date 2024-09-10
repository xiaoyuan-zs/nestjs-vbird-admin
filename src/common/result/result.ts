import { HttpStatus } from '@nestjs/common'

/**
 * 统一结果返回类
 */
export class Result {
	code: number = 200
	message: string
	data: any

	constructor(code: number = 200, message: string, data?: any) {
		this.code = code
		this.message = message
		this.data = data
	}

	static success(data: any): Result {
		return new Result(HttpStatus.OK, 'ok', data)
	}

	static error(code: number = HttpStatus.INTERNAL_SERVER_ERROR, message: string = 'fail'): Result {
		return new Result(code, message)
	}
}
