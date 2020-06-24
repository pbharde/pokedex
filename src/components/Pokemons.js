import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { Grid } from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import PokemonDetails from './PokemonDetails';
import { Typography } from '@material-ui/core';


class Pokemons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons:[],
      pokemon:'',
      type:'',
      weakness:'',
      pokemonDetails:[],
      redirect:false
    };
  }

  componentDidMount(){
    fetch("https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json")
    .then(res=>res.json())
    .then(data=>{
      this.setState({pokemons:data.pokemon})
    });
  }



  handlePokemonName=(e)=>{
      this.setState({pokemon:e});
  }



  handleType = (e) => {
      this.setState({type:e.target.value})
  };

  handleWeakness = (e) => {
      this.setState({weakness:e.target.value})
  };

  getDetails = (e) => {
      this.setState({
        pokemonDetails:e,
        redirect:true
      })
  };

  render() {
    if(this.state.redirect){
      return <PokemonDetails pokemonDetails={this.state.pokemonDetails}/>
    }

    let filteredPokemons = this.state.pokemons.filter(
      pokemon=>{
        if(this.state.type && this.state.weakness){
          return pokemon.type.includes(this.state.type) && pokemon.weaknesses.includes(this.state.weakness);
        }
        else if(this.state.type){
          return pokemon.type.includes(this.state.type);
        }
        else if(this.state.weakness){
          return pokemon.weaknesses.includes(this.state.weakness);
        }
        else{
          return !pokemon.name.toLowerCase().indexOf(this.state.pokemon.toLowerCase())>0
        }
      }
    );

    //find unique types of pokemon
    let types = [];
    let pokemonTypes = [];
    types = this.state.pokemons.map(pokemon=>pokemon.type);
    for(let i=0; i<types.length;i++){
      for(let j=0; j<types[i].length;j++){
        pokemonTypes.push(types[i][j]);
      }
    }
    const unique = (value, index, self) => {
        return self.indexOf(value) === index
      }


    const uniqueTypes = pokemonTypes.filter(unique)

    //-------------------------------------------------------------------------------------------------------

    //find unique Weaknesses of pokemon
    let weaknesses = [];
    let pokemonWeaknesses = [];
    weaknesses = this.state.pokemons.map(pokemon=>pokemon.weaknesses);
    for(let i=0; i<weaknesses.length;i++){
      for(let j=0; j<weaknesses[i].length;j++){
        pokemonWeaknesses.push(weaknesses[i][j]);
      }
    }
    const uniqueWeak = (value, index, self) => {
        return self.indexOf(value) === index
      }

    const uniqueWeaknesses = pokemonWeaknesses.filter(uniqueWeak)

      //-------------------------------------------------------------------------------------------------------


    return(
      <div>
      <Typography variant="h3" component="h2"
      style={{
        margin: '0 auto',
        width: 300,
        marginTop:'2%',
        color:'red'
      }}>
        POKEDEX
      </Typography>
      <SearchBar
      onChange={this.handlePokemonName}
      onRequestSearch={this.searchPokemon}
      value={this.state.pokemon}
      placeholder="Search Pokemon"
      style={{
        margin: '0 auto',
        maxWidth: 800,
        marginTop:'5%'
      }}
    />
    <Grid container
    style={{
      margin: '0 auto',
      width: 300,
      marginTop:'2%'
    }}
    >
    <Grid items xs={2}>
    <FormControl variant="outlined" style={{width:'150px'}}>
        <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.type}
          onChange={this.handleType}
          label="Type"
        >
        {
          uniqueTypes.map(type=><MenuItem value={type}>{type}</MenuItem>)
        }
        </Select>
      </FormControl>
      </Grid>
      <Grid items xs={2}>
      <FormControl variant="outlined" style={{width:'150px',marginLeft: '120px'}}>
        <InputLabel id="demo-simple-select-outlined-label">Weakness</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.weakness}
          onChange={this.handleWeakness}
          label="Weakness"
        >
        {
          uniqueWeaknesses.map(weakness=><MenuItem value={weakness}>{weakness}</MenuItem>)
        }
        </Select>
      </FormControl>
      </Grid>
      </Grid>
          <Grid container style={{
            marginLeft:'5%'
          }}>
          {
            filteredPokemons.map(pokemon =>(
                    <Grid items xs={3} key={pokemon.id} style={{marginTop:'2%'}}>
                      <Card style={{width: '250px',height:'600px'}}>
                            <CardHeader style={{color: 'blue'}}
                              title={pokemon.name}
                            />
                            <CardMedia style={{height: '200px', backgroundColor: '#F2F2F2', width: '200px',marginLeft:'25px'}}
                              image={pokemon.img}
                              title={pokemon.name}
                            />
                            <CardContent style={{height:'250px'}}>
                                <Grid container style={{marginLeft:'30px'}}>
                                    <Grid>
                                      <h5>Type</h5>
                                      {
                                        pokemon.type.map(type=>{
                                          return(
                                            <List>
                                              <ListItem key={`${pokemon.id}|${type}`} style={{ padding: 0}}>{type}</ListItem>
                                            </List>
                                          )
                                        })
                                      }
                                    </Grid>
                                    <Grid style={{marginLeft:'20%'}}>
                                    <h5>Weaknesses</h5>
                                    {
                                      pokemon.weaknesses.map(weaknes=>{
                                        return(
                                          <List>
                                            <ListItem key={`${pokemon.id}|${weaknes}`} style={{ padding: 0}}>{weaknes}</ListItem>
                                          </List>
                                        )
                                      })
                                    }
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions>
                            <Button variant="contained" color="secondary" style={{marginLeft:'70px', bottom: '0%'}} onClick={()=>this.getDetails(pokemon)}>
                              Details
                            </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                  )
              )
            }
        </Grid>
        </div>
    );
  }
}


export default Pokemons;
