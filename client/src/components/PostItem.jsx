import React from "react";

const PostItem = () => {
    return (
        <div>
            <img
                src="https://images.spiderum.com/sp-thumbnails/d3494390359411eeaf920d02a6aa3d63.png"
                alt=""
                className="w-full object-cover mb-[10px] rounded-lg"
            />
            <div className="text-[20px] text-inherit mb-[5px] font-[600] leading-[1.4] line-clamp-2">
                Bạn đang đầu tư (investing) hay là đánh bạc (gambling)?
            </div>
            <div className="text-[18px] text-inherit line-clamp-2">
                Đánh bạc mà có kiến thức sẽ là đầu tư, đầu tư mà không có kiến
                thức sẽ là đánh bạc
            </div>
        </div>
    );
};

export default PostItem;
