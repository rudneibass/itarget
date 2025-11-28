export interface WebSocketInterface {
  connect(clientId: string): Promise<void>;
  disconnect(clientId: string): Promise<void>;
  sendMessage(clientId: string, message: string): Promise<void>;
  broadcast(message: string): Promise<void>;
}
