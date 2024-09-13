import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { map, Observable } from 'rxjs'

/**
 * 拦截器，处理请求结果，将请求结果包装成 Result 类型返回 （需要在 main.ts 中注册）
 */
@Injectable()
export class ResultInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		// 使用拦截器处理请求结果，将请求结果包装成 Result 类型返回
		return next.handle().pipe(map((data) => data))
	}
}
