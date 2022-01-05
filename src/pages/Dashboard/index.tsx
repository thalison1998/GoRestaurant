import React from "react";
import { Food } from "../../components/Food";
import { Header } from "../../components/Header";

import { ModalAddFood } from "../../components/ModalAddFood";
import { ModalEditFood } from "../../components/ModalEditFood";
import api from "../../services/api";
import { DataProps, FoodArray } from "../../types";
import { FoodsContainer } from "./styles";

export const DashBoard = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [editingFood, setEditingFood] = React.useState<FoodArray>(
    {} as FoodArray
  );

  const [foods, setFood] = React.useState<FoodArray[]>([]);

  const toggleModal = () => setModalOpen((props) => !props);
  const toggleEditModal = () => setEditModalOpen((props) => !props);

  React.useEffect(() => {
    (async () => {
      const response = await api.get("/foods");
      setFood(response.data);
    })();
  }, []);

  const handleAddFood = async (food: DataProps) => {
    try {
      const response = await api.post("/foods", {
        ...food,
        available: true,
      });
      setFood((foods) => [...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id: number) => {
    await api.delete(`/foods/${id}`);
    const foodsFiltered = foods.filter((food) => food.id !== id);
    setFood(foodsFiltered);
  };

  const handleEditFood = (food: FoodArray) => {
    setEditingFood(food);
    setEditModalOpen(true);
  };

  const handleUpdateFood = async (food: DataProps) => {
    try {
      const foodUpdated = await api.put(`/foods/${editingFood.id}`, {
        ...editingFood,
        ...food,
      });
      
      const foodsUpdated = foods.map((f) =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      );

      setFood(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header openModal={toggleModal} />

      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />

      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food) => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDelete}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};
