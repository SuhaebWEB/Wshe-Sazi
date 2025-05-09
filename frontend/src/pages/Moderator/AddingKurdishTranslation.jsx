import { useState, useEffect } from "react";
import ConfirmationDialog from "../../Components/ComfirmationDialog";
import AlertDialog from "../../Components/AlertDialog";

import axios from "../../api/axios";
import UseAuth from '../../Auth/AuthContext';
const create = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [data, setData] = useState({
        kurdish_word: "",
        english_word: "",
        reason: "",
        category: "technology",
    });
    const [loadingPage, setLoadingPage] = useState(false);
    const [messageError, setMessageError] = useState({});
    const [succesedMessage, setSucessedMessage] = useState('');
    const { csrf, loading } = UseAuth();
    const handleSumbit = async (e) => {
        e.preventDefault();
        setIsDialogOpen(false);

        setLoadingPage(true);
        try {
            await csrf();
            const response = await axios.post("api/moderator/kurdish-english-word", data);
            setData({
                kurdish_word: "",
                english_word: "",
                reason: "",
                category: "technology",
            })
            setMessageError({});
            setSucessedMessage(response.data.message);

        } catch (error) {
            console.log(error);
            console.log(data)
            setMessageError(error.response.data.errors)
        } finally {
            setLoadingPage(false);
        }
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (succesedMessage) {
            // After 5 seconds, clear the success message
            const timer = setTimeout(() => {
                setSucessedMessage("");  // Clear the success message
            }, 3000);

            // Cleanup the timer when the component is unmounted or succesedMessage changes
            return () => clearTimeout(timer);
        }
    }, [succesedMessage]); // Depend on succesedMessage to trigger when it changes


    return (
        <>
            <div dir="rtl" className="h-screen w-full flex flex-col justify-center items-center ">
                {
                    loading ? (
                        <div className="size-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#4F24FF" stroke="#4F24FF" strokeWidth="15" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#4F24FF" stroke="#4F24FF" strokeWidth="15" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#4F24FF" stroke="#4F24FF" strokeWidth="15" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
                        </div>
                    ) : (
                        <>
                            <p className="pb-10 font-bold 1.5xl:text-5xl text-2xl text-white flex items-center">
                                با وشەسازی بکەین ☻
                            </p>
                            {/* White Background window */}
                            <div className="flex flex-col items-center justify-center w-[350px] h-[550px] bg-white rounded-[21px] shadow-lg text-[24px] text-black 
                                            1.5xl:w-[650px] 1.5xl:h-[60vh] 1.5xl:justify-start 1.5xl:pt-[20px]">
                                <form className="w-full px-3" onSubmit={handleSumbit}>


                                    {/* container for each part */}
                                    <div className="w-full flex flex-col gap-1.5 justify-around">
                                        <label >وشەی ئینگلیزی</label>
                                        <input
                                            type="text"
                                            name="english_word"
                                            value={data.english_word}
                                            onChange={handleChange}
                                            className={`w-full h-[40px] bg-[#EDEDED] border-b-[4px] ${messageError.english_word ? "border-red-600" : "border-[#5e6676] hover:border-[#407dff]"}  focus:border-[#155DFC] rounded-[6px] focus:outline-none`} />
                                        <div>
                                            <p className="text-xs 1.5xl:text-[15px] text-[#5A5A5A]">
                                                ئەو وشە ئینگلیزیەی کەدەتەوێ وەرگێڕانی بۆ بکەی.
                                            </p>
                                            {
                                                messageError.english_word && (
                                                    <p className="text-xs text-red-600">
                                                        {messageError.english_word}
                                                    </p>
                                                )
                                            }
                                        </div>
                                    </div>

                                    <div className=" flex flex-col gap-1.5 justify-around">
                                        <label >وشەی کوردی</label>
                                        <input
                                            type="text"
                                            name="kurdish_word"
                                            value={data.kurdish_word}
                                            onChange={handleChange}
                                            className={`w-full h-[40px] bg-[#EDEDED] border-b-[4px] ${messageError.kurdish_word ? "border-red-600" : "border-[#5e6676] hover:border-[#407dff]"}  focus:border-[#155DFC] rounded-[6px] focus:outline-none`} />
                                        <div>
                                            <p className=" text-xs 1.5xl:text-[15px] text-[#5A5A5A]">
                                                ئەو وشە کوردیەی کە دەتەوێ لەبەرابەر وشە کوردیەکە بێ.
                                            </p>
                                            {
                                                messageError.kurdish_word && (
                                                    <p className="text-xs text-red-600">
                                                        {messageError.kurdish_word}
                                                    </p>
                                                )
                                            }
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1.5 justify-around">
                                        <label > ڕوونکردنەوە </label>
                                        <textarea
                                            type="text"
                                            value={data.reason}
                                            name="reason"
                                            onChange={handleChange}
                                            style={{ fontSize: '16px' }}
                                            className={`w-full h-[76px] bg-[#EDEDED] border-b-[4px] ${messageError?.reason ? "border-red-600" : "border-[#5e6676] hover:border-[#407dff]"}  focus:border-[#155DFC} rounded-[6px] focus:outline-none`} />
                                        <div>
                                            <p className="text-xs 1.5xl:text-[15px] text-[#5A5A5A]">
                                                ڕوونکردنەوە لەسەر ئەوەی کە بۆچی ئەو وشبە گونجاو دەزانی.
                                            </p>
                                            {
                                                messageError?.reason && (
                                                    <p className="text-xs text-red-600">
                                                        {messageError?.reason}
                                                    </p>
                                                )
                                            }
                                        </div>
                                    </div>


                                    <div className="w-[157px] h-[42px] justify-self-center mt-[70px] mb-[5px] bg-[#155DFC] rounded-[7px] text-white  text-[22px] hover:bg-[#0037ff] shadow-[0_0_7px_rgba(0,0,0,0.35)]">
                                        <button
                                            type="button"
                                            className="w-full h-full"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (data.kurdish_word != "" && data.english_word != "")
                                                    setIsDialogOpen(true);
                                                else
                                                    setIsAlertOpen(true);
                                            }}
                                        >
                                            بڵاوکردنەوە
                                        </button>

                                    </div>
                                    <ConfirmationDialog
                                        isOpen={isDialogOpen}
                                        title="دڵنیابوونەوە"
                                        message={`ئایە دڵنیای لەو وەگێڕانە کە وشەی ${data.english_word} بەرامبەر بە وشەی ${data.kurdish_word} ە؟`}
                                        onCancel={() => setIsDialogOpen(false)}
                                    />
                                </form>
                                {
                                    loadingPage && (
                                        <div className="size-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#4F24FF" stroke="#4F24FF" strokeWidth="15" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#4F24FF" stroke="#4F24FF" strokeWidth="15" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#4F24FF" stroke="#4F24FF" strokeWidth="15" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
                                        </div>
                                    )
                                }
                                <AlertDialog
                                    isOpen={isAlertOpen}
                                    title="ئاگاداربە"
                                    message="تکایە بۆشاییەکان پڕبکەوە"
                                    onClose={() => setIsAlertOpen(false)}
                                />

                            </div>
                        </>
                    )
                }
                <div
                    className={`px-5 py-2 bg-green-800 text-white rounded-md transition-all duration-700 ease-in-out absolute bottom-5 left-5 transform
                                    ${!succesedMessage ? "hidden -translate-x-60" : "opacity-100 translate-x-0"}`}
                >
                    {succesedMessage}
                </div>

            </div>
        </>
    );
}

export default create;
