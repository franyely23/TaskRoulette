import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../services/storage.service';
import { NetworkService } from '../services/network.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class Tab1Page {
  public miTarea: string = '';
  public tareaGuardada: string = '';

  constructor(
    private storageService: StorageService,
    private networkService: NetworkService
  ) {
    this.cargarDatosOffline();
    this.escucharConexion();
  }

  async cargarDatosOffline() {
    setTimeout(async () => {
      const valor = await this.storageService.get('tarea_pendiente');
      if (valor) {
        this.tareaGuardada = valor;
      }
    }, 1000);
  }

  async guardarOffline() {
    if (!this.miTarea.trim()) return;

    if (!this.networkService.isOnline) {
      await this.storageService.set('tarea_pendiente', this.miTarea);
      this.tareaGuardada = `[Pendiente por Sincronizar] ${this.miTarea}`;
      console.log('Modo Offline activo: Guardado en el almacenamiento local temporal.');
    } else {
      this.tareaGuardada = `[Enviado al Servidor] ${this.miTarea}`;
      console.log('Modo Online activo: Enviado directamente a la API de Taskroulette.');
    }
    
    this.miTarea = ''; // Limpiar el input
  }

  escucharConexion() {
    window.addEventListener('online', async () => {
      const datoPendiente = await this.storageService.get('tarea_pendiente');
      
      if (datoPendiente) {
        console.log('¡Conexión restaurada! Sincronizando datos pendientes con el servidor...');

        this.tareaGuardada = `[Sincronizado Exitosamente] ${datoPendiente}`;

        await this.storageService.remove('tarea_pendiente');
        console.log('Sincronización completa. Storage local limpio.');
      }
    });
  }
}