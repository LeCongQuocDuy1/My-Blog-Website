import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PostItem from "./PostItem";
import { apiGetPosts } from "../apis/post";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../store/post/postSlice";

const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    // responsive: [
    //     {
    //       breakpoint: 1024,
    //       settings: {
    //         slidesToShow: 3,
    //         slidesToScroll: 3,
    //         infinite: true,
    //         dots: true
    //       }
    //     },
    //     {
    //       breakpoint: 600,
    //       settings: {
    //         slidesToShow: 2,
    //         slidesToScroll: 2,
    //         initialSlide: 2
    //       }
    //     },
    //     {
    //       breakpoint: 480,
    //       settings: {
    //         slidesToShow: 1,
    //         slidesToScroll: 1
    //       }
    //     }
    //   ]
};

const SlideImage = () => {
    const [postNewests, setPostNewests] = useState(null);
    const { isLoading } = useSelector((state) => state.post);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading(true));
        const fetchPostsNewest = async (params) => {
            const response = await apiGetPosts(params);
            if (response.status) {
                setPostNewests(response.posts);
            }
        };

        fetchPostsNewest({
            sort: "-createdAt",
            limit: 10,
        });

        setTimeout(() => {
            // Mô phỏng việc tải dữ liệu trong 3 giây
            dispatch(setLoading(false));
        }, 3000);
    }, []);

    return (
        <div className="mx-[-10px]">
            <Slider {...settings}>
                {postNewests?.map((item) => (
                    <React.Fragment key={item._id}>
                        <PostItem post={item} loading={isLoading} />
                    </React.Fragment>
                ))}
            </Slider>
        </div>
    );
};

export default SlideImage;
