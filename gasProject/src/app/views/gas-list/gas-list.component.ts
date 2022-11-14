import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GasDetails } from 'src/app/interfaces/gas-list.interface';
import { Provincia } from 'src/app/interfaces/provincias.interface';

import { GasService } from 'src/app/services/gas.service';

@Component({
  selector: 'app-gas-list',
  templateUrl: './gas-list.component.html',
  styleUrls: ['./gas-list.component.css']
})
export class GasListComponent implements OnInit {

  urlImg!:string;
  gasList: GasDetails [] = [];
  minimoPosible: number = 0;
  maximoPosible: number = 3.5;
  gasSelected?: string = '';
  gasFiltrado: GasDetails[] = [];

  combustibles:string[] = ['Gasóleo A', 'Gasóleo B', 'Gasóleo Premium', 'Gasolina 95 E10', 'Gasolina 95 E5', 'Gasolina 95 E5 Premium','Gasolina 98 E10','Gasolina 98 E5', 'Hidrógeno'];

  toppings = new FormControl('');

  provinciasList: Provincia [] = [];

  constructor(private gasService: GasService) { }

  ngOnInit(): void {
    this.gasSelected = "Gasolina 95 E5";
    this.gasService.getGasolineras().subscribe(resp => {
      this.gasList = resp;
      console.log(this.gasList);
      this.filtrado();
    })
    
    this.gasService.getProvincias().subscribe(prov => {
      this.provinciasList = prov;
      console.log(this.provinciasList);
    })
    
  }

  getCombustible(gas: string) {
    this.gasSelected = gas;
    console.log(this.gasSelected);
  }


  filtrado() {
    this.gasFiltrado = this.gasList.filter(item => this.condicionFiltro(item));
  }


  condicionFiltro(item: GasDetails): boolean {
    let pasaFiltro = false;

    switch (this.gasSelected) {
      case 'Gasóleo A':
        pasaFiltro =
          Number(item['Precio Gasoleo A'].replace(',', '.')) >
            this.minimoPosible &&
          Number(item['Precio Gasoleo A'].replace(',', '.')) <
            this.maximoPosible
            ? true
            : false;
        break;
      case 'Gasóleo B':
        pasaFiltro =
          Number(item['Precio Gasoleo B'].replace(',', '.')) >
            this.minimoPosible &&
          Number(item['Precio Gasoleo B'].replace(',', '.')) <
            this.maximoPosible
            ? true
            : false;
        break;
      case 'Gasóleo Premium':
        pasaFiltro =
          Number(item['Precio Gasoleo Premium'].replace(',', '.')) >
            this.minimoPosible &&
          Number(item['Precio Gasoleo Premium'].replace(',', '.')) <
            this.maximoPosible
            ? true
            : false;
        break;
      case 'Gasolina 95 E10':
        pasaFiltro =
          Number(item['Precio Gasolina 95 E10'].replace(',', '.')) >
            this.minimoPosible &&
          Number(item['Precio Gasolina 95 E10'].replace(',', '.')) <
            this.maximoPosible
            ? true
            : false;
        break;
      case 'Gasolina 95 E5':
        pasaFiltro =
          Number(item['Precio Gasolina 95 E5'].replace(',', '.')) >
            this.minimoPosible &&
          Number(item['Precio Gasolina 95 E5'].replace(',', '.')) <
            this.maximoPosible
            ? true
            : false;
        break;
      case 'Gasolina 95 E5 Premium':
        pasaFiltro =
          Number(item['Precio Gasolina 95 E5 Premium'].replace(',', '.')) >
            this.minimoPosible &&
          Number(item['Precio Gasolina 95 E5 Premium'].replace(',', '.')) <
            this.maximoPosible
            ? true
            : false;
        break;

      case 'Gasolina 98 E10':
        pasaFiltro =
          Number(item['Precio Gasolina 98 E10'].replace(',', '.')) >
            this.minimoPosible &&
          Number(item['Precio Gasolina 98 E10'].replace(',', '.')) <
            this.maximoPosible
            ? true
            : false;
        break;
      case 'Gasolina 98 E5':
        pasaFiltro =
          Number(item['Precio Gasolina 98 E5'].replace(',', '.')) >
            this.minimoPosible &&
          Number(item['Precio Gasolina 98 E5'].replace(',', '.')) <
            this.maximoPosible
            ? true
            : false;
        break;
      case 'Hidrógeno':
        pasaFiltro =
          Number(item['Precio Hidrogeno'].replace(',', '.')) >
            this.minimoPosible &&
          Number(item['Precio Hidrogeno'].replace(',', '.')) <
            this.maximoPosible
            ? true
            : false;
        break;

      default:
        'Gasolina 95 E5';
        break;
    }
    return pasaFiltro;
  }

  getImage(rotulo :string) {
    if (rotulo.includes('REPSOL')) {
      this.urlImg = '../../assets/img/repsol-logo-1.png';
    }else if (rotulo.includes('CEPSA')){
      this.urlImg = '../../assets/img/cepsa-logo-1.png';
    }else if (rotulo.includes('PETROPRIX')){
      this.urlImg = '../../assets/img/petroprix-logo.png';
    }else if (rotulo.includes('CARREFOUR')){
      this.urlImg = '../../assets/img/logo-carrefour-gasolinera.jpg';
    }else if (rotulo.includes('BP')){
      this.urlImg = '../../assets/img/bp-logo.png';
    }else if (rotulo.includes('ALCAMPO')){
      this.urlImg = '../../assets/img/alcampo-gas.png';
    }else if (rotulo.includes('GALP')){
      this.urlImg = '../../assets/img/galp-logo.png';
    }else if (rotulo.includes('SHELL')){
      this.urlImg = '../../assets/img/shell-logo.png';
    }

    else {
      this.urlImg = '../../assets/img/gasLogo.png'
    }
    return this.urlImg;
  }


  onActivate(event: Event) {
    window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
    });
  }

  formatLabel(value: number) {
    if (value >= 0.1) {
      return Math.round(value / 0.1) + 'k';
    }
    return value;
  }



}

