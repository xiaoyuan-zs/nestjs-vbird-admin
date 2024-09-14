import { Reflector } from '@nestjs/core'

// 通过Reflector.createDecorator()方法创建权限装饰器
export const hasPermissions = Reflector.createDecorator<string[]>()
