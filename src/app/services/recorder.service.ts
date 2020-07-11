import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  private subject = new Subject();
  private baseUrl = 'https://middleware-mask-api.azurewebsites.net/api/';
  constructor(private httpClient: HttpClient) {}

  sendImageToBacked(image) {
    return this.httpClient.post(`${this.baseUrl}Main/start`, { image: image });

    /*setTimeout(() => {
      this.subject.next('sending image to back..........');
    }, 2000);
    return this.subject;*/
  }
}
