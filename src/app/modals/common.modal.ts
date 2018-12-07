/**
 * Address Interface.
 */
export interface Address {
    /** Street Address */
    streetAddress?: string;
    /* city */
    city?: string;
    /* state */
    state?: string;
    /*zip*/
    zip?: string;
}


export interface GeoCordinates {
    /*holds latitiude */
    lat? : any
    /* holds longitude*/
    lng? : any
}

export interface types{

}


export interface results{
        address_components? : types[]
        formatted_address?: string
        geometry? : {
          bounds : { }
          location? : { }
          location_type? : string
          viewport? : { }
        }
        place_id? : string
        types? : types[]
}


export interface Geometry {
    results? : results[]    
    status?: string
}



export interface CurrentWeather {
    /**
     * Interface for current weather API JSON response
     */
    base?: string
    clouds?: {}
    cod?: number
    coord?: {}
    date?: Date
    id?: number
    main?: {
        humidity? : number
        pressure? : number
        temp? : number
        temp_max? : number
        temp_min? : number
    }
    name?: string
    sys?: {
        country? : string
        id? : number
        message? : string
        sunrise? : string
        sunset? : string
        type? : number
    }
    visibility?: number
    weather?: {}
    wind?: {
        speed? : number
    }
}

export interface ForecastWeather {
    /**Interafce for current weather details */
    /** Holds the city value */
    city? : {}
    /** Holds the API hits value */
    cnt? : number
    /** Holds the cod number*/
    cod? : number
    /**Holds the list of the forecast for this week */
    list? : {} 
    message? : string
}

