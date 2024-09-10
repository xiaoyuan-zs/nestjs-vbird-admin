import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import {} from 'express'

/**
 * 全局异常过滤器
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		ctx.getResponse<Response>()
	}
}
