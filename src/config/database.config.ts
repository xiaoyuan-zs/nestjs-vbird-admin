import { registerAs } from '@nestjs/config'

export default registerAs('database', () => ({
	type: 'mysql',
	host: 'localhost',
	port: 3306,
	username: 'root',
	password: '123456',
	database: 'nestjs_vbird_admin',
	retryAttempts: 10, // 重试次数
	retryDelay: 500, // 重试时间
	autoLoadEntities: true, // 自动加载 entity
	// entities: [__dirname + '/**/*.entity{.ts,.js}'], // 会加载当前目录及其子目录下的所有实体文件
	// 设置 synchronize: true 自动同步不应在生产中使用 - 否则你可能会丢失生产数据。
	synchronize: true
}))
