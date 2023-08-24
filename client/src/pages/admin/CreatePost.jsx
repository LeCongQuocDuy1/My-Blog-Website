import React, { useCallback, useEffect, useState } from "react";
import {useSelector} from "react-redux";
import InputForm from '../../components/InputForm';
import {useForm} from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
import '../../App.css'
import Select from "../../components/Select";
import ContentEditor from "../../components/ContentEditor";
import validate from '../../ultils/validate'
import { getBase64 } from "../../ultils/common";
import icons from '../../ultils/icons';
import { apiCreatePost } from "../../apis/post";

const CreatePost = () => {
    const {categories} = useSelector(state => state.app);
    const {current} = useSelector(state => state.user);
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
        handlePreviewImage(watch('image')[0]);
    }, [watch('image')])

    const handleCreatePost = async (data) => {
        const invalids = validate({content: payload.content}, setInvalidFields);

        if (invalids === 0) {
            const finalDatas = {...data, ...payload, user: current._id};
            const response = await apiCreatePost(finalDatas);
            if(response.status) {
                toast.success("Create a post successfully!", {position: "top-center",});
                setPayload({
                    content: '',
                    image: null,
                });
                reset();
                window.scrollTo(0, 0);
            } else {
                toast.error("Create a post failed!", {position: "top-center",});
            }
        }
    }

    return <div className="w-full">
        <ToastContainer autoClose={3000} />
        <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b border-[#666]">
            <span>Create New Post</span>
        </h1>
        <div className="p-5">
            <form onSubmit={handleSubmit(handleCreatePost)}>
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
                        options={categories?.map(el => ({code: el._id, value: el.title}))}
                    />
                </div>
                <div className="">
                    <label htmlFor="user" className='mb-[5px] block text-left'>User create post</label>
                    <input 
                        type="text"
                        id="user"
                        disabled={true}
                        defaultValue={`${current?.firstName} ${current?.lastName}`}
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
                    {payload.image && (
                        <div className='my-[10px] w-[240px] h-[140px]'>
                            <img src={payload.image} alt="Image post" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>
                <button type="submit" className="bg-green-400 text-white w-[200px] text-[26px] px-3 py-2 rounded-md hover:bg-green-500 mb-[10px]">Create</button>
            </form>
        </div>
    </div>;
};

export default CreatePost;
