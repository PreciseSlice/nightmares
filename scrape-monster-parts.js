const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const fs = require('fs');

nightmare
  .goto('file:///Users/precise_device/Documents/mod-4/webscraping-workshop/monster-parts.html')
  .evaluate(() => {
    const rawMonsterParts = [...document.querySelectorAll('tbody tr')]
    
    const cleanMonsterParts = rawMonsterParts.map(monsterPart =>  {
      let name = monsterPart.children[0].innerText
      let type = null
      let hearts = null
      let effect = null
      let duration = monsterPart.children[1].innerText
      let resale = monsterPart.children[2].innerText
      let category = 'monster parts'
      return { category, name, type, hearts, effect, duration, resale }
    })
    
    return cleanMonsterParts  
  })
  .end()
  .then( result => {
    console.log(result);
    
    let output = JSON.stringify(result, null, 2);
    
    fs.writeFile('./monster-parts.json', output, 'utf8', err => {
      if(err) {
        return console.log(err)
      }
    })
    console.log('File was saved');
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });