import { NestExpressApplication } from '@nestjs/platform-express'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ResultInterceptor } from './common/result/result.interceptor'
import { HttpExceptionFilter } from './common/exception/exception.filter'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)

	// 使用nestjs自带的验证管道 （校验 DTO 传递的参数）
	app.useGlobalPipes(new ValidationPipe())
	app.useGlobalInterceptors(new ResultInterceptor())
	app.useGlobalFilters(new HttpExceptionFilter())
	await app.listen(8080)
}
bootstrap()
