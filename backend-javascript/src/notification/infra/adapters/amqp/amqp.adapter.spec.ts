import * as amqp from 'amqplib';
import { ConfigService } from '@nestjs/config';
import { AmqpAdapter } from './amqp.adapter';

jest.mock('amqplib');

describe('AmqpAdapter', () => {
  let adapter: AmqpAdapter;
  let configService: ConfigService;

  let mockConnection: any;
  let mockChannel: any;

  beforeEach(async () => {
    mockChannel = {
      assertQueue: jest.fn(),
      consume: jest.fn(),
      ack: jest.fn(),
      sendToQueue: jest.fn(),
      close: jest.fn(),
    };

    mockConnection = {
      createChannel: jest.fn().mockResolvedValue(mockChannel),
      close: jest.fn(),
    };

    (amqp.connect as jest.Mock).mockResolvedValue(mockConnection);

    configService = {
      get: jest.fn().mockImplementation((key, def) => def),
    } as unknown as ConfigService;

    adapter = new AmqpAdapter(configService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve conectar ao RabbitMQ e criar um canal', async () => {
    await adapter.connect();

    expect(amqp.connect).toHaveBeenCalledWith({
      hostname: 'rabbitmq',
      port: 5672,
      username: 'admin',
      password: 'admin',
    });
    expect(mockConnection.createChannel).toHaveBeenCalled();
  });

  it('deve declarar uma fila com assertQueue', async () => {
    await adapter.connect();
    await adapter.assertQueue('test-queue', { durable: true });

    expect(mockChannel.assertQueue).toHaveBeenCalledWith('test-queue', { durable: true });
  });

  it('deve consumir mensagens da fila', async () => {
    const fakeMessage = { content: Buffer.from('hello') } as any;
    const onMessage = jest.fn();

    await adapter.connect();
    await adapter.consume('test-queue', onMessage);

    // simula que o RabbitMQ chamou o handler
    const consumeHandler = mockChannel.consume.mock.calls[0][1];
    await consumeHandler(fakeMessage);

    expect(onMessage).toHaveBeenCalledWith(fakeMessage);
  });

  it('deve dar ack em uma mensagem', async () => {
    const fakeMessage = { content: Buffer.from('hello') } as any;
    await adapter.connect();
    adapter.ack(fakeMessage);

    expect(mockChannel.ack).toHaveBeenCalledWith(fakeMessage);
  });

  it('deve enviar mensagem para fila', async () => {
    const fakeContent = Buffer.from('test');
    await adapter.connect();
    await adapter.sendToQueue('test-queue', fakeContent);

    expect(mockChannel.sendToQueue).toHaveBeenCalledWith('test-queue', fakeContent, undefined);
  });

  it('deve fechar canal e conexão', async () => {
    await adapter.connect();
    await adapter.close();

    expect(mockChannel.close).toHaveBeenCalled();
    expect(mockConnection.close).toHaveBeenCalled();
  });
});
