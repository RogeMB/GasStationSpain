import { Component, OnInit } from '@angular/core';
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

  constructor(private gasService: GasService) { }

  ngOnInit(): void {
    this.gasService.getGasolineras().subscribe(resp => {
      this.gasList = resp;
       console.log(this.gasList);
    })
  }

  getImage(rotulo :string): {
    if(rotulo==='Repsol'){
      this.urlImg=''
    }
  }
}
