import got from 'got';

const LISTING_SERVICE_URI = "http://listing-service:7100";

export default class ListingsService {

    static async fetchAllListings() {
        const body = await got.get(`${LISTINGS_SERVICE_URI}/listings`).json();

        return body;

    }
}