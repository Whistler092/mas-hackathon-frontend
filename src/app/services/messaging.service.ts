import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class MessagingService {
    currentMessage = new BehaviorSubject(null);

    constructor(private angularFireMessaging: AngularFireMessaging, public http: HttpClient) {
        this.angularFireMessaging.messaging.subscribe(
            (messaging) => {
                messaging.onMessage = messaging.onMessage.bind(messaging);
                messaging.onTokenRefresh = messaging.onTokenRefresh.bind(messaging);
            }
        );
    }

    requestPermission() {
        this.angularFireMessaging.requestToken.subscribe(
            (token) => {
                this.http.post('https://middleware-mask-api.azurewebsites.net/api/pushnotification/subscribe', { token })
                    .subscribe();
                console.log(token);
            },
            (err) => {
                console.error('Unable to get permission to notify.', err);
            }
        );
    }

    receiveMessage() {
        this.angularFireMessaging.messages.subscribe(
            (payload) => {
                console.log('new message received.', payload);
                this.currentMessage.next(payload);
            });
    }
}
