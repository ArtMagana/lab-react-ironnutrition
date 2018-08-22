import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FoodBox from './FoodBox'

class App extends Component {

  state = {
    foods: [
      {
        "name": "Pizza",
        "calories": 400,
        "image": "https://i.imgur.com/eTmWoAN.png",
        "quantity": 0
      },
      {
        "name": "Salad",
        "calories": 150,
        "image": "https://i.imgur.com/DupGBz5.jpg",
        "quantity": 0
      },
      {
        "name": "Sweet Potato",
        "calories": 120,
        "image": "https://i.imgur.com/hGraGyR.jpg",
        "quantity": 0
      },
      {
        "name": "Gnocchi",
        "calories": 500,
        "image": "https://i.imgur.com/93ekwW0.jpg",
        "quantity": 0
      },
      {
        "name": "Pot Roast",
        "calories": 350,
        "image": "https://i.imgur.com/WCzJDWz.jpg",
        "quantity": 0
      },
      {
        "name": "Lasagna",
        "calories": 750,
        "image": "https://i.imgur.com/ClxOafl.jpg",
        "quantity": 0
      },
      {
        "name": "Hamburger",
        "calories": 400,
        "image": "https://i.imgur.com/LoG39wK.jpg",
        "quantity": 0
      },
      {
        "name": "Pad Thai",
        "calories": 475,
        "image": "https://i.imgur.com/5ktcSzF.jpg",
        "quantity": 0
      },
      {
        "name": "Almonds",
        "calories": 75,
        "image": "https://i.imgur.com/JRp4Ksx.jpg",
        "quantity": 0
      },
      {
        "name": "Bacon",
        "calories": 175,
        "image": "https://i.imgur.com/7GlqDsG.jpg",
        "quantity": 0
      },
      {
        "name": "Hot Dog",
        "calories": 275,
        "image": "https://i.imgur.com/QqVHdRu.jpg",
        "quantity": 0
      },
      {
        "name": "Chocolate Cake",
        "calories": 490,
        "image": "https://i.imgur.com/yrgzA9x.jpg",
        "quantity": 0
      },
      {
        "name": "Wheat Bread",
        "calories": 175,
        "image": "https://i.imgur.com/TsWzMfM.jpg",
        "quantity": 0
      },
      {
        "name": "Orange",
        "calories": 85,
        "image": "https://i.imgur.com/abKGOcv.jpg",
        "quantity": 0
      },
      {
        "name": "Banana",
        "calories": 175,
        "image": "https://i.imgur.com/BMdJhu5.jpg",
        "quantity": 0
      },
      {
        "name": "Yogurt",
        "calories": 125,
        "image": "https://i.imgur.com/URhdrAm.png",
        "quantity": 0
      }
    ],
    input: '',
    showFoods: [],
    favorites: [],
    totalCal: 0
  }

  getCalories() {
    let result = 0;
    for (let i = 0; i < this.state.favorites.length; i++) {
      result += this.state.favorites[i].quantity * this.state.favorites[i].calories;
    }
    return result
  }

  filterFood = e => {
    const copyFoods = this.state.foods.filter(food => (food.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()))
    ? food : null)
    this.setState({
      input: e.target.value,
      showFoods: copyFoods
    })
  }

  addFood = food => {
    let exist = false
    this.state.favorites.forEach((fav, i) => {
      (fav.name === food.name) ? exist= true: null
    })
    if(!exist){
      this.setState({
        favorites: [...this.state.favorites, food]
      })
    }else{
      const copyFavs = [...this.state.favorites]
      copyFavs.map(elem => {if(elem.name === food.name){ elem.quantity+= food.quantity}});
      this.setState({
        favorites: copyFavs
      })
    }
    this.getCalories()
  }

  handleDelete = i => {
    let copyDel = [...this.state.favorites]
    copyDel.splice(copyDel.indexOf(i), 1)
    this.setState({favorites: copyDel})
    this.getCalories()
  }


  render() {
    const {input, foods, showFoods, totalCal} = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React Ironhacker</h1>
        </header>
        
        <div className='container'>
        <div className='columns'>
          <div className='column'>
            <input className='input' placeholder='Search some food' value={input} onChange={this.filterFood}/>
              {
                (input === '')?
                foods.map( (food, i) => 
                  <FoodBox key={i} alt={i} {...food} addFav={this.addFood}/>) :

                showFoods.map( (food, i) => 
                  <FoodBox key={i} alt={i} {...food} addFav={this.addFood}/> )
                }
          </div>
          <div className='column'>
            <h2 className='is-size-2'>Today's food: </h2>
            <ul>
              {this.state.favorites.map((fav, i) => <li key={i}>
                  <p className='is-size-3'>{fav.name}</p>
                  <span>calories: {fav.calories}</span><b> Quantity: {fav.quantity}</b>
                  <button style={{margin:'0 10px'}} className='button is-danger is-small' onClick={() => this.handleDelete(fav)}>delete</button>
                </li>)}
            </ul>
            <p>Calories: {this.getCalories()}</p>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default App;