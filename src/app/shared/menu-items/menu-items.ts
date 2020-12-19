import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  permission: string;
}

const MENUITEMS = [
  { state: 'clientes', name: 'Gestión clientes', type: 'link', icon: 'supervisor_account'},
];

@Injectable()
export class MenuItems {
  constructor() {
  }
  getMenuitem(){
    const roles = [];
    let itemsMenuConfirmados: ({ state: string; name: string; type: string; icon: string; permission: string; } | { state: string; name: string; type: string; icon: string; permission?: undefined; })[] = [];

      MENUITEMS.forEach(element => {
          itemsMenuConfirmados.push(element);
      });
    return itemsMenuConfirmados;
  }
}
