import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { NotificationrModule } from './notification/notification.module';
@Module({
  imports: [AccountModule, NotificationrModule ],
})
export class AppModule {}
