import React, { Component } from 'react';
import { Row,Col,Card, Button, CardImg, CardTitle, CardText, CardDeck,
 CardSubtitle, CardBody } from 'reactstrap';
import logo from './logo.svg';
import './App.css';

class Search extends Component {

  constructor(props){
    super(props);

    this.state = ({
        pokemons: null,
        currentInput: '',
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
    fetch("http://localhost:5000/pokemons")
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
    let pokemonsToDisplay;

    if(this.state.pokemons) {
      if(this.state.currentInput) {
        pokemonsToDisplay = this.state.pokemons.map( pokemon => {
          const url = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.id}.png`;
          const info = `/info/${pokemon.id}`;
          if(pokemon.name.toUpperCase().startsWith(this.state.currentInput.toUpperCase())){
            console.log(pokemon.name);
              return (
                <CardDeck className="card-body">
                  <Row>
                    <Col>
                      <Card className="shadow">
                        <CardImg className="card-header" top width="100%" src={url} alt="Card image cap" />
                        <CardBody>
                          <CardTitle>{pokemon.name}</CardTitle>
                          <CardText>
                          Weight: {pokemon.weight}<br/>
                           Heigth: {pokemon.heigth}
                          </CardText>
                          <Button href={info}>View more ...</Button>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </CardDeck>
             );
          }
        });
      }else{
        pokemonsToDisplay = this.state.pokemons.map( pokemon => {
          const url = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.id}.png`;
          const info = `/info/${pokemon.id}`;
          return (


          <CardDeck className="card-body">
            <Row>
              <Col>
                <Card className="shadow">
                  <CardImg className="card-header" src={url} alt="Card image cap" />
                  <CardBody>
                    <CardTitle>{pokemon.name}</CardTitle>
                    <CardText>
                    Weight: {pokemon.weight}<br/>
                     Heigth: {pokemon.heigth}
                    </CardText>
                    <Button href={info}>View more ...</Button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </CardDeck>
          );
        });

      }

    }else{
      return (
        <div>
          <div className="o-pokeball c-loader App-logo"/>
          <p>Please run the server ...</p>
        </div>
      )

    }

    return (

      <div className="color">
        <img src='pokemon.png' alt="error" width="500px"/>
        <div className="Search">
          <input onChange={this.handleInput} />
        </div>
        <CardDeck className="card-body">
            {pokemonsToDisplay}
        </CardDeck>
      </div>

    );
  }
}

export default Search;
