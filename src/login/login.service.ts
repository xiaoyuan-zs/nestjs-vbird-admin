import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { CreateLoginDto } from './dto/create-login.dto'
import { UserService } from 'src/user/user.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class LoginService {
	constructor(
		// 注入 UserService
		private readonly userService: UserService
	) {}

	async login(createLoginDto: CreateLoginDto) {
		const { username, password } = createLoginDto
		const user = await this.userService.findUserByUsername(username)
		if (!user) {
			throw new UnauthorizedException()
		}
		// 对比密码
		const isAuthenticated = await bcrypt.compare(password, user.password)
		if (!isAuthenticated) {
			throw new HttpException('登录失败，密码错误', HttpStatus.UNAUTHORIZED)
		}
		// TODO: Generate a JWT and return it here

		return user
	}
}
