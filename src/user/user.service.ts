import { HttpStatus, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcryptjs'
import { Result } from 'src/common/result/result'

@Injectable()
export class UserService {
	constructor(
		// 使用 @InjectRepository() 装饰器将 UserRepository 注入到 UserService 中， 相当于Java中的 Mapper
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private readonly configService: ConfigService
	) {}

	/**
	 * 创建用户
	 * @param createUserDto
	 */
	async create(createUserDto: CreateUserDto) {
		const username = createUserDto.username
		const user = await this.findUserByUsername(username)
		if (user) {
			return Result.error(HttpStatus.INTERNAL_SERVER_ERROR, '用户名已存在')
		}
		const password = createUserDto.password
		// 生成加密盐
		const salt = await bcrypt.genSalt(10)
		// 进行加密
		const hash = await bcrypt.hash(password, salt)
		createUserDto.password = hash
		this.userRepository.save(createUserDto)
		return Result.success()
	}

	async findAll() {
		return await this.userRepository.find()
	}

	/**
	 * 根据用户名查询用户
	 * @param username 用户名
	 * @returns
	 */
	async findUserByUsername(username: string) {
		return await this.userRepository.findOneBy({ username })
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
