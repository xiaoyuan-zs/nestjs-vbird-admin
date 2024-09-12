import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { Result } from 'src/common/result/result'

@Injectable()
export class UserService {
	constructor(
		// 使用 @InjectRepository() 装饰器将 UserRepository 注入到 UserService 中， 相当于Java中的 Mapper
		@InjectRepository(User)
		private readonly userRepository: Repository<User>
	) {}

	create(createUserDto: CreateUserDto) {
		this.userRepository.save(createUserDto)
		return Result.success()
	}

	findAll() {
		return `This action returns all user`
	}

	findOne(id: number) {
		return `This action returns a #${id} user`
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`
	}

	remove(id: number) {
		return `This action removes a #${id} user`
	}
}
