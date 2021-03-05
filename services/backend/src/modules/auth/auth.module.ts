import { Module } from '@nestjs/common';
import { PermissionsModule } from './permissions/permissions.module';

@Module({
  imports: [PermissionsModule],
  exports: [PermissionsModule],
})
export class AuthModule {}
