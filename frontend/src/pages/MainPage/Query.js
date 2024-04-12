import React, {useState, useEffect} from "react";
import axios from "axios";
const Query = () => {
    const [artist, setArtist] = useState("");
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [musicData, setMusicData] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const handleSubmitQuery = async (event) => {
        event.preventDefault();
        // Reset states for a fresh submission
        setIsVisible(false);
        setMusicData([]);
        setErrorMessage("");

        const apiEndpoint = "https://sjj7ct221l.execute-api.us-east-1.amazonaws.com/Production/music_table_lambda_function";
        axios.post(apiEndpoint,{
            operation:'query',
            artist:artist,
            title:title,
            year:year

        }).then(response => {
            console.log(response)
            if (response.data.statusCode === 200) {
                const responseBody = JSON.parse(response.data.body);
                setMusicData(responseBody);
                setIsVisible(true);
            }
            else {
                setErrorMessage("No result is retrieved. Please query again")
            }
            //console.log(responseBody);
        })

    };


    return (
        <div className="flex flex-col mt-14 px-20">
            <h1 className="flex text-3xl font-bold mb-2">Query Area</h1>
            <p>You can enter some information in any (or all) of these text areas and click the “Submit Query” button</p>
            <div className="w-[380px] p-4  rounded-md mt-2">
                <form onSubmit={handleSubmitQuery}>
                    <div className="flex space-x-4">
                        <div>
                            <label className="font-bold">Artist:</label>
                            <input className="text-black rounded outline-none p-[5px] pl-[12px] pr-[12px]"
                                   type = "artist" value={artist} onChange ={(e) => setArtist(e.target.value)} />
                        </div>

                        <div>
                            <label className="font-bold">Title:</label>
                            <input className="text-black rounded outline-none p-[5px] pl-[12px] pr-[12px]"
                                   type ="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>

                        <div>
                            <label className="font-bold">Year:</label>
                            <input className="text-black rounded outline-none p-[5px] pl-[12px] pr-[12px]"
                                   type = "year" value = {year} onChange={(e) => setYear(e.target.value)}/>

                        </div>


                    </div>
                    <button type="submit"
                            className="p-[5px] pl-[16px] pr-[16px] rounded-[6px] leading-5 cursor-pointer
                    text-black bg-custom-color2 hover:brightness-90 w-full mb-1 mt-4 font-bold"
                    >Submit Query</button>
                </form>

            </div>
            {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
            {isVisible && (
                <div className="mt-8">
                    <h1 className="flex text-3xl font-bold mb-4">Your Results</h1>
                    <table className="min-w-full divide-y">
                        <thead>
                        <tr>
                            <th className="text-left align-middle">Artist</th>
                            <th className="text-left align-middle">Title</th>
                            <th className="text-left align-middle">Year</th>
                            <th className="text-left align-middle">Image</th>
                            <th className="text-left align-middle">Subscribe</th>
                        </tr>
                        </thead>
                        <tbody className="bg-custom-color2 text-black divide-y divide-gray-300">
                        {musicData.map((item, index) => (
                            <tr key={index}>
                                <td className="font-bold">{item.artist}</td>
                                <td>{item.title}</td>
                                <td>{item.year}</td>
                                <td>
                                    <img
                                        src={item.img_url}
                                        alt={`Cover for ${item.title}`}
                                        className="w-20 h-20 object-cover"
                                    />
                                </td>
                                <td>
                                    <button className="p-[5px] pl-[16px] pr-[16px] rounded-[6px] leading-5 cursor-pointer
                    text-white bg-custom-color hover:brightness-200 w-full mb-1 mt-4">
                                        Subscribe
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            )}

        </div>
    );

};

export default Query;