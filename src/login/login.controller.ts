import { Controller, Post, Body } from '@nestjs/common'
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
}
