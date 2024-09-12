import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateUserDto {
	@IsString({ message: 'typeof nickname must be string' })
	nickname: string

	@Length(4, 20, { message: 'username must be between 4 and 20 characters' })
	@IsString({ message: 'typeof username must be string' })
	@IsNotEmpty({ message: 'username cannot be empty' })
	username: string

	@IsString({ message: 'typeof password must be string' })
	@IsNotEmpty({ message: 'password cannot be empty' })
	password: string

	email: string

	avatar: string

	phoneNumber: string
}
