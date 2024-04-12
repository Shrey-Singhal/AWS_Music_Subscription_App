import React, {useState, useEffect} from "react";
const Query = () => {
    const [artist, setArtist] = useState("");
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");

    return (
        <div className="flex flex-col mt-14 px-20">
            <h1 className="flex text-3xl font-bold mb-2">Query Area</h1>
            <p>You can enter some information in any (or all) of these text areas and click the “Submit Query” button</p>
            <div className="w-[380px] p-4  rounded-md mt-2">
                <form>
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
        </div>
    );

};

export default Query;