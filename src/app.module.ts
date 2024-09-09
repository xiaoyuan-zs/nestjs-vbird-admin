import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LoginModule } from './login/login.module'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'

@Module({
	controllers: [AppController],
	providers: [AppService],
	imports: [
		LoginModule,
		// 将ConfigModule导入根 AppModule 并使用 .forRoot() 静态方法控制其行为
		// 将从默认位置（项目根目录）加载和解析 .env 文件
		ConfigModule.forRoot(),
		UserModule
	]
})
export class AppModule {}
