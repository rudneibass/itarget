import { Module } from '@nestjs/common';
import { UserModule } from './account/user.module';
import { AccountModule } from './account/account.module';
@Module({
  imports: [UserModule, AccountModule],
})
export class AppModule {}
