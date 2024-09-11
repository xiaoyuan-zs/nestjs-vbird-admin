import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
// 加载参数配置模块
import { ConfigModule, ConfigService } from '@nestjs/config'
// 数据库配置
import databaseConfig from './config/configuration'

import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'

import { LoginModule } from './system/login/login.module'
import { UserModule } from './system/user/user.module'

@Module({
	controllers: [AppController],
	providers: [AppService],
	imports: [
		// 将ConfigModule导入根 AppModule 并使用 .forRoot() 静态方法控制其行为
		// 将从默认位置（项目根目录）加载和解析 .env 文件
		ConfigModule.forRoot({
			isGlobal: true, // 全局注册，其他模块也可以使用该配置
			load: [databaseConfig]
		}),
		// 初始化数据库
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			// 注入 ConfigService 并使用其 get() 方法获取配置
			inject: [ConfigService],
			useFactory: (config: ConfigService) =>
				({
					...config.get('database')
				}) as TypeOrmModuleOptions
		}),
		LoginModule,
		UserModule
	]
})
export class AppModule {}
