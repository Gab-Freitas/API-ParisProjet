import { Test, TestingModule } from '@nestjs/testing';
import { ParisService } from './paris.service';
import { Paris } from './Paris';

describe('ParisService', () => {
    let service: ParisService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ParisService],
        }).compile();

        service = module.get<ParisService>(ParisService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('GET /paris should return a non-empty list', () => {
        const result = service.findAll();
        expect(result.length).toBeGreaterThan(0);
    });

    it('GET /paris/:id should return a valid item', () => {
        const all = service.findAll();
        const id = all[0].id as string; // 👈 force string
        const item = service.findOne(id);
        expect(item).toHaveProperty('id', id);
    });

    it('POST /paris should create a new item', () => {
        const newItem: Omit<Paris, 'id' | 'favori'> = {
            titre_descriptif: 'Test Project',
            corps_descriptif: 'Test description',
            categorie: 'Category',
            sous_categorie: 'Subcategory',
            adresse: '123 Test Street',
            code_postal: '75000',
            date_liv: null,
            url_parisfr: null,
            url_pj: 'https://example.com/img.jpg',
            credit_photo: null,
            geo_shape: {
                type: 'Feature',
                geometry: { type: 'Point', coordinates: [2.3, 48.8] },
                properties: {},
            },
            geo_point_2d: { lon: 2.3, lat: 48.8 },
        };

        const created = service.create(newItem);
        expect(created).toHaveProperty('id');
        expect(created.favori).toBe(false);
    });

    it('PATCH /paris/:id should update part of an item', () => {
        const all = service.findAll();
        const id = all[0].id as string; // 👈 force string
        const updated = service.updatePartial(id, { titre_descriptif: 'Updated Title' });
        expect(updated.titre_descriptif).toBe('Updated Title');
    });

    it('PUT /paris/:id should replace an item', () => {
        const all = service.findAll();
        const id = all[0].id as string; // 👈 force string

        const updatedItem: Omit<Paris, 'id'> = {
            ...all[0],
            titre_descriptif: 'Replaced Project',
            favori: true,
        } as Omit<Paris, 'id'>;

        const replaced = service.update(id, updatedItem);
        expect(replaced.titre_descriptif).toBe('Replaced Project');
        expect(replaced.id).toBe(id);
    });

    it('DELETE /paris/:id should remove an item', () => {
        const all = service.findAll();
        const id = all[0].id as string; // 👈 force string
        service.remove(id);
        expect(() => service.findOne(id)).toThrow();
    });

    it('SEARCH should find items by query', () => {
        const results = service.search('test');
        expect(Array.isArray(results)).toBe(true);
    });
});
