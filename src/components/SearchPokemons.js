import React from 'react';
import SearchBar from 'material-ui-search-bar';



class SearchPokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon:''
    };
    // this.searchPokemon = this.searchPokemon.bind(this);
    // this.handlePokemonName = this.handlePokemonName.bind(this);
  }

  search=()=>{
    // const { dispatch } = this.props;
    this.props.store.dispatch(this.props.searchPokemon(this.state.pokemon))
  }


  handlePokemonName=(e)=>{
      this.setState({pokemon:e});
  }


  render() {
    return (
      <SearchBar
      onChange={this.handlePokemonName}
      onRequestSearch={this.serach}
      value={this.state.pokemon}
      placeholder="Search Pokemon"
      style={{
        margin: '0 auto',
        maxWidth: 800
      }}
    />
    )
  }
}

export default connect(mapStateToProps,actionCreators)(SearchPokemon);
