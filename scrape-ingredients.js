const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const fs = require('fs');

nightmare
  .goto('http://www.zelda.wikia.com/wiki/Cooking')
  .evaluate(() => {
    const pageContent = document.querySelector('.wikitable')
    
    const paragraphs = [...pageContent.querySelectorAll('tr td a')]
    
    const textContent = paragraphs.map(tr =>  {
      let name = tr.innerText
      let special_effect = null
      let recipes = null
      let common_locations = null
      let health_boost = null

      return { name, special_effect, recipes, common_locations, health_boost }
    })
    
    return textContent   
  })
  .end()
  .then( result => {
    console.log(result);
    
    let output = JSON.stringify(result, null, 2);
    
    fs.writeFile('./ingredientsTwo.json', output, 'utf8', err => {
      if(err) {
        return console.log(err)
      }
    })
    console.log('File was saved');
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });
