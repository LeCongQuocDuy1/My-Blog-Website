import React, {useEffect } from "react";
import InputForm from '../../../components/InputForm';
import {useForm} from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../App.css'
import { apiUpdateCategory } from "../../../apis/category";
import Swal from "sweetalert2";

const UpdateCategory = ({editCategory, render, setEditCategory}) => {
  const {register, handleSubmit, formState: {errors}, watch, reset} = useForm();

  const handleUpdatePost = async (data) => {
    if(editCategory?._id) {
      const response = await apiUpdateCategory(editCategory?._id, data);
      if(response.status) {
          Swal.fire(
              'Successfully!',
              'Update a category successfully!',
              'success'
          ).then((result) => {
              if (result.isConfirmed) {
                  reset();
                  window.location.reload();
              }
          })
      } else {
          toast.error("Update a category failed!", {position: "top-center",});
      }
    }
  }

  useEffect(() => {
        reset({
            title: editCategory?.title || "",
        });
  }, [editCategory])

  return (
    <div className="w-full">
        <ToastContainer autoClose={3000} />
        <div className="px-4 mb-5 border-b w-full flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight">Update Category</h1>
        </div>
        <div className="p-5">
                <form onSubmit={handleSubmit(handleUpdatePost)}>
                    <InputForm
                        label="Title"
                        register={register}
                        errors={errors}
                        id="title"
                        validate={({
                            required: "title is required!",
                        })}
                        placeholderText="Title of category..."
                        style={"mb-[20px]"}
                    />
                    <div className="flex items-center gap-4">
                        <button type="submit" className="bg-green-400 text-white w-[200px] text-[26px] px-3 py-2 rounded-md hover:bg-green-500 mb-[10px]">Update</button>
                        <button type="button" onClick={() => setEditCategory(null)} className="bg-red-400 text-white w-[200px] text-[26px] px-3 py-2 rounded-md hover:bg-red-500 mb-[10px]">Back</button>
                    </div>
                </form>
        </div>
    </div>
  )
}

export default UpdateCategory