import { NestExpressApplication } from '@nestjs/platform-express'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ResultInterceptor } from './common/result/result.interceptor'
import { HttpExceptionFilter } from './common/exception/exception.filter'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import helmet from 'helmet'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)

	// 获取配置服务
	const configService = app.get(ConfigService)
	const port = configService.get<string>('app.port')

	// 中间件
	app.use(helmet())

	// 全局配置
	app.useGlobalFilters(new HttpExceptionFilter())
	app.useGlobalInterceptors(new ResultInterceptor())
	// 使用nestjs自带的验证管道 （校验 DTO 传递的参数）
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true
		})
	)

	await app.listen(port)
}
bootstrap()
