import React, {Component} from 'react'

class FoodBox extends Component{
  state= {
    quantity: 0
  }

  handleChange = e => {
    this.setState({ quantity: parseInt(e.target.value) })
  }
  
  render(){
    const {name, image, calories, addFav} = this.props
    const  {quantity} = this.state
    return <div className="box">
    <article className="media">
      <div className="media-left">
        <figure className="image is-64x64">
          <img src={image}/>
        </figure>
      </div>
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{name}</strong> <br />
            <small>{calories}</small>
          </p>
        </div>
      </div>
      <div className="media-right">
        <div className="field has-addons">
          <div className="control">
            <input
              className="input"
              type="number" 
              value={quantity}
              onChange={this.handleChange}
            />
          </div>
          <div className="control">
            <button className="button is-info" onClick={() => addFav({name, image, calories, quantity})}>
              +
            </button>
          </div>
        </div>
      </div>
    </article>
    </div>
  }
}
export default FoodBox