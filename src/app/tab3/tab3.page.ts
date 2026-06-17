import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { P2pService } from '../services/p2p'; // 1. Importamos tu servicio P2P

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {

  tareas: string[] = [];
  angulo: number = 0;
  girando: boolean = false;
  tareaSeleccionada: string = '';
  
  colores: string[] = ['#4f46e5', '#22c55e', '#f59e0b', '#ef4444', '#3b82f6', '#a855f7'];
  ruletaGradient: string = '';

  // 2. Inyectamos el P2pService en el constructor
  constructor(
    private storageService: StorageService,
    public p2pService: P2pService 
  ) {}

  async ionViewWillEnter() {
    this.tareaSeleccionada = ''; 
    this.angulo = 0;

    const data = await this.storageService.get('tareas');
    if (data) {
      this.tareas = data;
      this.generarRuleta();
    } else {
      this.tareas = [];
      this.ruletaGradient = '';
    }

    // 3. Simulación académica: Iniciamos el escaneo P2P automáticamente al entrar a la pestaña
    this.p2pService.iniciarDescubrimientoP2P();
    
    // Simulamos que nos conectamos automáticamente al primer dispositivo disponible (ej. Dispositivo_Danny) tras 2 segundos
    setTimeout(async () => {
      if (this.p2pService.dispositivosCercanos.length > 0) {
        await this.p2pService.conectarADispositivo(this.p2pService.dispositivosCercanos[0]);
      }
    }, 2000);
  }

  generarRuleta() {
    if (this.tareas.length === 0) return;
    const totalSegs = this.tareas.length;
    const gradoPorSegmento = 360 / totalSegs;
    let partesGradient: string[] = [];

    for (let i = 0; i < totalSegs; i++) {
      const color = this.colores[i % this.colores.length];
      const inicio = i * gradoPorSegmento;
      const fin = (i + 1) * gradoPorSegmento;
      partesGradient.push(`${color} ${inicio}deg ${fin}deg`);
    }
    this.ruletaGradient = `conic-gradient(${partesGradient.join(', ')})`;
  }

  girarRuleta() {
    if (this.tareas.length === 0) return;

    this.girando = true;
    this.tareaSeleccionada = '';

    const vueltas = 5; 
    const indice = Math.floor(Math.random() * this.tareas.length);
    const tamañoSegmento = 360 / this.tareas.length;
    const centroSegmento = tamañoSegmento / 2;

    this.angulo = (vueltas * 360) + (indice * tamañoSegmento) + centroSegmento;

    setTimeout(async () => {
      this.girando = false;
      this.tareaSeleccionada = this.tareas[indice];

      // 4. LOGICA P2P: Guardamos la tarea elegida en 'tarea_pendiente' como pide tu servicio
      await this.storageService.set('tarea_pendiente', this.tareaSeleccionada);

      // 5. Transmitimos la tarea por P2P al compañero conectado
      if (this.p2pService.conectadoA) {
        await this.p2pService.transferirTareasPendientes();
      }

    }, 3000);
  }
}