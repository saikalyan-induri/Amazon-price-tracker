const puppeteer = require('puppeteer');
const $ = require('cheerio').default;
const url = 'https://www.flipkart.com/noise-air-buds-mini-truly-wireless-bluetooth-headset/p/itme84b971c1f989?pid=ACCG36FHAZFMZ8PK&lid=LSTACCG36FHAZFMZ8PKXVQ7WJ&marketplace=FLIPKART&fm=neo%2Fmerchandising&iid=M_bafe762a-ce86-4c30-a09b-3e1bffca1747_7_1T02HKX2C0PZ_MC.ACCG36FHAZFMZ8PK&ppt=clp&ppn=electronics-big-savings-days-store&ssid=niq7ipkdalqhm8zk1642788970011&otracker=clp_pmu_v2_True%2BWireless_4_7.productCard.PMU_V2_Noise%2BAir%2BBuds%2BMini%2BTruly%2BWireless%2BBluetooth%2BHeadset_top-deals-on-headphones-speakers-store_ACCG36FHAZFMZ8PK_neo%2Fmerchandising_3&otracker1=clp_pmu_v2_PINNED_neo%2Fmerchandising_True%2BWireless_LIST_productCard_cc_4_NA_view-all&cid=ACCG36FHAZFMZ8PK';

puppeteer
  .launch()
  .then(function(browser) {
    return browser.newPage();
  })
  .then(function(page) {
    return page.goto(url).then(function() {
      return page.content();
    });
  })
  .then(function(html) {
    //console.log(html);
    let price = $('._25b18c', html).text();
    console.log(price);
  })
  .catch(function(err) {
    console.log(err);
    //handle error
  });