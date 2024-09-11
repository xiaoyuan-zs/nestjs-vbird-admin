import { Injectable } from '@nestjs/common'
import { CreateLoginDto } from './dto/create-login.dto'
import { UpdateLoginDto } from './dto/update-login.dto'
import { UserService } from 'src/user/user.service'

@Injectable()
export class LoginService {
	constructor(
		// 注入 User Repository
		// @InjectRepository(User)
		// private readonly userRepository: Repository<User>
		// 注入 UserService
		private readonly userService: UserService
	) {}

	create(createLoginDto: CreateLoginDto) {
		return 'This action adds a new login'
	}

	findAll() {
		return `This action returns all login`
	}

	findOne(id: number) {
		return `This action returns a #${id} login`
	}

	update(id: number, updateLoginDto: UpdateLoginDto) {
		return `This action updates a #${id} login`
	}

	remove(id: number) {
		return `This action removes a #${id} login`
	}
}
