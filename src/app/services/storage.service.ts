import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  // Inicializa el almacenamiento de forma asíncrona
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    console.log('¡Base de datos local offline inicializada correctamente!');
  }

  // Función para guardar datos (Llave, Valor)
  public async set(key: string, value: any) {
    await this._storage?.set(key, value);
  }

  // Función para leer datos usando su llave
  public async get(key: string) {
    return await this._storage?.get(key);
  }

  // Función para borrar un dato específico
  public async remove(key: string) {
    await this._storage?.remove(key);
  }
}