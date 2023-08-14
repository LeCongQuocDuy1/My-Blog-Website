import React, { useEffect, useState } from "react";
import PostItem2 from "../../components/PostItem2";
import TitleSection from "../../components/TitleSection";
import CategoryItem from "../../components/CategoryItem";
import { useSelector } from "react-redux";
import Paginations from "../../components/Paginations";
import { useParams } from "react-router-dom";
import { apiGetCategoryById, apiGetPostByCategory } from "../../apis";

const Category = () => {
    const { categories } = useSelector((state) => state.app);
    const { posts, isLoading } = useSelector((state) => state.post);
    const [postsLimit, setPostsLimit] = useState(null);
    const [category, setCategory] = useState(null);
    const { cid } = useParams();

    useEffect(() => {
        const getPostByCategory = async (cid) => {
            const response = await apiGetCategoryById(cid);
            if (response.status) setCategory(response.response);
        };

        getPostByCategory(cid);
    }, [cid]);

    useEffect(() => {
        const getPostByCategory = async (cid) => {
            const response = await apiGetPostByCategory(cid);
            // if (response.status) setCategory(response.response);
            console.log(response);
        };

        getPostByCategory(cid);
    }, [cid]);

    return (
        <div className="pt-[70px] pb-[170px]">
            <div
                className="flex items-center justify-center h-[450px] mb-[100px] flex-col w-full relative"
                style={{
                    backgroundImage:
                        "url(https://spiderum.com/assets/images/categories/business-min.jpg)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="text-[60px] font-bold text-[#fff] z-10">
                    {category?.title}
                </div>
                <div className="absolute w-full h-full bg-overlay"></div>
            </div>
            <div className="bg-[#fff] py-[30px] p-main">
                <TitleSection title="PHỔ BIẾN HÀNG TUẦN" />
                <div className="grid grid-cols-3 gap-[40px] w-full">
                    <div className="col-span-2">
                        {postsLimit &&
                            postsLimit?.map((post) => (
                                <React.Fragment key={post._id}>
                                    <PostItem2
                                        post={post}
                                        loading={isLoading}
                                    />
                                </React.Fragment>
                            ))}
                        <Paginations
                            posts={posts}
                            setPostsLimit={setPostsLimit}
                        />
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
                                src="https://images.spiderum.com/sp-images/4e703120344411ee864e9996a2d9225a.png"
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

export default Category;
