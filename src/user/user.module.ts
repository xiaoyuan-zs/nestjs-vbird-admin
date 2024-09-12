import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { ConfigModule } from '@nestjs/config'

@Module({
	imports: [
		// 使用 forFeature() 方法来定义在当前作用域内注册了哪些存储库
		// 而且会通过 autoLoadEntities：true 设置，自动加载到指定数据库中
		TypeOrmModule.forFeature([User]),
		// 在 service 中需要使用，所以要导入ConfigModule
		ConfigModule
	],
	controllers: [UserController],
	providers: [UserService],
	// 若其他模块需要使用 User 实体，需要导出TypeOrmModule存储库
	exports: [TypeOrmModule, UserService]
})
export class UserModule {}
