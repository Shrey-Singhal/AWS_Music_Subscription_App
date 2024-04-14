import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../Context/AuthContext";
import Query from "./Query";
import Subscriptions from "./Subscriptions";
const MainPage = () => {

    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <div className="flex flex-col mt-14 items-center justify-center">
            <div className="font-bold text-4xl">
                {user ? <h1>Welcome, {user.name}!</h1> : <h1>You are not logged in</h1>}
            </div>

            {/*<div className="flex space-x-4 mt-6">*/}
            {/*    <button*/}
            {/*        className="p-[5px] pl-[16px] pr-[16px] rounded-[6px] leading-5 cursor-pointer*/}
            {/*        text-black bg-custom-color2 hover:brightness-90 w-full mb-1"*/}

            {/*        onClick={() => navigate('/subscriptions')}>*/}
            {/*        View Subscriptions*/}
            {/*    </button>*/}
            {/*    <button*/}
            {/*        className="p-[5px] pl-[16px] pr-[16px] rounded-[6px] leading-5 cursor-pointer*/}
            {/*        text-black bg-custom-color2 hover:brightness-90 w-full mb-1"*/}
            {/*        onClick={() => navigate('/query')}>Query Area</button>*/}
            {/*</div>*/}
            <div className="flex w-full max-w-7xl">
                <div className="w-1/2 items-start p-4  mt-8 bg-custom-color  shadow border border-white border-opacity-20">
                    <Query />
                </div>
                <div className="w-1/2 flex-1 items-start p-4  mt-8 bg-custom-color  shadow border border-white border-opacity-20">
                    <Subscriptions />
                </div>
            </div>
        </div>
    );

};

export default MainPage;