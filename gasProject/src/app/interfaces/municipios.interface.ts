// Generated by https://quicktype.io

export interface MunicipioResponse {
    IDMunicipio: string;
    IDProvincia: string;
    IDCCAA:      string;
    Municipio:   string;
    Provincia:   Provincia;
    CCAA:        Ccaa;
}

export enum Ccaa {
    Andalucia = "Andalucia",
}

export enum Provincia {
    Sevilla = "SEVILLA",
}
