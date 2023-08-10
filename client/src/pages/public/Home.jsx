import React from "react";
import PostItem2 from "../../components/PostItem2";
import PostItem from "../../components/PostItem";
import TitleSection from "../../components/TitleSection";
import CategoryItem from "../../components/CategoryItem";
import { useSelector } from "react-redux";

const Home = () => {
    const { categories } = useSelector((state) => state.app);

    return (
        <div className="py-[170px]">
            <div className="flex items-center justify-center mt-[50px] mb-[100px] flex-col w-full">
                <div className="text-[60px] font-bold text-inherit">
                    MyBlog Website
                </div>
                <div className="text-[20px] font-bold text-inherit">
                    MyBlog chỉ là một website tạm bợ, do một thằng sinh viên tự
                    kỉ xây dựng lên nhằm để bỏ vào CV cá nhân.
                </div>
            </div>
            <div className="bg-[#f5f7fa] py-[30px] p-main">
                <TitleSection title="NỔI BẬT TRONG THÁNG" />
                <div className="grid grid-cols-4 gap-[20px]">
                    <PostItem />
                    <PostItem />
                    <PostItem />
                    <PostItem />
                </div>
            </div>
            <div className="bg-[#fff] py-[30px] p-main">
                <TitleSection title="PHỔ BIẾN HÀNG TUẦN" />
                <div className="grid grid-cols-3 gap-[40px] w-full">
                    <div className="col-span-2">
                        <PostItem2 />
                        <PostItem2 />
                        <PostItem2 />
                        <PostItem2 />
                        <PostItem2 />
                        <PostItem2 />
                    </div>
                    <div className="">
                        <TitleSection title="DANH MỤC" />
                        <div className="flex items-center flex-wrap">
                            {categories &&
                                categories?.map((cate) => (
                                    <div key={cate._id}>
                                        <CategoryItem category={cate} />
                                    </div>
                                ))}
                        </div>
                        <div className="mt-[20px] h-screen">
                            <img
                                src="https://aboutus.spiderum.com/assets/contact.a0702a39_1gtEbq.avif"
                                className="w-full h-full object-cover"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
