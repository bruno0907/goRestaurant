import { useState, useEffect } from 'react';

import { Header } from '../../components/Header';
import { FoodCard } from '../../components/FoodCard';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';

import api from '../../services/api';

import { FoodsContainer } from './styles';

interface FoodProps{
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  available: boolean;
}

function Dashboard(){
  const [addFoodModalOpen, setAddFoodModalOpen] = useState(false)
  const [editFoodModalOpen, setEditFoodModalOpen] = useState(false)
  const [foods, setFoods] = useState<FoodProps[]>([])
  const [editingFood, setEditingFood] = useState<FoodProps>()
  
  
  useEffect(() => {
    async function getFoods(){
      const response = await api.get('/foods');      
      setFoods(response.data)
      
    }
    getFoods()

  }, [])  

  function toggleAddFoodModal(){
    setAddFoodModalOpen(prevState => !prevState)    
  }

  function toggleEditFoodModal(){
    setEditFoodModalOpen(prevState => !prevState)
  }

  function handleEditFood(food: FoodProps){
    setEditingFood(food)    
    toggleEditFoodModal()
  }

  async function handleAddFood(food: FoodProps){
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food: FoodProps){       
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood?.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(id: number){    
    await api.delete(`/foods/${id}`);
    const foodsFiltered = foods.filter(food => food.id !== id);
    setFoods(foodsFiltered);
  }

  return(
    <>
      <Header openModal={toggleAddFoodModal} />
      <ModalAddFood
        isOpen={addFoodModalOpen}
        setIsOpen={toggleAddFoodModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editFoodModalOpen}
        setIsOpen={toggleEditFoodModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <FoodCard
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  )
}

export { Dashboard }
