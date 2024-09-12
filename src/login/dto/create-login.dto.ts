import { IsNotEmpty } from 'class-validator'

export class CreateLoginDto {
	@IsNotEmpty({ message: 'username cannot be empty' })
	username: string

	@IsNotEmpty({ message: 'password cannot be empty' })
	password: string
}
