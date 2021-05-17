import { useContext, useState, useEffect, createContext, ReactNode } from 'react'

import { api } from '../services/api'
import { FoodProps } from '../types'

interface FoodContextProps{
  foods: FoodProps[];
  setFoods: (foods: FoodProps[]) => void;

  editingFood: FoodProps | undefined;  
  handleEditFood: (food: FoodProps) => void

  addFoodModalOpen: boolean;
  toggleAddFoodModal: () => void;

  editFoodModalOpen: boolean;
  toggleEditFoodModal: () => void;

  handleUpdateFood: (food: FoodProps) => void;
  handleAddFood: (food: FoodProps) => void;
  handleDeleteFood: (id: number) => void;

}

interface FoodProviderProps{
  children: ReactNode;
}

const FoodContext = createContext<FoodContextProps>({} as FoodContextProps)

function FoodProvider({ children }: FoodProviderProps): JSX.Element {
  const [foods, setFoods] = useState<FoodProps[]>([])
  const [editingFood, setEditingFood] = useState<FoodProps>()
  const [addFoodModalOpen, setAddFoodModalOpen] = useState(false)
  const [editFoodModalOpen, setEditFoodModalOpen] = useState(false)

  useEffect(() => {
    async function getFoods(){
      const { data } = await api.get<FoodProps[]>('/foods');      
      setFoods(data)
      
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
    <FoodContext.Provider value={{
      foods,
      setFoods,

      editingFood,      
      handleEditFood, 

      addFoodModalOpen,
      toggleAddFoodModal,

      editFoodModalOpen,
      toggleEditFoodModal,

      handleUpdateFood,
      handleAddFood,
      handleDeleteFood
      
    }}>
      {children}
    </FoodContext.Provider>
  )
}

function useFood(): FoodContextProps {
  const context = useContext(FoodContext)
  return context
}

export { useFood, FoodProvider }
