import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd } from '@angular/router';
import { GasDetails } from 'src/app/interfaces/gas-list.interface';

import { GasService } from 'src/app/services/gas.service';

@Component({
  selector: 'app-gas-list',
  templateUrl: './gas-list.component.html',
  styleUrls: ['./gas-list.component.css']
})
export class GasListComponent implements OnInit {

  urlImg!:string;
  gasList: GasDetails [] = [];
  minimoPosible?: number = 0;
  maximoPosible?: number = 3.5;

  constructor(private gasService: GasService) { }

  ngOnInit(): void {
    this.gasService.getGasolineras().subscribe(resp => {
      this.gasList = resp;
       console.log(this.gasList);
    })
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


