const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const fs = require('fs');

nightmare
  .goto('file:///Users/precise_device/Documents/mod-4/webscraping-workshop/fillers.html')
  .evaluate(() => {
    const rawFillers = [...document.querySelectorAll('tbody tr')]
    
    const cleanFillers = rawFillers.map(filler =>  {
      let name = filler.children[0].innerText
      let type = null
      let hearts = filler.children[1].innerText
      let effect = null
      let duration = filler.children[2].innerText
      let resale = filler.children[3].innerText
      let category = 'fillers'

      return { category, name, type, hearts, effect, duration, resale }
    })
    
    return cleanFillers  
  })
  .end()
  .then( result => {
    console.log(result);
    
    let output = JSON.stringify(result, null, 2);
    
    fs.writeFile('./fillers.json', output, 'utf8', err => {
      if(err) {
        return console.log(err)
      }
    })
    console.log('File was saved');
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });