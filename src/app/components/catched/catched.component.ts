import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../../services/signal-r.service';

@Component({
  selector: 'app-catched',
  templateUrl: './catched.component.html',
  styleUrls: ['./catched.component.css'],
})
export class CatchedComponent implements OnInit {
  public catched = [1, 2, 3, 4, 5];
  public receivedData = [];
  constructor(private signalrService: SignalRService) {}

  ngOnInit(): void {
    this.initializeConnection();
  }

  async initializeConnection() {
    this.signalrService.createConnection();
    await this.signalrService.startConnection();
    this.signalrService.addConnectionListeners(this.processResponse.bind(this));
  }

  processResponse(receivedData) {
    console.log('received on component');

    this.receivedData.push(receivedData);
  }
}
