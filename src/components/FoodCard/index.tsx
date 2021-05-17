import { useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';

import { api } from '../../services/api';
import { useFood } from '../../hooks/useFood';

import { FoodProps } from '../../types';

import { Container } from './styles';

interface FoodCardProps{
  food: FoodProps;    
}

function FoodCard({ food }: FoodCardProps){
  const { handleEditFood, handleDeleteFood } = useFood()
 
  const [isAvailable, setIsAvailable] = useState(true)

  const toggleAvailable = async (id: number) => {
    await api.put(`/foods/${id}`, {
      ...food,
      available: !isAvailable,
    });

    setIsAvailable(prevState => !prevState);
  } 
  
  return(
    <Container available={isAvailable}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => handleEditFood(food)}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDeleteFood(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={() => toggleAvailable(food.id)}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  )
}

export { FoodCard }