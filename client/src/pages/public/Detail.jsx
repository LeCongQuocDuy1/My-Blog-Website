import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGetPostById } from "../../apis";
import { formatDateTimeAgo } from "../../ultils/common";
import DOMPurify from 'dompurify';

const Detail = () => {
    const { pid } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const getPostById = async (pid) => {
            const response = await apiGetPostById(pid);
            if (response.status) setPost(response.post);
        };

        getPostById(pid);
    }, [pid]);

    return (
        <div className="px-[280px] py-[70px]">
            <img
                src="https://images.spiderum.com/sp-images/2b6d6a202c2f11eea0cdb525ffe86636.png"
                alt=""
                className="w-full h-[200px] object-contain mb-[10px]"
            />
            <div className="text-[16px] text-[#999] mb-[10px]">
                {post?.category?.title}
            </div>
            <div className="text-[50px] font-[600] text-[#333] mb-[10px] leading-[1.3]">
                {post?.title}
            </div>
            <div className="text-[16px] text-[#999] mb-[10px] italic">
                {post?.description || ""}
            </div>
            <div className="flex items-center justify-between w-full mb-[20px]">
                <div className="flex items-center gap-[5px]">
                    <img
                        src={post?.user.avatar}
                        alt=""
                        className="w-[80px] h-[80px] object-cover rounded-full"
                    />
                    <div className="flex flex-col">
                        <div className="text-[16px] text-[#000] font-[600]">{`${post?.user.firstName} ${post?.user.lastName}`}</div>
                        <div className="text-[13px] text-[#999]">
                            {formatDateTimeAgo(post?.createdAt)}
                        </div>
                    </div>
                </div>
                <h1>gagsaga</h1>
            </div>
            <img
                src={post?.image}
                alt=""
                className="w-full h-full object-contain mb-[10px]"
            />
            <div className="text-[21px] text-[#000] leading-[1.6] my-[30px] font-content">
                {<div className="text-[21px] text-[#000] leading-[1.6] my-[30px] font-content text-justify" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post?.content)}}></div> || ""}
            </div>
        </div>
    );
};

export default Detail;
