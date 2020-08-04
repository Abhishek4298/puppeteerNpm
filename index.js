const puppeteer = require('puppeteer');
const { getFormattedTime } = require("./helper/index");

(async () => {
	const movieUrl = 'https://www.imdb.com/title/tt5753856/?ref_=nv_sr_srsg_0';

	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await page.goto(movieUrl, { waitUntil: 'networkidle2' });
	await page.screenshot({ path: 'screenshot-' + getFormattedTime() + '.png' });

	let data = await page.evaluate(() => {

		let title = document.querySelector('div[class="title_wrapper"] > h1').innerText;
		let rating = document.querySelector('span[itemprop="ratingValue"]').innerText;
		let ratingCount = document.querySelector('span[itemprop="ratingCount"]').innerText;

		return {
			title,
			rating,
			ratingCount
		}

	});

	console.log(data);

	await browser.close();
})();