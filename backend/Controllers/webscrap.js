const cheerio = require("cheerio");
const fs = require("fs");
const createBrowserless = require('browserless')
const getHTML = require('html-get');
const wis = require("./wis");
// Spawn Chromium process once
const browserlessFactory = createBrowserless()

// Kill the process when Node.js exit
process.on('exit', () => {
  console.log('closing resources!')
  browserlessFactory.close()
})

const getContent = async url => {
  // create a browser context inside Chromium process
  const browserContext = browserlessFactory.createContext()
  const getBrowserless = () => browserContext
  const result = await getHTML(url, { getBrowserless })
  // close the browser context after it's used
  await getBrowserless((browser) => browser.destroyContext())
  return result
}

getContent('https://homeshopping.pk/')
  .then(async (content) => {
    var data=content.html;
    try {
        // Load HTML we fetched in the previous line
        const $ = cheerio.load(data);
        // Select all the list items in plainlist class
        const listItems = $(".innerp ,.product-box");
        // Stores data for all Products
        const Products = [];
        // Use .each method to loop through the li we selected
        listItems.each((idx, el) => {
          // Object holding data for each product/jurisdiction
          const product = { avatar: "", description: "", price:""};
          // Select the text content of a and span elements
          // Store the textcontent in the above object
          product.avatar = $(el).children("figure").children("a").children("img").attr("src");
          product.description = $(el).children(".padx8, .padt24, .padb16").children("h5").children("a").text();
          product.price = $(el).children(".padx8,.padt24,.padb16 ").children("div.col-md-12.col-xs-12.p0").children("a").children("div").text();
         var url = $(el).children("figure").children("a").attr("href");
         
         
            
        //   getContent(url)
        //     .then(cont => {
        //       const cdata=cont.html;
        //       const $ = cheerio.load(cdata);
        //       const listItem = $("#glasscase>li");
            
        //       // Use .each method to loop through the li we selected
        //       listItem.each((idx, el) => {
        //         // Object holding data for each country/jurisdiction
               
        //         // Populate countries array with country data
        //         product.images.push($(el).children("img").attr("src"))
        //       });
            
        //       process.exit()
             
          
        //     })
        //     .catch(error => {
        //       console.error(error)
        //       process.exit(1)
        //     })
      
            wis(product);
          
        //   product.iso3 = $(el).children("span").text();
          // Populate Products array with product data
          Products.push(product);
        });
        // Logs Products array to the console
        console.dir(Products);
        // Write Products array in Products.json file
        fs.writeFile("product.json", JSON.stringify(Products, null, 2), (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log("Successfully written data to file");
          });
      } catch (err) {
        console.error(err);
      }
    process.exit()
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })