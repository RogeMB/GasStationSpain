export interface ListaEESSPrecio {
    cp: string;
    Direccion: string;
    Horario: string;
    Latitud: string;
    Localidad: string;
    Longitud: string;
    Margen: string;
    Municipio: string;
    Precio_Biodiesel: string;
    Precio_Bioetanol: string;
    Precio_Gas_Natural_Comprimido: string;
    Precio_Gas_Natural_Licuado: string;
    Precio_Gases_licuados_del_petróleo: string;
    Precio_Gasoleo_A: string;
    Precio_Gasoleo_B: string;
    Precio_Gasoleo_Premium: string;
    Precio_Gasolina_95_E10: string;
    Precio_Gasolina_95_E5: string;
    Precio_Gasolina_95_E5_Premium: string;
    Precio_Gasolina_98_E10: string;
    Precio_Gasolina_98_E5: string;
    Precio_Hidrogeno: string;
    Provincia: string;
    Remision: string;
    Rotulo: string;
    Tipo_Venta: string;
    porcentaje_BioEtanol: string;
    porcentaje_ester_metilico: string;
    IDEESS: string;
    IDMunicipio: string;
    IDProvincia: string;
    IDCCAA: string;
}

export interface RootObject {
    Fecha: string;
    ListaEESSPrecio: ListaEESSPrecio[];
    Nota: string;
    ResultadoConsulta: string;
}



