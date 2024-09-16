import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { CreateLoginDto } from './dto/create-login.dto'
import { UserService } from 'src/user/user.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { ConfigService } from '@nestjs/config'
import { CreateTokenDto } from './dto/create-token.dto'
import { Result } from 'src/common/result/result'

@Injectable()
export class LoginService {
	constructor(
		// 注入 UserService
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	async login(createLoginDto: CreateLoginDto) {
		const { username, password } = createLoginDto
		const user = await this.userService.findUserByUsername(username)
		if (!user) {
			return Result.error(HttpStatus.UNAUTHORIZED, '用户不存在，请重新登录')
		}
		// 对比密码
		const isAuthenticated = await bcrypt.compare(password, user.password)
		if (!isAuthenticated) {
			return Result.error(HttpStatus.UNAUTHORIZED, '登录失败，密码错误')
		}
		const data = this.getToken({ id: user.userId + '' })
		return Result.success(data)
	}

	refreshToken(refreshToken: string) {
		// TODO后续加入 redis 进行验证
		try {
			const id = this.jwtService.verify<{ id: string }>(refreshToken)?.id
			return Result.success(this.getToken({ id }))
		} catch (error) {
			throw new UnauthorizedException(error.message)
		}
	}

	/**
	 * 生成token
	 * @param payload
	 * @returns
	 */
	getToken(payload: { id: string }): CreateTokenDto {
		const accessToken = `Bearer ${this.jwtService.sign(payload)}`
		const refreshToken = this.jwtService.sign(payload, {
			expiresIn: this.configService.get('jwt.refreshIn')
		})

		return { accessToken, refreshToken }
	}

	/**
	 * 校验token
	 * @param token
	 * @returns
	 */
	verifyToken(token: string): any {
		try {
			return this.jwtService.verify<{ id: string }>(token.replace('Bearer ', ''))?.id
		} catch (error) {
			throw new UnauthorizedException(error.message)
		}
	}
}
