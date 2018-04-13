const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const fs = require('fs');

nightmare
  .goto('https://www.alltrails.com/us/colorado/idaho-springs')
  .evaluate(() => {
    const allTrails = [...document.querySelectorAll('.trail-result-card')]
    
    const trailData = allTrails.map(trails => {
      let title = trails.querySelector('.short').innerText
      let difficulty = trails.querySelector('.difficulty-info').innerText
      let link = trails.querySelector('.item-link').href

      return { title, difficulty, link }
    })

    return trailData
  })
  .end()
  .then( result => {
    let output = JSON.stringify(result, null, 2);

    fs.writeFile('./trail-data.json', output, 'utf8', err => {
      if(err) {
        return console.log(err)
      }
    })
    console.log('File was saved');
    console.log(output);
    
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });