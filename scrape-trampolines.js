const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const fs = require('fs');

nightmare
  .goto('https://www.google.com/shopping?hl=en')
  .type('#gbqfq', 'trampoline')
  .click('#gbqfb')
  .wait(2000)
  .evaluate(() => {
    const shoppingDivs = [...document.querySelectorAll('.sh-dgr__grid-result')]
    
    const shoppingData = shoppingDivs.map(shoppingDiv => {
      let title = shoppingDiv.querySelector('.EI11Pd').innerText
      let price = shoppingDiv.querySelector('.O8U6h').innerText;

      return { title, price }
    })
    return shoppingData
  })
  .end()
  .then( result => {
    let output = JSON.stringify(result, null, 2);

    fs.writeFile('./trampoline-data.json', output, 'utf8', err => {
      if(err) {
        return console.log(err)
      }
    })
    console.log('File was saved');
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });