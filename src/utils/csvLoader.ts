import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

interface Store {
    areaCode: string;
    storeName: string;
    storeId: string;
}

const stores: Store[] = [];

export const loadStoresFromCSV = async (): Promise<Store[]> => {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '../data/store.csv'))
            .pipe(csv())
            .on('data', (row) => {
                stores.push({
                    areaCode: row.AreaCode,
                    storeName: row.StoreName,
                    storeId: row.StoreID
                });
            })
            .on('end', () => resolve(stores))
            .on('error', (err) => reject(err));
    });
};

export const getStoreById = (storeId: string): Store | undefined => {
    return stores.find((store) => store.storeId === storeId);
};
