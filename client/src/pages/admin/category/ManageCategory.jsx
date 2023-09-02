import React, { useCallback, useState } from "react";
import {useForm} from 'react-hook-form';
import { useSelector } from "react-redux";
import {apiDeleteCategory, apiGetCategorys} from '../../../apis/category';
import Paginations from '../../../components/Paginations';
import UpdateCategory from "./UpdateCategory";
import Swal from 'sweetalert2';

const ManageCategory = () => {
    const {register, formState: {errors}, handleSubmit, reset } = useForm();
    const { categories } = useSelector((state) => state.app);
    const [categorysLimit, setCategorysLimit] = useState(null);
    const [editCategory, setEditCategory] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const render = useCallback(() => {
        setIsUpdate(!isUpdate);
    })

    const handleSearch = async () => {
        if(searchValue !== "") {
            const response = await apiGetCategorys({title: searchValue});
            if (response.status) setCategorysLimit(response.categories);
        } else {
            const response = await apiGetCategorys();
            if (response.status) setCategorysLimit(response.categories);
        }
    }

    const handleDelete = (id) => {
        Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then( async (result) => {
                if (result.isConfirmed) {
                    const response = await apiDeleteCategory(id);
                    if(response.status) {
                        Swal.fire(
                            'Deleted!',
                            response.response,
                            'success'
                        )
                    }
                    window.location.reload()
                }
            })
    }

    return <div className="w-full relative">
        {editCategory && (<div className="absolute inset-0 p-[20px] h-[1500px] bg-[#b7daf2] z-50">
            <UpdateCategory editCategory={editCategory} setEditCategory={setEditCategory} render={render} />
        </div>)}

        <div className="p-[20px]">
            <div className="px-4 mb-5 border-b w-full flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Manage Categories</h1>
            </div>
            <div className="mb-[25px] w-full">
                <form onSubmit={handleSubmit(handleSearch)} className="flex items-center justify-end gap-3">
                    <input 
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="inline-block outline-none border-[1px] w-[300px] border-[#d3d3d3] py-[5px] px-[10px] text-[16px] text-[#000] mb-[5px]"
                        placeholder="Search category by title"
                    />
                    <button onClick={handleSearch} className="px-[10px] mb-[5px] py-[5px] bg-green-400 text-white cursor-pointer rounded-md text-[16px]">Search</button>
                </form>
            </div>
            <table className="w-full">
                <thead className="font-bold bg-gray-700 text-[13px] text-white">
                    <tr className="border border-gray-500">
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categorysLimit?.map(item => (
                        <tr className="border border-gray-500 text-center" key={item._id}>
                            <td className="px-4 py-2">{item.title}</td>
                            <td className="px-4 py-2">
                                <span
                                    onClick={() => setEditCategory(item)}
                                    className="p-2 bg-blue-400 text-white cursor-pointer rounded-md text-[16px] mr-[5px]"
                                >
                                    Edit
                                </span>
                                <span
                                    onClick={() => handleDelete(item._id)}
                                    className="p-2 bg-red-400 text-white cursor-pointer rounded-md text-[16px]"
                                >
                                    Delete
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="w-full flex items-center justify-end my-8">
                <Paginations type="categories" categories={categories} setLimits={setCategorysLimit} searchValue={searchValue} setSearchValue={setSearchValue} isUpdate={isUpdate} />
            </div>
        </div>
    </div>;
};

export default ManageCategory;
