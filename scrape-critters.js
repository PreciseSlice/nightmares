const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const fs = require('fs');

nightmare
  .goto('file:///Users/precise_device/Documents/mod-4/webscraping-workshop/critter.html')
  .evaluate(() => {
    const rawCritters = [...document.querySelectorAll('tbody tr')]
    
    const cleanCritters = rawCritters.map(critter =>  {
      let name = critter.children[0].innerText
      let type = null
      let hearts = critter.children[1].innerText
      let effect = critter.children[2].innerText
      let duration = critter.children[4].innerText
      let resale = critter.children[5].innerText
      let category = 'critters'
      return { category, name, type, hearts, effect, duration, resale }
    })
    
    return cleanCritters  
  })
  .end()
  .then( result => {
    console.log(result);
    
    let output = JSON.stringify(result, null, 2);
    
    fs.writeFile('./critters.json', output, 'utf8', err => {
      if(err) {
        return console.log(err)
      }
    })
    console.log('File was saved');
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });