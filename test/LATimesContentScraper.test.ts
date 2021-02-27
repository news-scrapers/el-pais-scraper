import {TheSunNewContentScraper} from "../src/scrapers/TheSunNewContentScraper";
import {ScrapingIndexI} from "../src/models/ScrapingIndex";
import {CnnNewContentScraper} from "../src/scrapers/CnnNewContentScraper";
import {NewYorkTimesContentScraper} from "../src/scrapers/NewYorkTimesContentScraper";
import {LATimesContentScraper} from "../src/scrapers/LATimesContentScraper";

require('dotenv').config();

describe('La times scraper', function () {
    describe('test scraper in a for a given new', function () {

        const date = new Date()
        const testIndex = {} as ScrapingIndexI
        testIndex.scraperId = "test"
        const scraper = new LATimesContentScraper("test","latimes");
        jest.setTimeout(9999999)
        it('scraping results shoud be not null', async function () {
            const url ="https://www.latimes.com/california/story/2021-01-25/how-california-covid-stay-at-home-order-ending-affects-la"
            const result = await scraper.extractNewInUrl(url);
            console.log(result);
            expect(result).toHaveProperty("content")
            expect(result).toHaveProperty("date")
            expect(result).toHaveProperty("scrapedAt")
            expect(result).toHaveProperty("tags")
            expect(result.date).toBeDefined()
            expect(result.tags).toBeDefined()
            expect(result.content).toBeDefined()
            expect(result.headline).toBeDefined()
            expect(result.url).toBeDefined()
        });
    });
});