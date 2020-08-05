const puppeteer = require('puppeteer');

(async () => {
	const url = 'https://uppy.io/examples/xhrupload/';

	const browser = await puppeteer.launch({
		headless:false,
		slowMo:50
	});
	const page = await browser.newPage();

	await page.goto(url, { waitUntil: 'networkidle2' });

	//To know the URL link.
	page.on('console', msg => console.log('PAGE LOG :=>', msg.text()));
	await page.evaluate(() => console.log(`The url is :::  ${location.href}`));

	//File upload code
	const [filechooser] = await Promise.all([
		page.waitForFileChooser(),
		page.click('.uppy-FileInput-btn')
	])

	await filechooser.accept(['/home/abhishek/Desktop/npm_puppeteer_demo/screenshot-2020-8-5-13-30-9.png'])
	// await browser.close();
})();