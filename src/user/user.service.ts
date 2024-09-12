import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
	constructor(
		// 使用 @InjectRepository() 装饰器将 UserRepository 注入到 UserService 中， 相当于Java中的 Mapper
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private readonly configService: ConfigService
	) {}

	async create(createUserDto: CreateUserDto) {
		const password = createUserDto.password
		// 生成加密盐
		const salt = await bcrypt.genSalt()
		// 进行加密
		const hash = await bcrypt.hash(password, salt)
		createUserDto.password = hash
		this.userRepository.save(createUserDto)
	}

	findAll() {
		return this.userRepository.find()
	}

	async findUserByUsername(username: string) {
		return this.userRepository.findOne({
			where: {
				username: username
			}
		})
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
