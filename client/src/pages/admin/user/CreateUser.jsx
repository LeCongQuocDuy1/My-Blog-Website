import React, { useCallback, useEffect, useState } from "react";
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
import { apiRegister } from "../../../apis/user";

const roles = [
    {
        _id: 1,
        title: "admin",
    },
    {
        _id: 2,
        title: "user",
    }
];

const CreateUser = () => {
    const {register, handleSubmit, formState: {errors}, watch, reset} = useForm();
    const [payload, setPayload] = useState({
        avatar: null,
    });

    const handlePreviewAvatar = async (file) => {
        const base64Thumb = await getBase64(file);                                                                              
        setPayload(prev => ({...prev, avatar: base64Thumb}))
    }

    useEffect(() => {
        handlePreviewAvatar(watch('avatar')[0]);
    }, [watch('avatar')])

    const handleCreateUser = async (data) => {
        const finalDatas = {...data, ...payload};
        const response = await apiRegister(finalDatas);
            if(response.status) {
                toast.success("Create a user successfully!", {position: "top-center",});
                setPayload({
                    avatar: null,
                });
                reset();
                window.scrollTo(0, 0);
            } else {
                toast.error("Create a user failed!", {position: "top-center",});
            }
    }

    return <div className="w-full">
        <ToastContainer autoClose={3000} />
        <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b border-[#666]">
            <span>Create New User</span>
        </h1>
        <div className="p-5">
            <form onSubmit={handleSubmit(handleCreateUser)}>
            <InputForm
                        label="First Name"
                        register={register}
                        errors={errors}
                        id="firstName"
                        validate={({
                            required: "firstName is required!",
                        })}
                        placeholderText="First Name of new user..."
                        style={"mb-[20px]"}
                    />
                    <InputForm
                        label="Last Name"
                        register={register}
                        errors={errors}
                        id="lastName"
                        validate={({
                            required: "lastName is required!",
                        })}
                        placeholderText="Last Name of new user..."
                        style={"mb-[20px]"}
                    />
                    <InputForm
                        type="password"
                        label="Password"
                        register={register}
                        errors={errors}
                        id="password"
                        validate={({
                            required: "password is required!",
                        })}
                        placeholderText="Password of new post..."
                        style={"mb-[20px]"}
                    />
                    <InputForm
                        label="Email"
                        register={register}
                        errors={errors}
                        id="email"
                        validate={({
                            required: "email is required!",
                        })}
                        placeholderText="Email of new post..."
                        style={"mb-[20px]"}
                    />
                    <div className="mt-[20px]">
                        <Select
                            label="Role User"
                            id={'role'}
                            type="user"
                            errors={errors}
                            register={register}
                            validate={({
                                required: "role is required!",
                            })}
                            options={roles?.map(el => ({code: el._id, value: el.title}))}
                        />
                    </div>
                <div className="mb-[20px]">
                        <label className='mt-[20px] block text-left'>Avatar</label>
                        <label htmlFor="avatar" className='my-[10px] flex flex-col bg-white hover:bg-[#ffffffa6] cursor-pointer items-center justify-center w-[240px] h-[140px] border border-[#000]'>
                                <p className="text-[20px] text-[#000]">Upload avatar</p>
                                <icons.AiOutlineDownload size={35} />
                                <InputForm
                                    type="file"
                                    id="avatar"
                                    register={register}
                                    errors={errors}
                                    validate={({
                                        required: "Avatar is required!",
                                    })}
                                    hidden={true}
                                />
                            </label>
                        {payload?.avatar && (
                            <div className='my-[10px] w-[240px] h-[140px]'>
                                <img src={!payload?.avatar ? payload?.avatar : payload?.avatar} alt="Avatar user" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>
                <button type="submit" className="bg-green-400 text-white w-[200px] text-[26px] px-3 py-2 rounded-md hover:bg-green-500 mb-[10px]">Create</button>
            </form>
        </div>
    </div>;
};

export default CreateUser;
