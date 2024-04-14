import React, {useState, useEffect} from "react";
import axios from "axios";
import {useAuth} from "../../Context/AuthContext";
import {useSubscription} from "../../Context/SubscriptionContext";
const Subscriptions = () => {

    //const [subsData, setSubsData] = useState([]);
    const { user } = useAuth();

    const { subscriptions, fetchSubscriptions, removeSubscription } = useSubscription();

    useEffect(() => {
        if (user?.email) {
            fetchSubscriptions(user.email);
        }
    }, [user?.email, fetchSubscriptions]);
    // useEffect(()=>{
    //     const fetchData = async () => {
    //         const apiEndpoint = 'https://ci7qilynd0.execute-api.us-east-1.amazonaws.com/Production/login_table_lambda_function';
    //
    //         axios.post(apiEndpoint,{
    //             operation:'get_subscriptions',
    //             email: user.email
    //         }).then(response => {
    //             const responseBody = JSON.parse(response.data.body);
    //             setSubsData(responseBody);
    //             console.log(responseBody);
    //
    //         })
    //
    //     };
    //     fetchData();
    // }, []);

    const handleUnsubscribe = (item) => {
        removeSubscription(user.email, item);
    };

    return (
        <div className="flex flex-col mt-8 items-center justify-center">
            <h1 className="flex text-2xl font-bold mb-2">Your Subscriptions</h1>
            <div>
                <table className="min-w-full divide-y">
                    <thead>
                    <tr>
                        <th className="text-left align-middle">Image</th>
                        <th className="text-left align-middle">Artist</th>
                        <th className="text-left align-middle">Title</th>
                        <th className="text-left align-middle">Year</th>

                        <th className="text-left align-middle">Subscribe</th>
                    </tr>
                    </thead>
                    <tbody className="bg-custom-color2 text-black divide-y divide-gray-300">
                    {subscriptions.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <img
                                    src={`data:image/jpeg;base64,${item.encoded_img_data}`}
                                    alt={`Cover for ${item.title}`}
                                    className="w-20 h-20 object-cover"
                                />
                            </td>
                            <td className="font-bold">{item.artist}</td>
                            <td>{item.title}</td>
                            <td>{item.year}</td>

                            <td>
                                <button className="p-[5px] pl-[16px] pr-[16px] rounded-[6px] leading-5 cursor-pointer
                    text-white bg-custom-color hover:brightness-200 w-full mb-1 mt-4"
                                        onClick={() => handleUnsubscribe(item)}>
                                    Unsubscribe
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

};

export default Subscriptions;