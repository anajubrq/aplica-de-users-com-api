"use client"

import axios from "axios";
import React, { useState } from "react";
import { UserRegister } from "@/components/userCreationForm/userCreationForm";
import Header from "@/components/header/header";
import { ListOfUsers} from "@/components/listOfUsers/listOfUsers";
import UserCreationForm from "@/components/userCreationForm/userCreationForm";

export default function Home() {
  const [users, setUsers] = useState<UserRegister[]>([]);
  const [openModal, setOpenModal] = useState(false);


  const userDeleteFunction = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${id}`);
      console.log("Usuário deletado com sucesso");
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Erro ao deletar o usuário:", error);
    }
  };

 
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <div>
      <Header setOpenModal={handleOpenModal} />
      <ListOfUsers
      editUserData={handleOpenModal} 
        user={users}
        userDeleteFunction={userDeleteFunction}
        setUsers={setUsers}
      />
      <UserCreationForm
        isOpen={openModal}
        setModalOpen={setOpenModal}
      />
    </div>
  );
}
