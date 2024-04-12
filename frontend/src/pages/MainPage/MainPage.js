import {useState} from "react";
import {useNavigate} from "react-router-dom";
const MainPage = () => {

    const navigate = useNavigate();

    return (
        <div className="flex mt-14 items-center justify-center">
            <div className="flex space-x-4">
                <button
                    className="p-[5px] pl-[16px] pr-[16px] rounded-[6px] leading-5 cursor-pointer
                    text-black bg-custom-color2 hover:brightness-90 w-full mb-1 mt-2"
                    onClick={() => navigate('/subscriptions')}>View Subscriptions</button>
                <button
                    className="p-[5px] pl-[16px] pr-[16px] rounded-[6px] leading-5 cursor-pointer
                    text-black bg-custom-color2 hover:brightness-90 w-full mb-1 mt-2"
                    onClick={() => navigate('/query')}>Query Area</button>
            </div>
        </div>
    );

};

export default MainPage;