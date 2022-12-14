import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { map, Observable, startWith } from 'rxjs';
import { GasDetails } from 'src/app/interfaces/gas-list.interface';
import { MunicipioResponse } from 'src/app/interfaces/municipios.interface';
import { Provincia } from 'src/app/interfaces/provincias.interface';

import { GasService } from 'src/app/services/gas.service';

@Component({
  selector: 'app-gas-list',
  templateUrl: './gas-list.component.html',
  styleUrls: ['./gas-list.component.css'],
})
export class GasListComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow = {} as MapInfoWindow;
  zoomInput: number = 0;
  gasolineras: GasDetails[] = [];
  gasStation: GasDetails = {} as GasDetails;
  pos: google.maps.LatLngLiteral= {} as google.maps.LatLngLiteral;

  userPosition: google.maps.LatLngLiteral = {} as google.maps.LatLngLiteral;
  gasPosition: google.maps.LatLngLiteral = {} as google.maps.LatLngLiteral;
  mapZoom = 4;
  gasPositions: google.maps.LatLngLiteral[] = [];


  userLat = this.gasPosition.lat;
  userLng = this.gasPosition.lng;



  urlImg!: string;
  gasList: GasDetails[] = [];
  minimoPosible: number = 0;
  maximoPosible: number = 3.5;
  gasSelected?: string = '';
  provSelected: any[] = [];
  municipioSelected = '';
  filteredOptions!: Observable<MunicipioResponse[]>;
  gasFiltrado: GasDetails[] = [];
  boolGasFil: boolean = false;

  provinciasList: Provincia[] = [];
  municipiosList: MunicipioResponse[] = [];

  myControl = new FormControl('');

  /* gasStation: GasDetails = {} as GasDetails;
  gasDetailsVariable: keyof typeof this.gasStation = 'Precio Gasolina 95 E5';*/

  combustibles: string[] = [
    'Gasóleo A',
    'Gasóleo B',
    'Gasóleo Premium',
    'Gasolina 95 E10',
    'Gasolina 95 E5',
    'Gasolina 95 E5 Premium',
    'Gasolina 98 E10',
    'Gasolina 98 E5',
    'Hidrógeno',
  ];

  toppings = new FormControl('');

  constructor(private gasService: GasService) {}

  ngOnInit(): void {
    this.getLocation();
    this.gasSelected = 'Gasolina 95 E5';
    this.gasService.getGasolineras().subscribe((resp) => {
      this.gasList = resp;
      console.log(this.gasList);
      this.boolGasFil = true;
      this.filtrado();
    });

    this.gasService.getProvincias().subscribe((prov) => {
      this.provinciasList = prov;
      console.log(this.provinciasList);
    });
  }

  getLocation(): void{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        this.userLat = position.coords.latitude;
        this.userLng = position.coords.longitude;
        this.userPosition = {lat: this.userLat, lng: this.userLng};
        console.log(this.userPosition);

      });
    }else {
      console.log("No support for geolocation")
    }


  }

  openInfoWindow(marker: MapMarker, gas: GasDetails) {
      this.infoWindow.open(marker);
  }


  getCombustible(gas: string) {
    this.gasSelected = gas;
    console.log(this.gasSelected);
  }

  postProvincia() {
    console.log(this.provSelected);
    this.municipiosList = [];
    this.municipioSelected = '';
    if (
      this.provSelected.includes(
        this.provSelected.map((item) => item.IDProvincia)
      )
    ) {
      this.provSelected.splice(
        this.provSelected.indexOf(
          this.provSelected.map((item) => item.IDProvincia)
        ),
        1
      );
    }
    this.provinciasList.map((item) => item.Provincia);
    if (this.provSelected.length >= 0) {
      this.provSelected.forEach((eachprovin) => {
        this.provinciasList.forEach((provin2) => {
          if (provin2.Provincia === eachprovin) {
            this.gasService
              .getMunicipiosProvincia(provin2.IDPovincia)
              .subscribe((municipios) => {
                this.municipiosList = this.municipiosList.concat(municipios);
                this.filteredOptions = this.myControl.valueChanges.pipe(
                  startWith(''),
                  map((value) => this._filter(value || ''))
                );
              });
          }
        });
      });
    }
  }

  _filter(value: string): MunicipioResponse[] {
    const filterValue = value.toLowerCase();

    return this.municipiosList.filter((municipio) =>
      municipio.Municipio.toLowerCase().includes(filterValue)
    );
  }

  filtrado() {
    this.gasFiltrado = this.gasList.filter((item) =>
      this.condicionFiltro(item)
    );
  }

  condicionFiltro(item: GasDetails): boolean {
    let pasaFiltro = false;
    switch (this.gasSelected) {
      case 'Gasóleo A':
        pasaFiltro =
          Number(item['Precio Gasoleo A'].replace(',', '.')) >
            this.minimoPosible &&
          Number(item['Precio Gasoleo A'].replace(',', '.')) <
            this.maximoPosible &&
          this.provSelected.includes(item['Provincia']) &&
          item.Municipio.toLowerCase().includes(
            this.municipioSelected.toLowerCase()
          )
            ? true
            : false;

        break;
      case 'Gasóleo B':
        pasaFiltro =
          Number(item['Precio Gasoleo B'].replace(',', '.')) >
            this.minimoPosible &&
          Number(item['Precio Gasoleo B'].replace(',', '.')) <
            this.maximoPosible &&
          this.provSelected.includes(item['Provincia']) &&
          item.Municipio.toLowerCase().includes(
            this.municipioSelected.toLowerCase()
          )
            ? true
            : false;
        break;
      case 'Gasóleo Premium':
        pasaFiltro =
          Number(item['Precio Gasoleo Premium'].replace(',', '.')) >
            this.minimoPosible &&
          Number(item['Precio Gasoleo Premium'].replace(',', '.')) <
            this.maximoPosible &&
          this.provSelected.includes(item['Provincia']) &&
          item.Municipio.toLowerCase().includes(
            this.municipioSelected.toLowerCase()
          )
            ? true
            : false;
        break;
      case 'Gasolina 95 E10':
        pasaFiltro =
          Number(item['Precio Gasolina 95 E10'].replace(',', '.')) >
            this.minimoPosible &&
          Number(item['Precio Gasolina 95 E10'].replace(',', '.')) <
            this.maximoPosible &&
          this.provSelected.includes(item['Provincia']) &&
          item.Municipio.toLowerCase().includes(
            this.municipioSelected.toLowerCase()
          )
            ? true
            : false;
        break;
      case 'Gasolina 95 E5':
        pasaFiltro =
          Number(item['Precio Gasolina 95 E5'].replace(',', '.')) >
            this.minimoPosible &&
          Number(item['Precio Gasolina 95 E5'].replace(',', '.')) <
            this.maximoPosible &&
          this.provSelected.includes(item['Provincia']) &&
          item.Municipio.toLowerCase().includes(
            this.municipioSelected.toLowerCase()
          )
            ? true
            : false;
        break;
      case 'Gasolina 95 E5 Premium':
        pasaFiltro =
          Number(item['Precio Gasolina 95 E5 Premium'].replace(',', '.')) >
            this.minimoPosible &&
          Number(item['Precio Gasolina 95 E5 Premium'].replace(',', '.')) <
            this.maximoPosible &&
          this.provSelected.includes(item['Provincia']) &&
          item.Municipio.toLowerCase().includes(
            this.municipioSelected.toLowerCase()
          )
            ? true
            : false;
        break;

      case 'Gasolina 98 E10':
        pasaFiltro =
          Number(item['Precio Gasolina 98 E10'].replace(',', '.')) >
            this.minimoPosible &&
          Number(item['Precio Gasolina 98 E10'].replace(',', '.')) <
            this.maximoPosible &&
          this.provSelected.includes(item['Provincia']) &&
          item.Municipio.toLowerCase().includes(
            this.municipioSelected.toLowerCase()
          )
            ? true
            : false;
        break;
      case 'Gasolina 98 E5':
        pasaFiltro =
          Number(item['Precio Gasolina 98 E5'].replace(',', '.')) >
            this.minimoPosible &&
          Number(item['Precio Gasolina 98 E5'].replace(',', '.')) <
            this.maximoPosible &&
          this.provSelected.includes(item['Provincia']) &&
          item.Municipio.toLowerCase().includes(
            this.municipioSelected.toLowerCase()
          )
            ? true
            : false;
        break;
      case 'Hidrógeno':
        pasaFiltro =
          Number(item['Precio Hidrogeno'].replace(',', '.')) >
            this.minimoPosible &&
          Number(item['Precio Hidrogeno'].replace(',', '.')) <
            this.maximoPosible &&
          this.provSelected.includes(item['Provincia']) &&
          item.Municipio.toLowerCase().includes(
            this.municipioSelected.toLowerCase()
          )
            ? true
            : false;
        break;

      default:
        'Gasolina 95 E5';
        break;
    }
    return pasaFiltro;
  }

  getImage(rotulo: string) {
    if (rotulo.includes('REPSOL')) {
      this.urlImg = '../../assets/img/repsol-logo-1.png';
    } else if (rotulo.includes('CEPSA')) {
      this.urlImg = '../../assets/img/cepsa-logo-1.png';
    } else if (rotulo.includes('PETROPRIX')) {
      this.urlImg = '../../assets/img/petroprix-logo.png';
    } else if (rotulo.includes('CARREFOUR')) {
      this.urlImg = '../../assets/img/logo-carrefour-gasolinera.jpg';
    } else if (rotulo.includes('BP')) {
      this.urlImg = '../../assets/img/bp-logo.png';
    } else if (rotulo.includes('ALCAMPO')) {
      this.urlImg = '../../assets/img/alcampo-gas.png';
    } else if (rotulo.includes('GALP')) {
      this.urlImg = '../../assets/img/galp-logo.png';
    } else if (rotulo.includes('SHELL')) {
      this.urlImg = '../../assets/img/shell-logo.png';
    } else {
      this.urlImg = '../../assets/img/gasLogo.png';
    }
    return this.urlImg;
  }

  onActivate(event: Event) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  formatLabel(value: number) {
    if (value >= 0.1) {
      return Math.round(value / 0.1) + 'k';
    }
    return value;
  }
}
