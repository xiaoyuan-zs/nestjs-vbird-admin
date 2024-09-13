import { Controller, Post, Body, Query, Get } from '@nestjs/common'
import { LoginService } from './login.service'
import { CreateLoginDto } from './dto/create-login.dto'
import { Allow } from 'src/decorators/allow.decorator'

@Controller()
export class LoginController {
	constructor(private readonly loginService: LoginService) {}

	@Allow()
	@Post('login')
	login(@Body() createLoginDto: CreateLoginDto) {
		return this.loginService.login(createLoginDto)
	}

	@Allow()
	@Get('refreshToken')
	refreshToken(@Query('refreshToken') refreshToken: string) {
		return this.loginService.refreshToken(refreshToken)
	}
}
