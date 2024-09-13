import { SetMetadata } from '@nestjs/common'

export const IS_PUBLIC_KEY = 'isPublic'

// 自定义装饰器，用于设置路由是否允许公开访问
export const Allow = () => SetMetadata(IS_PUBLIC_KEY, true)
