import React, {useState, useEffect} from "react";
import axios from "axios";
const ViewLibrary = () => {

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
        <div className="flex flex-col mt-14 px-24">
            <h1 className="flex text-4xl font-bold mb-6">Library</h1>
            <div>
                <table className="min-w-full divide-y">
                    <thead>
                    <tr>
                        <th className="text-left align-middle">Image</th>
                        <th className="text-left align-middle">Artist</th>
                        <th className="text-left align-middle">Title</th>
                        <th className="text-left align-middle">Year</th>

                    </tr>
                    </thead>
                    <tbody className="bg-custom-color2 text-black divide-y divide-gray-300">
                    {musicData.map((item, index) => (
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


                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

};

export default ViewLibrary;