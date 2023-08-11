import React from "react";

const PostItem = ({ post }) => {
    return (
        <div className="mx-[10px] cursor-pointer">
            <img
                src={post?.image}
                alt=""
                className="w-full h-[200px] object-cover mb-[10px] rounded-lg"
            />
            <div className="text-[20px] text-inherit mb-[5px] font-[600] leading-[1.4] line-clamp-2">
                {post?.title}
            </div>
            <div className="text-[18px] text-inherit line-clamp-2">
                {post?.description}
            </div>
        </div>
    );
};

export default PostItem;
