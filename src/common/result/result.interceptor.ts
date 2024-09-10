import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { map, Observable } from 'rxjs'
import { Result } from './result'

@Injectable()
export class ResultInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		// 使用拦截器处理请求结果，将请求结果包装成 Result 类型返回
		return next.handle().pipe(map((data) => Result.success(data)))
	}
}
