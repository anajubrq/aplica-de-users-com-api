"use client";
import React from "react";
import { User } from "../listOfUsers/listOfUsers";

interface userDeleteModalProps {
  isOpenDelete: boolean;
  setOpenDelete: (isOpenDelete: boolean) => void;
  user: User;
  userDeleteFunction:(id:number | undefined)=> void;
}

export function UserDeleteModal({ isOpenDelete, setOpenDelete, user , userDeleteFunction}: userDeleteModalProps) {



  if (isOpenDelete) {
    return (
      <section className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white p-4 rounded-[13px] shadow-lg flex flex-col justify-center items-center gap-[15px] h-[270px]">
          <img src="/images/delete.png" className="w-[25px]" alt="Delete" />
          <h1>Do you really want to delete this user?</h1>
          <div className="flex justify-end mt-4 flex-col gap-[4px]">
            <button
              onClick={() => setOpenDelete(!isOpenDelete)}
              className="bg-gray-300 rounded w-[100px] p-[4px] hover:bg-gray-400 "
            >
              Cancel
            </button>
            <button
              onClick={() => userDeleteFunction(user.id)} 
              className="bg-red-500 text-white w-[100px] p-[4px] rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </section>
    );
  } else {
    return null;
  }
}

