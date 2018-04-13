const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const fs = require('fs');

nightmare
  .goto('file:///Users/precise_device/Documents/mod-4/webscraping-workshop/data.html')
  .evaluate(() => {
    const rawIngredients = [...document.querySelectorAll('tbody tr')]
    
    const cleanIngredients = rawIngredients.map(ingredient =>  {
      let name = ingredient.children[0].innerText
      let type = ingredient.children[1].innerText
      let hearts = ingredient.children[2].innerText
      let effect = ingredient.children[3].innerText
      let duration = ingredient.children[5].innerText
      let resale = ingredient.children[6].innerText
      let category = 'food'
      return { category, name, type, hearts, effect, duration, resale }
    })
    
    return cleanIngredients   
  })
  .end()
  .then( result => {
    console.log(result);
    
    let output = JSON.stringify(result, null, 2);
    
    fs.writeFile('./ingredients-3.json', output, 'utf8', err => {
      if(err) {
        return console.log(err)
      }
    })
    console.log('File was saved');
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });