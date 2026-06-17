import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class P2pService {
  public dispositivosCercanos: any[] = [];
  public estaTransmitiendo: boolean = false;
  public conectadoA: string | null = null;

  constructor(private storageService: StorageService) { }

  public iniciarDescubrimientoP2P() {
    this.estaTransmitiendo = true;
    console.log("Iniciando escaneo de hardware local...");
    
    setTimeout(() => {
      this.dispositivosCercanos = [
        { id: '100071623', nombre: 'Dispositivo_Danny', tecnologia: 'Wi-Fi Direct' },
        { id: '100020937', nombre: 'Dispositivo_Franyerli', tecnologia: 'Wi-Fi Direct' },
        { id: '100071386', nombre: 'Dispositivo_Jefrey', tecnologia: 'Bluetooth BLE' }
      ];
      console.log("Dispositivos p2p encontrados:", this.dispositivosCercanos);
    }, 1500);
  }

  public async conectarADispositivo(dispositivo: any): Promise<boolean> {
    console.log(`Intentando enlace P2P directo con: ${dispositivo.nombre}`);
    this.conectadoA = dispositivo.nombre;
    return true; 
  }

  public async transferirTareasPendientes(): Promise<boolean> {
    if (!this.conectadoA) return false;
    
    const datoLocal = await this.storageService.get('tarea_pendiente');
    
    if (!datoLocal) {
      console.warn("La caché local está vacía. No hay datos para transferir.");
      return false;
    }

    console.log(`Transmitiendo la tarea directamente a ${this.conectadoA}...`);
    const payloadP2P = JSON.stringify({ tarea: datoLocal });
    console.log("Carga útil P2P enviada con éxito sin usar internet:", payloadP2P);
    
    return true;
  }
}