import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  public data;

  public startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://64.225.8.39/mainHub')
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('conection started.....'))
      .catch((err) => console.log('Error while starting conection: ', err));
  }

  public addTransferChartDatalistener(callBack) {
    this.hubConnection.on('BroadcastData', (data) => {
      this.data = data;
      callBack(this.data);
      console.log('received data');
    });
  }
}
