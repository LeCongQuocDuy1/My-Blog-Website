import React, { useEffect, useState } from "react";
import BarChart from "../../components/chart/BarChart";
import LineChart from "../../components/chart/LineChart";
import {UserData, UserData2} from "../../ultils/constant";
import {useSelector} from 'react-redux'
import {apiGetUsers} from '../../apis/user';


const Dashboard = () => {
    const { posts } = useSelector((state) => state.post);
    const { categories } = useSelector((state) => state.app);
    const [users, setUsers] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await apiGetUsers();
            if(response.status) {
                setUsers(response.users);
            }
        }

        fetchUsers();
    })

    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.year),
        datasets: [
            {
                label: "Users Gained",
                data: UserData.map((data) => data.userGain),
                backgroundColor: ["rgba(247, 92, 30, 0.6)"],
                borderColor: "black",
                borderWidth: 2,
            },
            {
                label: "Users Gained 2",
                data: UserData2.map((data) => data.userGain),
                backgroundColor: ["rgba(230,0,35, 0.6)"],
                borderColor: "black",
                borderWidth: 2,
            },
        ]
    })

    return <div className="px-[30px] py-[20px]">
        <p className="text-[30px] font-bold mb-[20px]">Dashboard Admin</p>
        <div className="grid grid-cols-3 h-[200px] gap-[30px] mb-[30px]">
            <div className="bg-red-400 flex items-center justify-center flex-col">
                <p className="text-white text-[30px] font-bold mb-[20px]">Users</p>
                <p className="text-white text-[40px] font-bold mb-[20px]">{users?.length}</p>
            </div>
            <div className="bg-red-400 flex items-center justify-center flex-col">
                <p className="text-white text-[30px] font-bold mb-[20px]">Categories</p>
                <p className="text-white text-[40px] font-bold mb-[20px]">{categories?.length}</p>
            </div>
            <div className="bg-red-400 flex items-center justify-center flex-col">
                <p className="text-white text-[30px] font-bold mb-[20px]">Posts</p>
                <p className="text-white text-[40px] font-bold mb-[20px]">{posts?.length}</p>
            </div>
        </div>
        <div className="grid grid-cols-2 h-[320px] gap-[30px]">
            <div className="bg-green-400 px-[20px] pt-[40px]">
                <BarChart chartData={userData} />
            </div>
            <div className="bg-green-400 px-[20px] pt-[40px]">
                <LineChart chartData={userData} />
            </div>
        </div>
    </div>;
};

export default Dashboard;
