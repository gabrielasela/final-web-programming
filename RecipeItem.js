import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdPeopleOutline, MdAccessTime } from 'react-icons/md';
import './RecipeItem.scss';

const API_ID = 'b57c35cc';
const API_KEY = '375d2e2dfce5dc466c8203b6a2d7c7a5';

const RecipeItem = props => {
  const [state, setState] = useState([]);
  const food = props.location.state.title;
  useEffect(() => {
    axios
      .get(
        `https://api.edamam.com/search?q=${food}&app_id=${API_ID}&app_key=${API_KEY}`
      )
      .then(res => setState(res.data.hits[0].recipe))
      .catch(err => console.log(err));
    // eslint-disable-next-line
  }, []);
  return (
    <div className='recipe-container'>
      <div className='recipe-item'>
        <img src={state.image} alt='Food' className='recipe-item__pht' />
        <div className='recipe-item__box'>
          <h2>{state.label}</h2>
        </div>
        <p>by {state.source}</p>
        <div className='recipe-item__info'>
          <div>
            <h4>
              <MdPeopleOutline /> {state.yield}
            </h4>
            <p>Serving</p>
          </div>
          <div>
            <h4>
              <MdAccessTime /> {state.totalTime}
            </h4>
            <p>Minutes</p>
          </div>
          <div>
            <h4>{Math.round(state.calories).toString()}</h4>
            <p>Calories</p>
          </div>
        </div>

        <div className='recipe-item__igredients'>
          <ul>
            {state.ingredientLines ? (
              state.ingredientLines.map((num, index) => {
                return <li key={index}>{num}</li>;
              })
            ) : (
              <li></li>
            )}
          </ul>
          <a href={state.url}>More</a>
        </div>
        <Link to='/'>Home</Link>
      </div>
    </div>
  );
};

export default RecipeItem;
