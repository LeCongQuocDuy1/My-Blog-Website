import React from "react";
import { formatDateTimeAgo } from "../ultils/common";

const PostItem2 = ({ post }) => {
    return (
        <div className="grid grid-cols-3 gap-[20px] mb-[20px]">
            <div className="">
                <img
                    src={post?.image}
                    alt=""
                    className="w-full object-cover mb-[10px] rounded-md h-[200px]"
                />
            </div>
            <div className="col-span-2">
                <div className="text-[14px] text-inherit uppercase mb-[20px]">
                    {post?.category?.title}
                </div>
                <div className="text-[20px] text-inherit mb-[10px] font-[600] leading-[1.4] line-clamp-2">
                    {post?.title}
                </div>
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
    );
};

export default PostItem2;
