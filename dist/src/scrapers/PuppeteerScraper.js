"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_extra_1 = __importDefault(require("puppeteer-extra"));
//import randomUA = require('modern-random-ua')
const user_agents_1 = __importDefault(require("user-agents"));
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer_extra_1.default.use(AdblockerPlugin({ blockTrackers: true }));
puppeteer_extra_1.default.use(StealthPlugin());
const userAgent = new user_agents_1.default();
class PuppeteerScraper {
    constructor() {
        this.browser = null;
        this.pageHistoric = null;
        //this.api = new ScraperDataAccess();
        require('dotenv').config();
    }
    initializePuppeteer() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("initializing puppeteer");
            this.browser = yield puppeteer_extra_1.default.launch({
                headless: true,
                ignoreHTTPSErrors: true,
                slowMo: 0,
                args: ['--window-size=1400,900',
                    '--remote-debugging-port=9222',
                    "--remote-debugging-address=0.0.0.0",
                    '--disable-gpu', "--disable-features=IsolateOrigins,site-per-process", '--blink-settings=imagesEnabled=false']
            });
            this.page = yield this.browser.newPage();
            this.page.on('error', err => {
                if (!this.page.isClosed()) {
                    //Close page if not closed already
                    this.page.close();
                }
                console.log("----");
            });
            yield this.page.setUserAgent(userAgent.toString());
            function handleClose(msg) {
                console.log(msg);
                this.page.close();
                this.browser.close();
                process.exit(1);
            }
            process.on("uncaughtException", () => {
                //handleClose(`I crashed`);
            });
        });
    }
    reopenBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.browser.close();
            yield this.initializePuppeteer();
        });
    }
    savePartialResults(results) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.PuppeteerScraper = PuppeteerScraper;
//# sourceMappingURL=PuppeteerScraper.js.map