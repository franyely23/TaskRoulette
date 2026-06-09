import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage-angular'; // <-- Añadimos esta importación
import { NetworkService } from './services/network.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    IonicModule, 
    FormsModule, 
    RouterModule, 
    IonicStorageModule // <-- La inyectamos aquí directamente
  ]
})
export class AppComponent {
  public miTarea: string = '';
  public tareaGuardada: string = '';

  constructor(
    public networkService: NetworkService,
    private storageService: StorageService
  ) {
    this.cargarDatosOffline();
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
    await this.storageService.set('tarea_pendiente', this.miTarea);
    this.tareaGuardada = this.miTarea;
    this.miTarea = '';
    console.log('¡Dato guardado localmente en el Storage!');
  }
}