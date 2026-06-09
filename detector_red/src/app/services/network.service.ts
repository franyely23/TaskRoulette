import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  public isOnline: boolean = true;

  constructor() {
    this.statusCheck();
  }

  async statusCheck() {
    Network.addListener('networkStatusChange', status => {
      console.log("Estado de red:", status.connected);
      this.isOnline = status.connected;
    });

    const status = await Network.getStatus();
    this.isOnline = status.connected;
  }
}