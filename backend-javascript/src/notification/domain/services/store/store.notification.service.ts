import { Injectable } from '@nestjs/common';

@Injectable()
export class StoreNotificationService {
  private readonly statusMap = new Map<string, string>();

  setStatus(messageId: string, status: string) {
    this.statusMap.set(messageId, status);
  }

  getStatus(messageId: string): string | undefined {
    return this.statusMap.get(messageId);
  }
}