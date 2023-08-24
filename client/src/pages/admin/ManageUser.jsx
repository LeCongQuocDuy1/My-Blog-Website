import React, { useEffect, useState } from "react";
import { apiGetUsers, apiGetUserById, apiUpdateUser, apiDeleteUser } from "../../apis/user";
import icons from "../../ultils/icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginationsUser from "../../components/PaginationsUser";
import InputForm from "../../components/InputForm";
import Select from "../../components/Select";
import { useForm } from "react-hook-form";
import { roles } from "../../ultils/constant";


const ManageUser = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            role: '',
            avatar: '',
        }
    });
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [queries, setQueries] = useState({
        query: "",
    });

    const fetchUsers = async (params) => {
        const response = await apiGetUsers(params);
        if (response.status) {
            setUsers(response?.users);
        }
    };

    const fetchUserById = async (uid) => {
        const response = await apiGetUserById(uid);
        if (response.status) {
            setUser(response?.response);
        }
    };

    const handleEdit = (id) => {
        fetchUserById(id)
    }

    const handleUpdate = async (data) => {
        const response = await apiUpdateUser(data, user?._id);
        console.log(response);
        if(response.status) {
            toast.success(response.message, {position: "top-center",});
            fetchUsers();
        } else {
            toast.error(response.message, {position: "top-center",});
        }
    }

    const handleDelete = async (id) => {
        const response = await apiDeleteUser(id);
        if(response.status) {
            toast.success(response.response, {position: "top-center",});
            fetchUsers();
        } else {
            toast.error(response.response, {position: "top-center",});
        }
    }

    useEffect(() => {
        if(queries.query) {
            fetchUsers({
                firstName: queries.query,
                limit: 3,
            });
        } else {
            fetchUsers();
        }

    }, [queries.query]);

    return (
        <div className=" p-[20px]">
            <ToastContainer autoClose={3000} />
            <div className="my-[20px] flex items-center bg-[#fff] w-[300px] rounded-lg">
                <icons.AiOutlineSearch className="text-[26px] ml-[10px] cursor-pointer" />
                <input
                    value={queries.query}
                    onChange={(e) => setQueries({query: e.target.value})}
                    type="text"
                    className="py-2 px-3 border-none outline-none bg-transparent w-full text-[16px]"
                    placeholder="Search name user..."
                />
            </div>
            <form onSubmit={handleSubmit(handleUpdate)}>
                {user && <button type="submit" className="bg-blue-400 text-white px-3 py-2 rounded-md hover:bg-blue-500 mb-[10px]">Update</button>}
                <table className="w-full">
                    <thead className="font-bold bg-gray-700 text-[13px] text-white">
                        <tr className="border border-gray-500">
                            <th className="px-4 py-2">First Name</th>
                            <th className="px-4 py-2">Last Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Role</th>
                            <th className="px-4 py-2">Avatar</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((item) => (
                                <tr className="border border-gray-500 text-center" key={item._id}>
                                    <td className="px-4 py-2">
                                        {user?._id === item._id ? <InputForm type="text" defaultValue={user?.firstName} register={register} validate={{required: true}} id="firstName" errors={errors} /> : <span>{item.firstName}</span>}
                                    </td>
                                    <td className="px-4 py-2">
                                        {user?._id === item._id ? <InputForm type="text" defaultValue={user?.lastName} register={register} validate={{required: true}} id="lastName" errors={errors} /> : <span>{item.lastName}</span>}
                                    </td>
                                    <td className="px-4 py-2">
                                    {user?._id === item._id ? <InputForm type="text" defaultValue={user?.email} register={register} validate={{
                                        required: true,
                                        pattern: {
                                            value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                                        }
                                        }} id="email" errors={errors} /> : <span>{item.email}</span>}
                                    </td>
                                    <td className="px-4 py-2">
                                    {user?._id === item._id ? <Select register={register} errors={errors} defaultValue={roles.find(role => role.value === +item.role)?.value} id="role" validate={{required: true}} options={roles} /> : <span>{roles.find(role => role.value === item.role)?.value}</span>}
                                    </td>
                                    <td className="px-4 py-2">
                                    {user?._id === item._id ? <InputForm type="text" defaultValue={user?.avatar} register={register} validate={{required: true}} id="avatar" errors={errors} /> : <img src={item.avatar} width={100} height={100} />}
                                    </td>
                                    <td className="px-4 py-2">  
                                        {user?._id === item._id ? <span
                                        onClick={() => setUser(null)}
                                        className="p-2 bg-gray-400 text-black cursor-pointer rounded-md text-[16px] mr-[5px]">Cancel</span> : <span
                                        onClick={() => handleEdit(item._id)}
                                        className="p-2 bg-blue-400 text-white cursor-pointer rounded-md text-[16px] mr-[5px]">Edit</span>}
                                        <span
                                            onClick={() => handleDelete(item._id)}
                                        className="p-2 bg-red-400 text-white cursor-pointer rounded-md text-[16px]">Delete</span>
                                    </td>
                                </tr>
                        ))}
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default ManageUser;
