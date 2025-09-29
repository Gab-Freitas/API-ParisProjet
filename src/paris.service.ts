import { Injectable, NotFoundException } from '@nestjs/common';
import { Paris } from './Paris';
import { v4 as uuidv4 } from 'uuid';


import dataset from './dataset.json';

@Injectable()
export class ParisService {
    private parisData: Paris[] = [];

    constructor() {
        this.parisData = dataset.map((item) => ({
            id: uuidv4(),
            favori: false,
            ...item,
        }));
    }

    findAll(): Partial<Paris>[] {
        return this.parisData.map((item) => ({
            id: item.id,
            titre_descriptif: item.titre_descriptif,
            categorie: item.categorie,
            sous_categorie: item.sous_categorie,
            url_pj: item.url_pj,
            geo_point_2d: item.geo_point_2d,
            favori: item.favori,
        }));
    }

    findOne(id: string): Paris {
        const item = this.parisData.find((p) => p.id === id);
        if (!item) {
            throw new NotFoundException(`Paris item with id ${id} not found`);
        }
        return item;
    }

    create(paris: Omit<Paris, 'id' | 'favori'>): Paris {
        const newItem: Paris = {
            ...paris,
            id: uuidv4(),
            favori: false,
        };
        this.parisData.push(newItem);
        return newItem;
    }

    update(id: string, updated: Omit<Paris, 'id'>): Paris {
        const index = this.parisData.findIndex((p) => p.id === id);
        if (index === -1) {
            throw new NotFoundException(`Paris item with id ${id} not found`);
        }
        this.parisData[index] = {...updated, id}; // mantém o mesmo id
        return this.parisData[index];
    }

    updatePartial(id: string, partial: Partial<Paris>): Paris {
        const index = this.parisData.findIndex((p) => p.id === id);
        if (index === -1) {
            throw new NotFoundException(`Paris item with id ${id} not found`);
        }
        this.parisData[index] = {...this.parisData[index], ...partial};
        return this.parisData[index];
    }

    search(query: string): Paris[] {
        if (!query) return [];
        const lowerQuery = query.toLowerCase();

        return this.parisData.filter(
            (item) =>
                (item.titre_descriptif?.toLowerCase() || '').includes(lowerQuery) ||
                (item.categorie?.toLowerCase() || '').includes(lowerQuery) ||
                (item.sous_categorie?.toLowerCase() || '').includes(lowerQuery) ||
                (item.adresse?.toLowerCase() || '').includes(lowerQuery) ||
                (item.code_postal?.toLowerCase() || '').includes(lowerQuery) ||
                (item.date_liv?.toLowerCase() || '').includes(lowerQuery),
        );

    }

    remove(id: string): void {
        const index = this.parisData.findIndex((p) => p.id === id);
        if (index === -1) {
            throw new NotFoundException(`Paris item with id ${id} not found`);
        }
        this.parisData.splice(index, 1);
    }

}
