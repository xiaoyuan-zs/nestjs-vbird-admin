import { Module } from '@nestjs/common'
import { LoginService } from './login.service'
import { LoginController } from './login.controller'
import { UserModule } from 'src/user/user.module'

@Module({
	imports: [
		// 这里需要使用 UserModule 中的存储库 或则 Service 模块，所以需要导入 UserModule， 并且在 UserModule 中导导出对应的 模块
		UserModule
	],
	controllers: [LoginController],
	providers: [LoginService]
})
export class LoginModule {}
