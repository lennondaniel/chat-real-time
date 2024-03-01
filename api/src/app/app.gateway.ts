import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { AppService } from "../app.service";
import { Server, Socket } from "socket.io";
import { Chat } from "../chat/chat.entity";

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(private appService: AppService) {}

  @WebSocketServer()
  server: Server;
  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, payload: Chat): Promise<void> {
    await this.appService.createMessage(payload);
    this.server.to(String(payload?.roomId)).emit('recMessage', payload);
  }
  afterInit(server: any): any {
    console.log(server);
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    client.on("joinRoom", (roomId) => {
      client.join(roomId);
    })
  }
}
