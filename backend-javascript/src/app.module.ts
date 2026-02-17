import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { NotificationrModule } from './notification/notification.module';
import { AdminModule } from './admin/admin.module';
@Module({
  imports: [AccountModule, NotificationrModule, AdminModule],
})
export class AppModule {}
