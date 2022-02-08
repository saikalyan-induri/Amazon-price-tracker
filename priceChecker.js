const axios = require('axios');

const cheerio = require('cheerio').default;

const cron = require('node-cron');

const nodemailer = require('nodemailer');

const fetchPrice =  async (url, targetPrice) => {
    let vals = [];
    try{
        const response = await axios.get(url);
        const html = response.data;
        //console.log(html);
        const $ = cheerio.load(html);
        // console.log($);
        const priceText = String($('.a-offscreen').text());
        let reqText="";
        for(let i = 1; i < priceText.length; i++){
            if(priceText.charAt(i)==','){

            }
            else if(priceText.charAt(i)=='.'){ 
                break;
            }
            else{
                reqText += priceText[i];
            }
        }

        const productTitle = $('#productTitle').text().trim();

        const imageUrl = $('#landingImage').attr('src');

        vals.push(reqText); vals.push(productTitle); vals.push(imageUrl);

        console.log(vals);
        return vals;
        //console.log(productTitle);
    }
    catch(err){
        console.log("error vachindi da");
        return vals;
        //console.log(err);
    }
}

fetchPrice("https://www.amazon.in/Resistant-Duffle-Shoulder-Separate-Compartment/dp/B09KVBSG61/ref=zg-bsnr_luggage_1/258-1200391-2442638?pd_rd_w=q7fsy&pf_rd_p=56cde3ad-3235-46d2-8a20-4773248e8b83&pf_rd_r=3AYXVMXD28PVDS0PHZSP&pd_rd_r=083e19b1-f026-401a-981b-013b2410bbe1&pd_rd_wg=kcwJ3&pd_rd_i=B09KVBSG61&psc=1",12345);

module.exports = fetchPrice;