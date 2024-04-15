import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const SubscriptionContext = createContext();

export function useSubscription() {
    return useContext(SubscriptionContext);
}

export const SubscriptionProvider = ({ children }) => {
    const [subscriptions, setSubscriptions] = useState([]);

    const fetchSubscriptions = async (email) => {
        const apiEndpoint = 'https://ci7qilynd0.execute-api.us-east-1.amazonaws.com/Production/login_table_lambda_function';
        try {
            const response = await axios.post(apiEndpoint, {
                operation: 'get_subscriptions',
                email: email
            });
            const data = JSON.parse(response.data.body);
            setSubscriptions(data);
        } catch (error) {
            console.error('Failed to fetch subscriptions:', error);
        }
    };

    const addSubscription = async (email, item) => {
        const apiEndpoint = 'https://ci7qilynd0.execute-api.us-east-1.amazonaws.com/Production/login_table_lambda_function';
        await axios.post(apiEndpoint, {
            operation: 'subscribe',
            email: email,
            subscription: item
        }).then(response => {
            if (response.data.statusCode === 200) {
                fetchSubscriptions(email);
            } else {
                alert(response.data.body);
            }
            console.log(response.data);
        })
    };

    const removeSubscription = async (email, item) => {
        const apiEndpoint = 'https://ci7qilynd0.execute-api.us-east-1.amazonaws.com/Production/login_table_lambda_function';

        axios.post(apiEndpoint,{
            operation: "unsubscribe",
            email : email,
            subscription: {
                artist : item.artist,
                title : item.title
            }
        }).then(response => {
            console.log(response);
        })
    };

    return (
        <SubscriptionContext.Provider value={{ subscriptions, addSubscription, fetchSubscriptions, removeSubscription }}>
            {children}
        </SubscriptionContext.Provider>
    );
};
