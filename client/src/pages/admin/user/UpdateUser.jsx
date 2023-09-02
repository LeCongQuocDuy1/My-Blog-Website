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
import { apiUpdateUser } from "../../../apis/user";
import Swal from "sweetalert2";

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

const UpdateUser = ({editUser, render, setEditUser}) => {
    const {register, handleSubmit, formState: {errors}, watch, reset} = useForm();
    const [payload, setPayload] = useState({
        avatar: null,
    });

    const handlePreviewAvatar = async (file) => {
        const base64Thumb = await getBase64(file);                                                                              
        setPayload(prev => ({...prev, avatar: base64Thumb}))
    }

    useEffect(() => {
        if(watch('avatar')) {
            handlePreviewAvatar(watch('avatar')[0]);
        }
    }, [watch('avatar')])

    const handleUpdateUser = async (data) => {
        const finalDatas = {...data, ...payload};
            if(editUser?._id && finalDatas) {
                const response = await apiUpdateUser(editUser?._id, finalDatas);
                if(response.status) {
                    Swal.fire(
                        'Successfully!',
                        'Update a user successfully!',
                        'success'
                    ).then((result) => {
                        if (result.isConfirmed) {
                            setPayload({
                                avatar: null,
                            });
                            reset();
                            window.location.reload();
                        }
                    })
                } else {
                    toast.error("Update a user failed!", {position: "top-center",});
                }
            }
    }

    useEffect(() => {
        reset({
            firstName: editUser?.firstName || "",
            lastName: editUser?.lastName || "",
            email: editUser?.email || "",
            role: editUser?.role || "",
        });
    }, [editUser])

return (
    <div className="w-full">
        <ToastContainer autoClose={3000} />
        <div className="px-4 mb-5 border-b w-full flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight">Update User</h1>
        </div>
        <div className="p-5">
                <form onSubmit={handleSubmit(handleUpdateUser)}>
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
                            errors={errors}
                            type="user"
                            register={register}
                            validate={({
                                required: "role is required!",
                            })}
                            active={editUser?.role}
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
                        {editUser?.avatar && (
                            <div className='my-[10px] w-[240px] h-[140px]'>
                                <img src={!payload?.avatar ? editUser?.avatar : payload?.avatar} alt="Avatar user" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-4">
                        <button type="submit" className="bg-green-400 text-white w-[200px] text-[26px] px-3 py-2 rounded-md hover:bg-green-500 mb-[10px]">Update</button>
                        <button type="button" onClick={() => setEditUser(null)} className="bg-red-400 text-white w-[200px] text-[26px] px-3 py-2 rounded-md hover:bg-red-500 mb-[10px]">Back</button>
                    </div>
                </form>
        </div>
    </div>
)
}

export default memo(UpdateUser)