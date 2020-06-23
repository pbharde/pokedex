import React from 'react';
import Pokemons from './Pokemons'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';


class PokemonDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect:false
    };
  }

  back = () => {
      this.setState({redirect:true})
  };

  render() {

    if(this.state.redirect){
      return <Pokemons/>
    }

    let pokemonDetails = this.props.pokemonDetails;
    return (
      <Grid items key={pokemonDetails.id} style={{marginTop:'2%'}}>
        <Card style={{width: '500px'}}>
              <CardHeader style={{color: 'blue'}}
                title={pokemonDetails.name}
              />
              <CardMedia style={{height: '200px', backgroundColor: '#F2F2F2', width: '200px',marginLeft:'25px'}}
                image={pokemonDetails.img}
                title={pokemonDetails.name}
              />
              <CardContent>
                  <Grid container style={{marginLeft:'30px'}}>
                      <Grid>
                        <h5>Type</h5>
                        {
                          pokemonDetails.type.map(type=>{
                            return(
                              <List>
                                <ListItem key={`${pokemonDetails.id}|${type}`} style={{ padding: 0}}>{type}</ListItem>
                              </List>
                            )
                          })
                        }
                      </Grid>
                      <Grid style={{marginLeft:'20%'}}>
                      <h5>Weaknesses</h5>
                      {
                        pokemonDetails.weaknesses.map(weaknes=>{
                          return(
                            <List>
                              <ListItem key={`${pokemonDetails.id}|${weaknes}`} style={{ padding: 0}}>{weaknes}</ListItem>
                            </List>
                          )
                        })
                      }
                      </Grid>
                  </Grid>

                  <Grid container style={{marginLeft:'30px'}}>
                      <Grid>
                        <h5>Height</h5>
                        <List>
                          <ListItem key={`${pokemonDetails.id}|${pokemonDetails.height}`} style={{ padding: 0}}>{pokemonDetails.height}</ListItem>
                        </List>
                      </Grid>
                      <Grid style={{marginLeft:'20%'}}>
                      <h5>Weight</h5>
                            <List>
                              <ListItem key={`${pokemonDetails.id}|${pokemonDetails.weight}`} style={{ padding: 0}}>{pokemonDetails.weight}</ListItem>
                            </List>
                      </Grid>
                  </Grid>


                  <Grid container style={{marginLeft:'30px'}}>
                      <Grid>
                        <h5>Pre Evolution</h5>
                      {
                        (pokemonDetails.prev_evolution) ?
                          pokemonDetails.prev_evolution.map(evolution=>{
                            return(
                              <List>
                                <ListItem key={`${pokemonDetails.id}|${evolution.name}`} style={{ padding: 0}}>
                                    <Button variant="contained" color="secondary">
                                      {evolution.name}
                                    </Button>
                                </ListItem>
                              </List>
                            )
                          })
                        :"No Pre Evaolution"
                      }
                      </Grid>
                      <Grid style={{marginLeft:'20%'}}>
                      <h5>Next Evolution</h5>
                      {
                        (pokemonDetails.next_evolution) ?
                        pokemonDetails.next_evolution.map(evolution=>{
                          return(
                            <List>
                              <ListItem key={`${pokemonDetails.id}|${evolution.name}`} style={{ padding: 0}}>
                                  <Button variant="contained" color="secondary">
                                    {evolution.name}
                                  </Button>
                              </ListItem>
                            </List>
                          )
                        })
                        :"No Next Evaolution"
                      }
                      </Grid>
                  </Grid>
              </CardContent>
              <CardActions>
              <Button variant="contained" color="primary" onClick={this.back}>Back</Button>
              </CardActions>
          </Card>
      </Grid>
    )
  }
}

export default PokemonDetails;
