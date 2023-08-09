import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Login = () => {
    const loginSchema = yup.object().shape({
        email: yup
            .string()
            .required("Email của bạn không được để trống!")
            .email("Email không hợp lệ, vui lòng nhập lại!"),
        password: yup
            .string()
            .required("Mật khẩu của bạn không được để trống!")
            .min(6, "Mật khẩu phải có ít nhất 6 ký tự!"),
    });

    const registerSchema = yup.object().shape({
        fullName: yup.string().required("Tên của bạn không được để trống!"),
        lastName: yup.string().required("Họ của bạn không được để trống!"),
        email: yup
            .string()
            .required("Email của bạn không được để trống!")
            .email("Email không hợp lệ, vui lòng nhập lại!"),
        password: yup
            .string()
            .required("Mật khẩu của bạn không được để trống!")
            .min(6, "Mật khẩu phải có ít nhất 6 ký tự!"),
        confirmPassword: yup
            .string()
            .oneOf(
                [yup.ref("password"), null],
                "Mật khẩu xác nhận không trùng khớp!"
            )
            .required("Nhập lại mật khẩu không được để trống"),
    });

    const {
        register: registerLogin,
        handleSubmit: handleLoginSubmit,
        formState: { errors: loginErrors },
        reset: resetLoginForm,
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const {
        register: registerRegister,
        handleSubmit: handleRegisterSubmit,
        formState: { errors: registerErrors },
        reset: resetRegisterForm,
    } = useForm({
        resolver: yupResolver(registerSchema),
    });

    const handleLogin = (data) => {
        // Handle login logic here with the submitted data
        console.log("Login form submitted:", data);
        resetLoginForm(); // Reset login form values
    };

    const handleRegister = (data) => {
        // Handle register logic here with the submitted data
        console.log("Register form submitted:", data);
        resetRegisterForm(); // Reset register form values
    };

    const navigate = useNavigate();
    const [isRegister, setIsRegister] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {isRegister ? (
                <form
                    onSubmit={handleRegisterSubmit(handleRegister)}
                    className="w-[340px] m-auto"
                >
                    <img
                        className="m-auto w-[85px] h-[85px] mb-[20px] object-cover rounded-full"
                        src="https://www.pngitem.com/pimgs/m/175-1757329_my-blog-logo-png-transparent-png.png"
                        alt=""
                    />
                    <input
                        type="text"
                        name="fullName"
                        {...registerRegister("fullName")}
                        placeholder="Tên của bạn"
                        className="outline-none border-[1px] w-full border-[#d3d3d3] py-[8px] px-[10px] text-[16px] text-[#9999a6] mb-[10px]"
                    />
                    {registerErrors.fullName && (
                        <p className="text-error mb-[20px] text-[14px]">
                            {registerErrors.fullName.message}
                        </p>
                    )}

                    <input
                        type="text"
                        name="lastName"
                        {...registerRegister("lastName")}
                        placeholder="Họ của bạn"
                        className="outline-none border-[1px] w-full border-[#d3d3d3] py-[8px] px-[10px] text-[16px] text-[#9999a6] mb-[10px]"
                    />
                    {registerErrors.lastName && (
                        <p className="text-error mb-[20px] text-[14px]">
                            {registerErrors.lastName.message}
                        </p>
                    )}

                    <input
                        type="email"
                        name="email"
                        {...registerRegister("email")}
                        placeholder="Email của bạn"
                        className="outline-none border-[1px] w-full border-[#d3d3d3] py-[8px] px-[10px] text-[16px] text-[#9999a6] mb-[10px]"
                    />
                    {registerErrors.email && (
                        <p className="text-error mb-[20px] text-[14px]">
                            {registerErrors.email.message}
                        </p>
                    )}

                    <input
                        type="password"
                        name="password"
                        autoComplete="on"
                        {...registerRegister("password")}
                        placeholder="Mật khẩu của bạn"
                        className="outline-none border-[1px] w-full border-[#d3d3d3] py-[8px] px-[10px] text-[16px] text-[#9999a6] mb-[10px]"
                    />
                    {registerErrors.password && (
                        <p className="text-error mb-[20px] text-[14px]">
                            {registerErrors.password.message}
                        </p>
                    )}
                    <input
                        type="password"
                        name="confirmPassword"
                        autoComplete="on"
                        {...registerRegister("confirmPassword")}
                        placeholder="Mật khẩu xác nhận của bạn"
                        className="outline-none border-[1px] w-full border-[#d3d3d3] py-[8px] px-[10px] text-[16px] text-[#9999a6] mb-[10px]"
                    />
                    {registerErrors.confirmPassword && (
                        <p className="text-error mb-[20px] text-[14px]">
                            {registerErrors.confirmPassword.message}
                        </p>
                    )}
                    <div className="mt-[20px]">
                        <button
                            type="submit"
                            className="outline-none w-full py-[8px] px-[10px] text-[16px] text-[#fff] bg-main"
                        >
                            Đăng ký
                        </button>
                        <div className="text-[14px] mt-[12px] text-inherit">
                            Đã có tài khoản
                            <span
                                onClick={() => {
                                    setIsRegister(!isRegister);
                                }}
                                className="text-main font-[600] ml-[5px] cursor-pointer"
                            >
                                Đăng nhập ngay
                            </span>
                        </div>
                    </div>
                </form>
            ) : (
                <form
                    onSubmit={handleLoginSubmit(handleLogin)}
                    className="w-[340px] m-auto"
                >
                    <img
                        className="m-auto w-[85px] h-[85px] mb-[20px] object-cover rounded-full"
                        src="https://www.pngitem.com/pimgs/m/175-1757329_my-blog-logo-png-transparent-png.png"
                        alt=""
                    />
                    <input
                        type="email"
                        name="email"
                        {...registerLogin("email")}
                        placeholder="Email của bạn"
                        className="outline-none border-[1px] w-full border-[#d3d3d3] py-[8px] px-[10px] text-[16px] text-[#9999a6] mb-[10px]"
                    />
                    {loginErrors.email && (
                        <p className="text-error mb-[20px] text-[14px]">
                            {loginErrors.email.message}
                        </p>
                    )}

                    <input
                        type="password"
                        name="password"
                        autoComplete="on"
                        {...registerLogin("password")}
                        placeholder="Mật khẩu của bạn"
                        className="outline-none border-[1px] w-full border-[#d3d3d3] py-[8px] px-[10px] text-[16px] text-[#9999a6] mb-[10px]"
                    />
                    {loginErrors.password && (
                        <p className="text-error mb-[20px] text-[14px]">
                            {loginErrors.password.message}
                        </p>
                    )}
                    <div className="mt-[20px]">
                        <button
                            type="submit"
                            className="outline-none w-full py-[8px] px-[10px] text-[16px] text-[#fff] bg-main"
                        >
                            Đăng nhập
                        </button>
                        <div className="text-[14px] mt-[12px] text-inherit">
                            Không có tài khoản?
                            <span
                                onClick={() => {
                                    setIsRegister(!isRegister);
                                }}
                                className="text-main font-[600] ml-[5px] cursor-pointer"
                            >
                                Đăng ký ngay
                            </span>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Login;
