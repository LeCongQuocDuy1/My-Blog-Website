import React, { useEffect } from "react";
import { Skeleton } from "antd";
import { formatDateTimeAgo } from "../ultils/common";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../store/post/postSlice";

const PostItem2 = ({ post, loading }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading(true));

        setTimeout(() => {
            // Mô phỏng việc tải dữ liệu trong 3 giây
            dispatch(setLoading(false));
        }, 3000);
    }, []);

    return (
        <React.Fragment>
            {loading ? (
                <div className="grid grid-cols-3 gap-[20px] mb-[20px]">
                    <Skeleton.Avatar
                        active
                        size={240}
                        shape={"square"}
                        className="w-full object-cover mb-[10px] rounded-md h-[250px]"
                    />
                    <div className="col-span-2">
                        <Skeleton
                            active
                            paragraph={{
                                rows: 3,
                            }}
                            className="w-full"
                        />
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-[20px] mb-[20px]">
                    <Link to={`/bai-dang/${post?._id}`} className="">
                        <img
                            src={post?.image}
                            alt=""
                            className="w-full object-cover mb-[10px] rounded-md h-[200px]"
                        />
                    </Link>
                    <div className="col-span-2">
                        <Link
                            to={`/danh-muc/${post?.category?._id}`}
                            className="text-[14px] text-inherit uppercase mb-[20px]"
                        >
                            {post?.category?.title}
                        </Link>
                        <Link
                            to={`/bai-dang/${post?._id}`}
                            className="text-[20px] text-inherit mb-[10px] font-[600] leading-[1.4] line-clamp-2"
                        >
                            {post?.title}
                        </Link>
                        <div className="text-[18px] text-inherit line-clamp-2">
                            {post?.description}
                        </div>
                        <div className="flex items-center gap-[10px]">
                            <img
                                className="w-[48px] h-[48px] object-cover rounded-full"
                                src={post?.user?.avatar}
                                alt=""
                            />
                            <div className="text-[16px] text-inherit font-[600]">
                                {/* {post?.user.firstName} */}
                                {`${post?.user?.firstName} ${post?.user?.lastName}`}
                            </div>
                            <div className="text-[14px] text-[#c3c3c3]">
                                {formatDateTimeAgo(post?.createdAt)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};

export default PostItem2;
