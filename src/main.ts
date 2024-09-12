import { NestExpressApplication } from '@nestjs/platform-express'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ResultInterceptor } from './common/result/result.interceptor'
import { HttpExceptionFilter } from './common/exception/exception.filter'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)

	// 获取配置服务
	const configService = app.get(ConfigService)
	const port = configService.get<string>('app.port')

	app.useGlobalFilters(new HttpExceptionFilter())
	app.useGlobalInterceptors(new ResultInterceptor())
	// 使用nestjs自带的验证管道 （校验 DTO 传递的参数）
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			// 自动删除验证类中没有任何装饰器的属性
			whitelist: true,
			validationError: {
				target: true
			}
		})
	)

	await app.listen(port)
}
bootstrap()
