const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const fs = require('fs');

nightmare
  .goto('file:///Users/alexbonder/Desktop/scrapings/recipe-stealth.html')
  .evaluate(() => {
    const rawRecipes = [...document.querySelectorAll('tbody tr')]
    
    const cleanRecipes = rawRecipes.map(recipe =>  {
      let category = 'recipe'
      let type = 'Stealth'
      let name = recipe.children[0].innerText
      
      let ingredients = recipe.children[1].innerHTML.split('<br>')
      let cleanIng = {}
      
      for (let i=0; i < 5; i++) {
        if (ingredients[i]) {
          cleanIng[`ingredient${i+1}`] = ingredients[i].trim()
        } else {
          cleanIng[`ingredient${i+1}`] = null
        }
      }
      
      let strength = recipe.children[2] ? recipe.children[2].innerText : ''
      let duration = recipe.children[3] ? recipe.children[3].innerText : ''
      let hearts = null
      let notes = recipe.children[4] ? recipe.children[4].innerText : ''
      let resale = recipe.children[5] ? recipe.children[5].innerText : '0'
      return Object.assign({ category, type, name, strength, duration, hearts, notes, resale }, cleanIng)
    })
    
    return cleanRecipes  
  })
  .end()
  .then( result => {
    console.log(result);
    
    let output = JSON.stringify(result, null, 2);
    
    fs.writeFile('./recipe-stealth.json', output, 'utf8', err => {
      if(err) {
        return console.log(err)
      }
    })
    console.log('File was saved');
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });