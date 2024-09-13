import { Module } from '@nestjs/common'
import { LoginService } from './login.service'
import { LoginController } from './login.controller'
import { UserModule } from 'src/user/user.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
	imports: [
		// 这里需要使用 UserModule 中的存储库 或则 Service 模块，所以需要导入 UserModule， 并且在 UserModule 中导导出对应的 模块
		UserModule,
		// 使用 registerAsync 方法注册 JWT 模块
		JwtModule.registerAsync({
			// 必须写在外面才能生效
			global: true,
			imports: [ConfigModule],
			useFactory: async (config: ConfigService) => ({
				secret: config.get('jwt.secretKey'),
				signOptions: {
					expiresIn: config.get('jwt.expiresIn')
				}
			}),
			inject: [ConfigService]
		})
	],
	controllers: [LoginController],
	providers: [LoginService],
	exports: [LoginService]
})
export class LoginModule {}
