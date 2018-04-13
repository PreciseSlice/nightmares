const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const fs = require('fs');

nightmare
  .goto(
    'https://zelda.gamepedia.com/Food#List_of_Food'
  )
  .evaluate(() => {
    const pageContent = document.querySelectorAll('.sortable');

    const imgArray = [...pageContent[1].querySelectorAll('img')];          

    const images = imgArray.map(image => {
      return {
        img: image.src,
        alt: image.alt
      }
    });

    return { images };
    
  })
  .end()
  .then(result => {
    let output = JSON.stringify(result, null, 2);

    fs.writeFile('../data/frozen-images.json', output, 'utf8', err => {
      if (err) {
        return console.log(err);
      }
    });
    console.log('File was saved');
  })
  .catch(function(error) {
    console.error('Search failed:', error);
  });
