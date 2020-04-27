import React, {Component} from 'react';

class Poke extends Component {

    state={
        funnyjoke: ""
    }

    componentDidMount() {
        if (!navigator.onLine) {
            if (localStorage.getItem('funnyjoke') === null)
                this.setState({funnyjoke: ""})
            else
                this.setState({funnyjoke: localStorage.getItem('funnyjoke')});
        }
        let poke = Math.floor(Math.random()*(700))+1
        console.log(poke)
        fetch("https://pokeapi.co/api/v2/pokemon/"+poke.toString())
            .then(res => {
                return res.json();
            }).then(res => {
                console.log(res)
                this.setState({ funnyjoke: res });
                localStorage.setItem('funnyjoke', res);
        });
    }


    render() {
        if(this.state.funnyjoke===""){
            return(
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        }else{
            return (
                <div>
                    <br />
                    <br />
                    <img src={this.state.funnyjoke.sprites.front_default} />
                    <br />
                    <ul>
                        <li> <h3>{this.state.funnyjoke.name}</h3> </li>
                        <li> <h6>#{this.state.funnyjoke.id}</h6> </li>
                        <li> <p>Atack: {this.state.funnyjoke.stats[4].base_stat}</p> </li>
                        <li> <p>Defense: {this.state.funnyjoke.stats[3].base_stat}</p> </li>
                        <li> <p>Life points: {this.state.funnyjoke.stats[5].base_stat}</p> </li>
                    </ul>
                </div>
        );
        }
    }
}

export default Poke;