import React from "react";

const PostItem2 = () => {
    return (
        <div className="grid grid-cols-3 gap-[20px] mb-[20px]">
            <div className="">
                <img
                    src="https://images.spiderum.com/sp-thumbnails/c731559035a111eeaeceed75306ae263.png"
                    alt=""
                    className="w-full object-cover mb-[10px] rounded-md h-[200px]"
                />
            </div>
            <div className="col-span-2">
                <div className="text-[14px] text-inherit uppercase mb-[20px]">
                    QUAN ĐIỂM - TRANH LUẬN
                </div>
                <div className="text-[20px] text-inherit mb-[10px] font-[600] leading-[1.4] line-clamp-2">
                    Chuyện người chuyện ngỗng": Đồng hành cùng vật nuôi thay đổi
                    cuộc đời bạn như thế nào?
                </div>
                <div className="text-[18px] text-inherit line-clamp-2 mb-[15px]">
                    Con người có thực sự đứng cao hơn các loài vật khác?
                </div>
                <div className="flex items-center gap-[10px]">
                    <img
                        className="w-[48px] h-[48px] object-cover rounded-full"
                        src="https://images.spiderum.com/sp-xs-avatar/d0030560e18d11ecb072ab9b12869aa4.jpeg"
                        alt=""
                    />
                    <div className="text-[16px] text-inherit font-[600]">
                        Nguyễn Nguyễn
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostItem2;
