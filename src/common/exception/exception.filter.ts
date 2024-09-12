import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { Response, Request } from 'express'

/**
 * 全局异常过滤器, 捕获所有 HttpException 异常, 并返回统一的错误响应 （需要在 main.ts 中注册）
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		// 获取异常上下文
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()
		const request = ctx.getRequest<Request>()
		const status = exception.getStatus()
		const message = typeof exception.getResponse() === 'string' ? exception.getResponse() : exception.getResponse()['message']

		// 全局异常处理返回结果
		return response.status(status).json({
			code: status,
			message: message,
			timestamp: new Date().toISOString(),
			path: request.url
		})
	}
}
