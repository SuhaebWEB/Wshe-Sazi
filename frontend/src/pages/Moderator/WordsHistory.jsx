import { useState,useEffect } from "react"; 
import PageHeader from "../../Components/pageHeadline";
import axios from "../../api/axios";
import UseAuth from "../../Auth/AuthContext";


const WordHistory = () => {
    const [getData,setData] = useState([]);
    const {loading,setLoading} = UseAuth();
    console.log(getData);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get("api/moderator/history-word");
                console.log(response.data.data);
                setData(response.data.data);
            } catch (error) {
                console.log(error);
            }finally{
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return (
        <>
            <div dir="rtl" className="h-screen w-full flex flex-col justify-center items-center">
                {
                    loading ? (
                        <div className="size-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#4F24FF" stroke="#4F24FF" stroke-width="15" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#4F24FF" stroke="#4F24FF" stroke-width="15" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#4F24FF" stroke="#4F24FF" stroke-width="15" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
                        </div>
                    ): (
                        <>
                            <PageHeader title="کۆتا جار چیم کرد؟" />  
                            <div className="flex flex-col items-start justify-start gap-0 w-[350px] h-[550px] px-2.5 bg-white rounded-[21px] shadow-lg text-[24px] text-black 
                                1.5xl:w-[650px] 1.5xl:h-[60vh] 1.5xl:justify-start 1.5xl:pt-[10px]">
                                <div className="w-full pt-[10px]">
                                    <h2 className="1.5xl:pb-3">وشە پێشنیارکردنەکان</h2>
                                    <div className="h-[1px] bg-black" />
                                </div>
                                <div className=" overflow-y-auto w-full flex flex-col gap-y-10 no-scrollbar::-webkit-scrollbar no-scrollbar">

                                    {
                                        getData.map((data, index) => (
                                            <div key={index} className=" w-full h-[80px] flex flex-col ">
                                                <div className="flex justify-between">
                                                    <h3 className="pr-2.5 m-0">{data.kurdish_word.kurdish_word}</h3>
                                                    <h3 dir="ltr" className="pl-2.5 m-0">{data.english_word}</h3>

                                                </div>
                                                <p className="pr-2.5 col-span-2 text-[16px]">{data.kurdish_word.reason}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </>
                        
                    )
                }
                 
                
            </div>
        </>
    );
}

export default WordHistory;