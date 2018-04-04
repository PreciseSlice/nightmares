const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const fs = require('fs');

nightmare
  .goto('file:///Users/precise_device/Documents/mod-4/webscraping-workshop/recipe-hearts.html')
  .evaluate(() => {
    const rawRecipeHearts = [...document.querySelectorAll('tbody tr')]
    
    const cleanRecipeHearts = rawRecipeHearts.map(recipe =>  {
      let name = recipe.children[0].innerText
      let type = 'Restore Hearts'

      let ingredients = recipe.children[1].innerHTML.split()
      let cleanIng = {}
      for (i=0; i < 5; i++) {
        if (ingredients[i]) {
          cleanIng[`ingredient${i+1}`] = ingredients[i]
        } else {
          cleanIng[`ingredient${i+1}`] = null
        }
      }
      
      let hearts = recipe.children[2].innerText
      let notes = recipe.children[3].innerText
      let resale = recipe.children[4].innerText
      let category = 'recipe'
      return { category, name, type, hearts, notes, resale, ...cleanIng }
    })
    
    return cleanRecipeHearts  
  })
  .end()
  .then( result => {
    console.log(result);
    
    let output = JSON.stringify(result, null, 2);
    
    fs.writeFile('./recipe-hearts.json', output, 'utf8', err => {
      if(err) {
        return console.log(err)
      }
    })
    console.log('File was saved');
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });