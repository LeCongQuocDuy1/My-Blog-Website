import React from "react";
import InputForm from '../../../components/InputForm';
import {useForm} from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../App.css'
import { apiCreateCategory } from "../../../apis/category";

const CreateCategory = () => {
    const {register, handleSubmit, formState: {errors}, watch, reset} = useForm();

    const handleCreateCategory = async (data) => {
        const response = await apiCreateCategory(data);
            if(response.status) {
                toast.success("Create a category successfully!", {position: "top-center",});
                reset();
                window.scrollTo(0, 0);
            } else {
                toast.error("Create a category failed!", {position: "top-center",});
        }
    }

    return <div className="w-full">
        <ToastContainer autoClose={3000} />
        <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b border-[#666]">
            <span>Create New Category</span>
        </h1>
        <div className="p-5">
            <form onSubmit={handleSubmit(handleCreateCategory)}>
                <InputForm
                    label="Title"
                    register={register}
                    errors={errors}
                    id="title"
                    validate={({
                        required: "title is required!",
                    })}
                    placeholderText="Title of new category..."
                    style={"mb-[20px]"}
                />
                <button type="submit" className="bg-green-400 text-white w-[200px] text-[26px] px-3 py-2 rounded-md hover:bg-green-500 mb-[10px]">Create</button>
            </form>
        </div>
    </div>;
};

export default CreateCategory;
