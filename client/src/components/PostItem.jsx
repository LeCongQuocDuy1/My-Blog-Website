import React from "react";
import { Skeleton } from "antd";
import { Link } from "react-router-dom";

const PostItem = ({ post, loading }) => {
    return (
        <div className="mx-[10px] cursor-pointer">
            {loading ? (
                <>
                    <Skeleton.Avatar
                        active
                        size={240}
                        shape={"square"}
                        className="mb-[20px] rounded-lg"
                        style={{ width: "270px", height: "200px" }}
                    />
                    <Skeleton
                        active
                        paragraph={{
                            rows: 1,
                        }}
                        className="w-full"
                    />
                </>
            ) : (
                <>
                    <Link to={`/bai-dang/${post?._id}`} className="">
                        <img
                            src={post?.image}
                            alt=""
                            className="w-full h-[200px] object-cover mb-[10px] rounded-lg"
                        />
                    </Link>
                    <Link
                        to={`/bai-dang/${post?._id}`}
                        className="text-[20px] text-inherit mb-[5px] font-[600] leading-[1.4] line-clamp-2"
                    >
                        {post?.title}
                    </Link>
                    <div className="text-[18px] text-inherit line-clamp-2">
                        {post?.description}
                    </div>
                </>
            )}
        </div>
    );
};

export default PostItem;
