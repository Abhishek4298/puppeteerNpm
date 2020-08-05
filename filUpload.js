const puppeteer = require('puppeteer');

(async () => {
	const url = 'https://uppy.io/examples/xhrupload/';

	const browser = await puppeteer.launch({
		headless:false,
		slowMo:50
	});
	const page = await browser.newPage();

	await page.goto(url, { waitUntil: 'networkidle2' });

	//File upload code
	const [filechooser] = await Promise.all([
		page.waitForFileChooser(),
		page.click('.uppy-FileInput-btn')
	])

	await filechooser.accept(['./../npm_puppeteer_demo/public/images/screenshot-2020-8-5-14-35-53.png'])
	// await browser.close();
})();