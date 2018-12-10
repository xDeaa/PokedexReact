import React, { Component } from 'react';
import { Row,Col,Card, Button, CardImg, CardTitle, CardText, CardDeck,
 CardSubtitle, CardBody, Table } from 'reactstrap';
import logo from './logo.svg';
import './App.css';
import pokedex from './dex.png';
import pokeball from './pokeball.png';
import font from './font.jpg'


class Choose extends Component {

  constructor(props){
    super(props);

    this.state = ({
        pokemons: null,
        pokemonsAttacks: [],
      });

      this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    fetch("http://localhost:5000/info/"+ this.props.match.params.id)
      .then( results => {
        return results.json();
      })
      .then( data => {
        this.setState({
          pokemons: data,
        });
      })
      .catch(err => {
        console.log(err);
      });

  };

  handleInput(e) {
    this.setState({
      currentInput: e.target.value,
    });
  }

  render() {
    let pokemon;
    let pokemonAttacks;
    let pokemonNames;
    let pokemonNumber;
    let pokemonGeneral;
    let pokemonType;
    let pokemonTrain;
    let pokemonEgg;

    if(this.state.pokemons) {

      pokemon = this.state.pokemons;
      pokemonAttacks = this.state.pokemonsAttacks;


      pokemon.attaques.map(items => {
        pokemonAttacks.push(items)
      });

      pokemonAttacks = this.state.pokemonsAttacks.map(attacks => {
        return (

        <tbody>
          <tr>
            <td>{attacks.niveau}</td>
            <td>{attacks.nom}</td>
            <td>{attacks.puissance}</td>
            <td>{attacks.precision}</td>
          </tr>
        </tbody>

        );
      });

      pokemonNames = Object.entries(pokemon).map(([key,value]) =>{
        if (key.startsWith('no')) {
          return (
            <div className='Display'>

            {value}   <small>({key})</small>
            </div>
          );
        }
        return

      });
      //<li key={key}>{key}: {value}</li>
      pokemonNumber = Object.entries(pokemon).map(([key,value]) =>{
        if (key.endsWith('dex') || key.startsWith('nu')) {
          return (
            <div className='Display'>

            {value}   ({key})
            </div>
          );
        }

        return

      });

      pokemonGeneral = Object.entries(pokemon).map(([key,value]) =>{

        if (key.startsWith('espece') || key.startsWith('taille') || key.startsWith('poids') || key.startsWith('couleur') || key.startsWith('forme')) {
          return (
            <div className='Display'>

            {value}   <small>({key})</small>
            </div>
          );
        }
        return

      });

    pokemonType = Object.entries(pokemon).map(([key,value]) =>{

      if (key.startsWith('type')) {
        return (
          <span>  {value}</span>
        );
      }
      return

    });

    pokemonTrain = Object.entries(pokemon).map(([key,value]) =>{

      if (key.startsWith('fm') || key.startsWith('capture') || key.startsWith('effort') || key.startsWith('exp') || key.startsWith('caps') ) {
        return (
          <div className='Display'>

          {value}   <small>({key})</small>
          </div>
        );
      }
      return

    });

    pokemonEgg = Object.entries(pokemon).map(([key,value]) =>{

      if (key.startsWith('group') || key.startsWith('oeuf')) {
        return (
          <div>
            {value}   <small>({key})</small>
          </div>
        );
      }
      return

    });

  }else{
      return (
        <div>
          <div className="o-pokeball c-loader u-tada"/>
          <p>Please run the server ...</p>
        </div>
      )
  }
    const url = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.ndex}.png`;
  //  <a href="http://localhost:3000/"><img className="position" src={pokedex} alt='error' width="50px"/></a>

    return (
      <div className='bg'>
        <div>
        <a href="http://localhost:3000/"><img className='home' src={pokedex} alt='error'/></a>
        </div>
        <div className="content">
          <Row>
            <Col>
            <h1 className="pokedex">{pokemon.nom}</h1>
            <div className='imgPrev '>

              <img  src={url} alt="not found" width="350px"/>
            </div>
            </Col>
            <div className =".column_infos_g">
              <Col>
                <h2 className='pokedex'>Informations Pokédex</h2>
                <Table className="tab_infoG table-hover">
                  <tbody>
                    <tr>
                      <th>Types</th>
                      <td>
                        {pokemonType}
                      </td>
                    </tr>
                    <tr>
                      <th>Infos Géneral</th>
                        <td>
                          <div className="general">
                          {pokemonGeneral}
                          </div>
                        </td>
                    </tr>
                    <tr>
                      <th>Numéro régionaux</th>
                      <td>
                        <div className="general">
                        {pokemonNumber}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th>Différents noms</th>
                      <td>
                        <div className="general">
                        {pokemonNames}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </div>
          </Row>
          <span/>
          <div>
            <div className="bloc_tab">
            <Row>
              <Col>
                <h3 className="pokedex">Attaques</h3>
                <Table className="table-hover">
                  <thead>
                    <tr>
                    <th>Niveau</th>
                    <th>Nom</th>
                    <th>Puissance</th>
                    <th>Précision</th>
                    </tr>
                  </thead>
                  {pokemonAttacks}
                </Table>
              </Col>
              <Col>
                <h2 className='pokedex'>Entrainement</h2>
                <Table className="tab_infoG table-hover">
                  <tbody>
                    <tr>
                      <th>Infos</th>
                      <td>
                        {pokemonTrain}
                      </td>
                    </tr>
                  </tbody>
                </Table>
                  <h2 className='pokedex'>Groupe Oeufs</h2>
                  <Table className="tab_infoG table-hover">
                    <tbody>
                      <tr>
                        <th>Types</th>
                        <td>
                          {pokemonEgg}
                        </td>
                      </tr>
                    </tbody>
                  </Table>

              </Col>

            </Row>
            </div>
            </div>
          </div>
        </div>


    );
  }
}

export default Choose;
