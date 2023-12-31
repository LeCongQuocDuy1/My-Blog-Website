import React, { useCallback, useState } from "react";
import {useForm} from 'react-hook-form';
import { useSelector } from "react-redux";
import {apiDeletePost, apiGetPosts} from '../../../apis/post';
import Paginations from '../../../components/Paginations';
import UpdatePost from "./UpdatePost";
import Swal from 'sweetalert2';

const ManagePost = () => {
    const {register, formState: {errors}, handleSubmit, reset } = useForm();
    const { posts } = useSelector((state) => state.post);
    const [postsLimit, setPostsLimit] = useState(null);
    const [editPost, setEditPost] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const render = useCallback(() => {
        setIsUpdate(!isUpdate);
    })

    const handleSearch = async () => {
        if(searchValue !== "") {
            const response = await apiGetPosts({title: searchValue});
            if (response.status) setPostsLimit(response.posts);
        } else {
            const response = await apiGetPosts();
            if (response.status) setPostsLimit(response.posts);
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
                    const response = await apiDeletePost(id);
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

    return (
        <div className="w-full relative">
            {editPost && (<div className="absolute inset-0 p-[20px] h-[1500px] bg-[#b7daf2] z-50">
                <UpdatePost editPost={editPost} setEditPost={setEditPost} render={render} />
            </div>)}

            <div className="p-[20px]">
                <div className="px-4 mb-5 border-b w-full flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight">Manage Posts</h1>
                </div>
                <div className="mb-[25px] w-full">
                    <form onSubmit={handleSubmit(handleSearch)} className="flex items-center justify-end gap-3">
                        <input 
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="inline-block outline-none border-[1px] w-[300px] border-[#d3d3d3] py-[5px] px-[10px] text-[16px] text-[#000] mb-[5px]"
                            placeholder="Search post by title"
                        />
                        <button onClick={handleSearch} className="px-[10px] mb-[5px] py-[5px] bg-green-400 text-white cursor-pointer rounded-md text-[16px]">Search</button>
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
                                        onClick={() => setEditPost(item)}
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
                    <Paginations type="posts" posts={posts} setLimits={setPostsLimit} searchValue={searchValue} setSearchValue={setSearchValue} isUpdate={isUpdate} />
                </div>
            </div>
        </div>
    );
};

export default ManagePost;
