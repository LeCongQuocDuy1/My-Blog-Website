import React, { memo, useCallback, useEffect, useState } from "react";
import {useSelector} from "react-redux";
import InputForm from '../../../components/InputForm';
import {useForm} from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
import '../../../App.css'
import Select from "../../../components/Select";
import ContentEditor from "../../../components/ContentEditor";
import validate from '../../../ultils/validate'
import { getBase64 } from "../../../ultils/common";
import icons from '../../../ultils/icons';
import { apiUpdatePost } from "../../../apis/post";
import Swal from "sweetalert2";

const UpdatePost = ({editPost, render, setEditPost}) => {
    const {categories} = useSelector(state => state.app);
    const {register, handleSubmit, formState: {errors}, watch, reset} = useForm();
    const [payload, setPayload] = useState({
        content: '',
        image: null,
    });
    const [invalidFields, setInvalidFields] = useState([]);

    const changeContentValue = useCallback((e) => {
        setPayload(e)
    }, [payload]);

    const handlePreviewImage = async (file) => {
        const base64Thumb = await getBase64(file);                                                                              
        setPayload(prev => ({...prev, image: base64Thumb}))
    }

    useEffect(() => {
        if(watch('image')) {
            handlePreviewImage(watch('image')[0]);
        }
    }, [watch('image')])

    const handleUpdatePost = async (data) => {
        const invalids = validate({content: payload.content}, setInvalidFields);

        if (invalids === 0) {
            const finalDatas = {...data, ...payload, user: editPost.user._id};
            console.log(finalDatas);
            if(editPost?._id && finalDatas) {
                const response = await apiUpdatePost(editPost?._id, finalDatas);
                if(response.status) {
                    Swal.fire(
                        'Successfully!',
                        'Update a post successfully!',
                        'success'
                    ).then((result) => {
                        if (result.isConfirmed) {
                            setPayload({
                                content: '',
                                image: null,
                            });
                            reset();
                            window.location.reload();
                        }
                    })
                } else {
                    toast.error("Update a post failed!", {position: "top-center",});
                }
            }
        }
    }

    useEffect(() => {
        reset({
            title: editPost?.title || "",
            description: editPost?.description || "",
        });
        setPayload(prev => ({...prev, content: editPost?.content}))
    }, [editPost])

return (
    <div className="w-full">
        <ToastContainer autoClose={3000} />
        <div className="px-4 mb-5 border-b w-full flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight">Update Post</h1>
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
                        placeholderText="Title of new post..."
                        style={"mb-[20px]"}
                    />
                    <InputForm
                        label="Description"
                        register={register}
                        errors={errors}
                        id="description"
                        validate={({
                            required: "description is required!",
                        })}
                        placeholderText="Description of new post..."
                        style={"mb-[20px]"}
                    />
                    <div className="">
                        <ContentEditor
                            name="content"
                            label="Content"
                            value={payload.content}
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                            changeContentValue={changeContentValue}
                        />
                    </div>
                    <div className="mt-[20px]">
                        <Select
                            label="Category Post"
                            id={'category'}
                            errors={errors}
                            register={register}
                            validate={({
                                required: "categories is required!",
                            })}
                            active={editPost?.category?._id}
                            options={categories?.map(el => ({code: el._id, value: el.title}))}
                        />
                    </div>
                    <div className="">
                        <label htmlFor="user" className='mb-[5px] block text-left'>User create post</label>
                        <input 
                            type="text"
                            id="user"
                            disabled={true}
                            defaultValue={`${editPost?.user?.firstName} ${editPost?.user?.lastName}`}
                            placeholder="User create of new post..." 
                            className="outline-none border-[1px] w-full border-[#d3d3d3] py-[5px] px-[10px] text-[16px] text-[#000] mb-[5px]"
                        />
                    </div>
                    <div className="mb-[20px]">
                        <label className='mt-[20px] block text-left'>Image</label>
                        <label htmlFor="image" className='my-[10px] flex flex-col bg-white hover:bg-[#ffffffa6] cursor-pointer items-center justify-center w-[240px] h-[140px] border border-[#000]'>
                                <p className="text-[20px] text-[#000]">Upload image</p>
                                <icons.AiOutlineDownload size={35} />
                                <InputForm
                                    type="file"
                                    id="image"
                                    register={register}
                                    errors={errors}
                                    validate={({
                                        required: "Image is required!",
                                    })}
                                    hidden={true}
                                />
                            </label>
                        {editPost?.image && (
                            <div className='my-[10px] w-[240px] h-[140px]'>
                                <img src={!payload?.image ? editPost?.image : payload?.image} alt="Image post" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-4">
                        <button type="submit" className="bg-green-400 text-white w-[200px] text-[26px] px-3 py-2 rounded-md hover:bg-green-500 mb-[10px]">Update</button>
                        <button type="button" onClick={() => setEditPost(null)} className="bg-red-400 text-white w-[200px] text-[26px] px-3 py-2 rounded-md hover:bg-red-500 mb-[10px]">Back</button>
                    </div>
                </form>
        </div>
    </div>
)
}

export default memo(UpdatePost)