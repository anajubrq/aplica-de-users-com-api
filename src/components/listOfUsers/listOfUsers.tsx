"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import EditUser from "../editUsersForm/editUsersForm";
import { UserDeleteModal } from "../userDeleteModal/userDeleteModal";


export interface User {
  id: number;
  name: string;
  cpf: string;
  cep: string;
  neighborhood: string;
  city: string;
  street: string;
  dateBirth: string;
}

export interface listOfUsersProps {
  user: User[];
   setUsers: React.Dispatch<React.SetStateAction<User[]>>;
 userDeleteFunction:(id:number)=>void;
 editUserData:(id:number)=>void;
}

export function ListOfUsers({ user, setUsers, userDeleteFunction, editUserData }: listOfUsersProps) {
  const [openDelete, setOpenDelete] = useState<number | null>(null);
  const [userEdit, setUserEdit] = useState<User | undefined>(undefined);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error when searching for users:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []); 
 
 const  handleDeleteUser = async (id: number) => {
 await userDeleteFunction(id); 
   fetchUsers();
   setOpenDelete(null);
   }


  return (
    <Table>
      <TableCaption>List of registered users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>CPF</TableHead>
          <TableHead>CEP</TableHead>
          <TableHead>Neighborhood</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Street</TableHead>
          <TableHead>Date of birth</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {user.map((singleUser) => (
          <TableRow key={singleUser.id}>
            <TableCell className="font-medium">{singleUser.name}</TableCell>
            <TableCell>{singleUser.cpf}</TableCell>
            <TableCell>{singleUser.cep}</TableCell>
            <TableCell>{singleUser.neighborhood}</TableCell>
            <TableCell>{singleUser.city}</TableCell>
            <TableCell>{singleUser.street}</TableCell>
            <TableCell>{singleUser.dateBirth}</TableCell>
            <TableCell>
              <button onClick={() => setUserEdit(singleUser)}>
                <img src="/images/edit.png" className="w-[25px]" alt="Edit" />
              </button>
              {userEdit && (
                <EditUser
                  isOpen={!!userEdit}
                  setModalOpen={() => setUserEdit(undefined)}
                  user={userEdit}
                />
              )}

              <button onClick={() => setOpenDelete(singleUser.id)}>
                <img src="/images/delete.png" className="w-[20px]" alt="Delete" />
              </button>
            <UserDeleteModal
                isOpenDelete={openDelete === singleUser.id}
                setOpenDelete={() => setOpenDelete(null)}
                user={singleUser}
                userDeleteFunction={() => handleDeleteUser(singleUser.id!)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
