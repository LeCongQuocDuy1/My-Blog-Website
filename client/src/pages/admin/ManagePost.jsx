import React, { useEffect, useState } from "react";
import InputForm from "../../components/InputForm";
import {useForm} from 'react-hook-form'
import { useSelector } from "react-redux";
import {apiGetPosts} from '../../apis/post'
import Paginations from '../../components/Paginations'

const ManagePost = () => {
    const {register, formState: {errors}, handleSubmit, reset } = useForm();
    // const [posts, setPosts] = useState(null);
    const { posts } = useSelector((state) => state.post);
    const [postsLimit, setPostsLimit] = useState(null);

    // const fetchProducts = async (param) => {
    //     const response = await apiGetPosts(param);
    //     if(response.status) setPosts(response.posts)
    // }

    const handleUpdatePost = () => {

    }

    // useEffect(() => {
    //     fetchProducts();
    // }, [])

    return <div className="p-[20px]">
        <div className="px-4 mb-5 border-b w-full flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight">Manage Posts</h1>
        </div>
        <div className="mb-[25px] w-full">
            <form onSubmit={handleSubmit(handleUpdatePost)} className="flex items-center justify-end gap-3">
                <InputForm
                    id="q"
                    register={register}
                    errors={errors}
                    placeholderText={`Search post by title, desc `}
                />
                <button className="px-[10px] mb-[5px] py-[5px] bg-green-400 text-white cursor-pointer rounded-md text-[16px]">Search</button>
            </form>
        </div>
        <table className="w-full">
            <thead className="font-bold bg-gray-700 text-[13px] text-white">
                <tr className="border border-gray-500">
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Image</th>
                    <th className="px-4 py-2">Category post</th>
                    <th className="px-4 py-2">User post</th>
                    <th className="px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {postsLimit?.map(item => (
                    <tr className="border border-gray-500 text-center" key={item._id}>
                        <td className="px-4 py-2">{item.title}</td>
                        <td className="px-4 py-2"><img src={item.image} alt="" width={200} height={150} className="max-h-[150px]" /></td>
                        <td className="px-4 py-2">{item.category?.title}</td>
                        <td className="px-4 py-2">{`${item.user?.firstName} ${item.user?.lastName}`}</td>
                        <td className="px-4 py-2">
                            <span
                                onClick={() => handleEdit(item._id)}
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
            <Paginations posts={posts} setPostsLimit={setPostsLimit} />
        </div>
    </div>;
};

export default ManagePost;
