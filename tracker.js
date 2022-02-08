const cheerio = require("cheerio").default;
	//{ sendHTTPRequest } = require("./sendHTTPRequest");
const axios = require("axios");

const loadHTML = async (url) => {
	try {
		// // Sending the request to get the product page of amazon, in raw html
		// const productHtmlPage = await sendHTTPRequest(
		// 	(method = "GET"),
		// 	(url = url),
		// 	(obj = {}),
		// 	(isJSON = false)
		// );
		// const loadedHTML = cheerio.load(productHtmlPage);
        const response = await axios.get(url);
        const html = response.data;
        //console.log(html);
        const $ = cheerio.load(html);
		return $;
	} catch (e) {
        console.log("error aya");
		console.log(e);
	}
};
const fetchProductDetails = async (url) => {
	try {
		// Fetching the price
		const pageHandle = await loadHTML(url);
		const firstPriceElement = pageHandle("#priceblock_dealprice");
		let price = fetchNumericalPrice(firstPriceElement);
		if (!price) {
			const thridPriceElement = pageHandle("#priceblock_ourprice");
			price = fetchNumericalPrice(thridPriceElement);
		}
		if (!price) {
			const fourthPriceElement = pageHandle("#priceblock_saleprice");
			price = fetchNumericalPrice(fourthPriceElement);
		}
		if (!price) {
			const secondPriceElement = pageHandle(
				"span .a-size-base.a-color-price.a-color-price"
			);
			price = fetchNumericalPrice(secondPriceElement);
		}

		//Fetching the title
		const title = pageHandle("#productTitle").text().trim();

		// fetching the image url
		let imageLinkHandle = pageHandle("#imgBlkFront"),
			productImage = null;

		if (imageLinkHandle.length == 0) {
			imageLinkHandle = pageHandle("#imgTagWrapperId img");
			productImage = imageLinkHandle.attr("data-old-hires");
		}
		if (imageLinkHandle.length == 0) {
			imageLinkHandle = pageHandle("#ebooksImgBlkFront");
			const parsed = JSON.parse(
				imageLinkHandle.attr("data-a-dynamic-image")
			);
			productImage = Object.keys(parsed)[0];
		}
		if (imageLinkHandle.length == 0) {
			imageLinkHandle = pageHandle("#landingImage");
			productImage = imageLinkHandle.attr("data-old-hires");
		} else {
			const parsed = JSON.parse(
				imageLinkHandle.attr("data-a-dynamic-image")
			);
			productImage = Object.keys(parsed)[0];
		}

		console.log({
			title,
			price,
			productImage,
		});

		return {
			title,
			price,
			productImage,
		};
	} catch (e) {
        console.error("error vachindi da");
		throw "Error occcured in fetchProductDeatils.js: " + e;
	}
};

const fetchNumericalPrice = (priceElement) => {
	return parseInt(priceElement.text().trim().slice(2).replace(/,/g, ""));
};

let res = fetchProductDetails("https://www.amazon.in/dp/B0999S3MD4/ref=s9_acsd_al_bw_c2_x_2_t?pf_rd_m=A1K21FY43GMZF8&pf_rd_s=merchandised-search-4&pf_rd_r=X0H77FFZNBJSYFWEE9Q8&pf_rd_t=101&pf_rd_p=f7a49dc2-3d84-41a5-bb47-82723963745b&pf_rd_i=22938665031");

console.log(res);

module.exports = {
	fetchProductDetails,
};
