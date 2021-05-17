import { Header } from '../../components/Header';
import { FoodCard } from '../../components/FoodCard';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';

import { FoodsContainer } from './styles';
import { useFood } from '../../hooks/useFood';

function Dashboard(){
  const { 
    foods,         
    addFoodModalOpen,
    editFoodModalOpen,
    toggleAddFoodModal,
    toggleEditFoodModal,    
  } = useFood()

  return(
    <>
      <Header />
      <ModalAddFood isOpen={addFoodModalOpen} setIsOpen={toggleAddFoodModal} />
      <ModalEditFood isOpen={editFoodModalOpen} setIsOpen={toggleEditFoodModal} />
      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <FoodCard key={food.id} food={food} />
          ))}
      </FoodsContainer>
    </>
  )
}

export { Dashboard }
