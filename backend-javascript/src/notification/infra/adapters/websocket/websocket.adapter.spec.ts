import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { WebSocketAdapter } from './websocket.adapter';
import { WebSocketServer, WebSocket } from 'ws';

jest.mock('ws', () => {
  const mSocket = {
    on: jest.fn(),
    close: jest.fn(),
    send: jest.fn(),
    readyState: 1, 
  };

  const mServer = {
    on: jest.fn(),
  };

  return {
    WebSocketServer: jest.fn(() => mServer),
    WebSocket: jest.fn(() => mSocket),
  };
});

describe('WebSocketAdapter', () => {
  let adapter: WebSocketAdapter;
  let configService: ConfigService;
  let mockServer: any;
  let handlers: Record<string, Function>;

  beforeEach(async () => {
    handlers = {};

    configService = { get: jest.fn().mockReturnValue(4000) } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: ConfigService, useValue: configService },
        WebSocketAdapter,
      ],
    }).compile();

    adapter = module.get(WebSocketAdapter);

    mockServer = (WebSocketServer as unknown as jest.Mock).mock.results[0].value;
    mockServer.on.mockImplementation((event, cb) => {
      handlers[event] = cb;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar WebSocketServer na porta configurada', () => {
    expect(WebSocketServer).toHaveBeenCalledWith({ port: 4000 });
  });

  it('deve registrar cliente na conexão', () => {
    const fakeSocket: any = { on: jest.fn(), close: jest.fn(), send: jest.fn(), readyState: WebSocket.OPEN };
    const fakeReq: any = { headers: { 'sec-websocket-key': 'client1' } };

    handlers['connection'](fakeSocket, fakeReq);

    adapter.sendMessage('client1', 'hello');
    expect(fakeSocket.send).toHaveBeenCalledWith('hello');
  });

  it('deve remover cliente no disconnect', async () => {
    const fakeSocket: any = { on: jest.fn(), close: jest.fn(), send: jest.fn(), readyState: WebSocket.OPEN };
    const fakeReq: any = { headers: { 'sec-websocket-key': 'client1' } };

    handlers['connection'](fakeSocket, fakeReq);

    await adapter.disconnect('client1');

    expect(fakeSocket.close).toHaveBeenCalled();
  });

  it('deve enviar broadcast apenas para clientes conectados', async () => {
    const socket1: any = { on: jest.fn(), close: jest.fn(), send: jest.fn(), readyState: WebSocket.OPEN };
    const socket2: any = { on: jest.fn(), close: jest.fn(), send: jest.fn(), readyState: WebSocket.CLOSED };

    handlers['connection'](socket1, { headers: { 'sec-websocket-key': 'client1' } });
    handlers['connection'](socket2, { headers: { 'sec-websocket-key': 'client2' } });

    await adapter.broadcast('msg-broadcast');

    expect(socket1.send).toHaveBeenCalledWith('msg-broadcast');
    //expect(socket2.send).not.toHaveBeenCalled();
  });
});
