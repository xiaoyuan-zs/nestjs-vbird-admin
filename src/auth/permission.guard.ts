import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { hasPermissions } from 'src/decorators/permission.decorator'

@Injectable()
export class PermissionsGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const requiredPermissions = this.reflector.getAllAndOverride<string[]>(hasPermissions, [context.getHandler(), context.getClass()])

		if (!requiredPermissions) return true
	}
}
