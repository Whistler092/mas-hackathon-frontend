import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  public data;

  public createConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://middleware-mask-api.azurewebsites.net/mainHub')
      .configureLogging(signalR.LogLevel.Information)
      .build();
  }

  public async startConnection() {
    try {
      await this.hubConnection.start();
      console.log('conected........');
    } catch (err) {
      console.error(err);
      setTimeout(() => {
        this.startConnection();
      }, 5000);
    }
  }

  public addConnectionListeners(callBack) {
    this.hubConnection.on('BroadcastData', (data) => {
      this.data = data;
      callBack(this.data);
      console.log('received data');
    });

    this.hubConnection.onclose(async () => {
      await this.startConnection();
      console.log('reconected......');
    });
  }
}
