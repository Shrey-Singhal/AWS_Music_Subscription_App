import {useState, useEffect} from "react";
import axios from "axios";
const Subscriptions = () => {

    const [musicData, setMusicData] = useState([]);
    useEffect(()=>{
        const fetchData = async () => {
            const apiEndpoint = "https://sjj7ct221l.execute-api.us-east-1.amazonaws.com/Production/music_table_lambda_function";

            axios.post(apiEndpoint,{
                operation:'get_all'
            }).then(response => {
                const responseBody = JSON.parse(response.data.body);
                setMusicData(responseBody);
                console.log(responseBody);
                console.log(musicData);
            })

        };
        fetchData();
    }, []);

    return (
        <div className="flex flex-col mt-14 items-center justify-center">
            <h1>Your Subscriptions</h1>
            <div>
                <table className="min-w-full divide-y">
                    <thead>
                    <tr>
                        <th>Artist</th>
                        <th>Title</th>
                        <th>Year</th>
                        <th>Image</th>
                    </tr>
                    </thead>
                    <tbody className="bg-custom-color2 text-black divide-y divide-gray-200">
                    {musicData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.artist}</td>
                            <td>{item.title}</td>
                            <td>{item.year}</td>
                            <td>
                                <img
                                    src={item.img_url}
                                    alt={`Cover for ${item.title}`}
                                    className="w-20 h-20 object-cover"
                                />
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