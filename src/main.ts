import { NestExpressApplication } from '@nestjs/platform-express'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ResultInterceptor } from './common/result/result.interceptor'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)

	app.useGlobalInterceptors(new ResultInterceptor())
	await app.listen(8080)
}
bootstrap()
