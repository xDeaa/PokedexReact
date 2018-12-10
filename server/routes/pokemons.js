
const fs = require('fs');
const path = process.cwd();

function display(router) {

  const content = JSON.parse(fs.readFileSync(path + '/data/pokedex.json'));

  router.get("/pokemons", async function(req, res) {
    let pokemon = [];
    res.setHeader('content-type', 'application/json');

    content.forEach((items) => {
      pokemon.push({
        id: items.ndex,
        name: items.nom,
        weight: items.poids,
        heigth: items.taille,

      })
    })
    res.send(pokemon)
  });

  router.get("/info/:id", function(req, res) {
    const idSelected = req.params.id;

    if (idSelected.length < 3) {
      res.send('Please enter a number with 3 numbers')
    }else {

      content.forEach(items => {
        if (idSelected === items.ndex) {
          res.send(items);
        }
      })
    }
  });

}

module.exports = display;
