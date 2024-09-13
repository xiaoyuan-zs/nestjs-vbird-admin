import { LoginService } from 'src/login/login.service'
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { IS_PUBLIC_KEY } from 'src/decorators/allow.decorator'

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly jwtService: JwtService,
		private readonly config: ConfigService,
		private readonly reflector: Reflector,
		private readonly loginService: LoginService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		// 使用反射获取是否允许匿名访问
		const isAllow = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()])
		if (isAllow) return true
		// 获取上下文
		const request = context.switchToHttp().getRequest<Request>()
		// 获取token
		const token = this.extractTokenFormHeader(request)
		if (!token) {
			throw new UnauthorizedException('token is not found')
		}
		this.loginService.verifyToken(token)
		return true
	}

	/**
	 * 解析token
	 * @param request
	 * @returns
	 */
	private extractTokenFormHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? []
		return type === 'Bearer' ? token : undefined
	}
}
