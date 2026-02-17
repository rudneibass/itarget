export interface AmqpInterface {
  connect(): Promise<void>; // agora faz parte do contrato
  assertQueue(queue: string, options?: any): Promise<void>;
  consume(queue: string, onMessage: (msg: any) => Promise<void>): Promise<void>;
  ack(message: any): void;
  sendToQueue(queue: string, content: Buffer, options?: any): Promise<void>;
  close(): Promise<void>;
}