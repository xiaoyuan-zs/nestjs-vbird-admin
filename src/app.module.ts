import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
// 加载参数配置模块
import { ConfigModule, ConfigService } from '@nestjs/config'
// 数据库配置
import databaseConfig from '../config/configuration'

import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'

import { LoginModule } from './login/login.module'
import { UserModule } from './user/user.module'

import { AuthGuard } from 'src/auth/auth.guard'
import { APP_GUARD } from '@nestjs/core'
import { RoleModule } from './role/role.module'
import { MenuModule } from './menu/menu.module'
import { PermissionsGuard } from './auth/permission.guard'
import { RolesGuard } from './auth/roles.guard'

@Module({
	controllers: [AppController],
	providers: [
		AppService,
		// 全局注册 AuthGuard
		{
			provide: APP_GUARD,
			useClass: AuthGuard
		},
		{
			provide: APP_GUARD,
			useClass: PermissionsGuard
		},
		{
			provide: APP_GUARD,
			useClass: RolesGuard
		}
	],
	imports: [
		// 将ConfigModule导入根 AppModule 并使用 .forRoot() 静态方法控制其行为
		// 将从默认位置（项目根目录）加载和解析 .env 文件
		ConfigModule.forRoot({
			isGlobal: true, // 全局注册，其他模块不需要在Module中导入也可以使用该配置
			load: [databaseConfig],
			cache: true // 缓存配置，默认 false
		}),
		// 初始化数据库
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			// 注入 ConfigService 并使用其 get() 方法获取配置
			inject: [ConfigService],
			useFactory: (config: ConfigService) =>
				({
					...config.get('db.mysql')
				}) as TypeOrmModuleOptions
		}),
		LoginModule,
		UserModule,
		RoleModule,
		MenuModule
	]
})
export class AppModule {}
