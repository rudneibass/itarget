import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { WebSocketInterface } from "@src/notification/domain/interfaces/websocket.interface";
import { WebSocketServer, WebSocket } from "ws";

@Injectable()
export class WebSocketAdapter implements WebSocketInterface {
  private wss: WebSocketServer;
  private clients: Map<string, WebSocket> = new Map();

  constructor(private configService: ConfigService) {
    this.wss = new WebSocketServer({ port: this.configService.get<number>('WEBSOCKET_PORT', 3001) });

    this.wss.on("connection", (socket: WebSocket, req) => {
      const clientId = req.headers["sec-websocket-key"]?.toString() || "";
      if (clientId) {
        this.clients.set(clientId, socket);

        socket.on("close", () => {
          this.clients.delete(clientId);
        });
      }
    });
  }

  async connect(clientId: string): Promise<void> {
    console.log(`Cliente ${clientId} conectado`);
  }

  async disconnect(clientId: string): Promise<void> {
    const client = this.clients.get(clientId);
    if (client) {
      client.close();
      this.clients.delete(clientId);
    }
  }

  async sendMessage(clientId: string, message: string): Promise<void> {
    const client = this.clients.get(clientId);
    if (client && client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  }

  async broadcast(message: string): Promise<void> {
    for (const [, client] of this.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  }
}
