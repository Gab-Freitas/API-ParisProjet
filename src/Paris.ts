export interface Paris {
    id: string | null;
    favori: boolean;

    titre_descriptif: string | null;
    corps_descriptif: string | null;
    categorie: string | null;
    sous_categorie: string | null;
    adresse: string | null;
    code_postal: string | null;
    date_liv: string | null;
    url_parisfr: string | null;
    url_pj: string;
    credit_photo: string | null;

    geo_shape: {
        type: string;
        geometry: {
            type: string;
            coordinates: number[];
        };
        properties: Record<string, any>;
    };

    geo_point_2d: {
        lon: number;
        lat: number;
    };
}