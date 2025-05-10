import { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import UseAuth from "../../Auth/AuthContext";

const Voting = () => {
    const [votingItems, setVotingItems] = useState({});
    const [selectedVotes, setSelectedVotes] = useState({});
    const [validationErrors, setValidationErrors] = useState({}); 
    const [categoryIndex, setCategoryIndex] = useState(0);
    const [showEndMessage, setShowEndMessage] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});  
    const { csrf } = UseAuth();
    const [showForm, setShowForm] = useState(false);  
    const [AddingNewWord, setAddingNewWord] = useState({
        kurdish_word: "",
        english_word: "",
        reason: "",
        category: "technology",
    });
    const [AddingNewWordVisibility, setAddingNewWordVisibility] = useState(true); 
    const [loadingIncreaseData, setLoadingIncreaseData] = useState(false);
    const navigate = useNavigate();

    const fetchVotingItems = async () => {
        setLoading(true);
        try {
            await csrf();
            const response = await axios.get("api/moderator/voting");

            if (!response.data || !response.data.data || Object.keys(response.data.data).length === 0) {
                setShowEndMessage(true);
                return;
            }

            setVotingItems(response.data.data);
        } catch (err) {
            setError("Failed to load data. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => { 
        fetchVotingItems();
    }, []);

    const categories = Object.keys(votingItems); // Categories should be ["Hardware", "Software", "Screen", ...]
    const currentCategory = categories[categoryIndex] || null;
    const currentCategoryItems = currentCategory ? votingItems[currentCategory] : []; 

    const handleChange = (e, wordId) => {
        setSelectedVotes((prevVotes) => ({
            ...prevVotes,
            [wordId]: e.target.value,
        }));
    };

    const showCreate = () => {
        setShowForm(!showForm);
        setAddingNewWordVisibility(false) 
    };

    const handlingSetData = (e) => {
        setAddingNewWord((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
            english_word:currentCategory
        })); 
    };

     const handleNext = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        if (!currentCategory || currentCategoryItems.length === 0) return;

        const voteData = {
            votes: currentCategoryItems.map((item) => ({
                word_id: item.id,
                vote_value: selectedVotes[item.id] || 0,
            })),
        };
        setShowForm(false);
        setLoading(true);
        
        try {
            await csrf();
            await axios.post("api/moderator/voting", voteData);
            
            if (categoryIndex + 1 < categories.length) {
                setCategoryIndex(categoryIndex + 1);
            } else {
                setShowEndMessage(true);
            }
            
            setValidationErrors({});
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setValidationErrors(error.response.data.errors);
            }
        }finally{
            setLoading(false);
        }
        setAddingNewWordVisibility(true)
    }; 
    
    const handleIncreaseWord = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setLoadingIncreaseData(true);
        try {
            await csrf();
            await axios.post("api/moderator/kurdish-english-word", AddingNewWord);
    
            // Reset form after successful submission
            setAddingNewWord({
                kurdish_word: "",
                english_word: "",
                reason: "",
                category: "technology",
            });
    
            // Close form and reset button text
            setShowForm(false); 
            setAddingNewWordVisibility(false)
    
            // Fetch updated data from the backend
            fetchVotingItems();
        } catch (error) {
            setError(error.response.data.errors)
        }finally{
            setLoadingIncreaseData(false);
        }
    };

    

    return (
        <> 
            <div dir="rtl" className="h-screen w-full gap-4 flex flex-col justify-center items-center">
                <div  className="font-rabar font-bold text-2xl text-white text-right cursor-pointer">
                   <span onClick={() => navigate(-1)}> گەڕانەوە ← </span> 
                </div>
                {/* White background */}
                <div className="w-[90vw] px-3 1.5xl:w-[35vw] h-[75vh] flex flex-col items-center bg-white rounded-[21px] gap-2 justify-start">
                    {loading ? (
                        <div className="size-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#4F24FF" stroke="#4F24FF" strokeWidth="15" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#4F24FF" stroke="#4F24FF" strokeWidth="15" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#4F24FF" stroke="#4F24FF" strokeWidth="15" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
                        </div>
                    ) : showEndMessage ? (
                        <h1 className="text-xl font-bold text-center p-5">
                            دەنگدان کۆتایی هات، کاتێکی تر وەرەوە بۆ دەنگدانی نوێ
                        </h1>
                    ) : (
                        <> 
                            <h1 className="py-5 text-4xl 1.5xl:text-5xl">{currentCategory}</h1>
                            <div className="w-full overflow-y-auto no-scrollbar::-webkit-scrollbar no-scrollbar">
                                {currentCategoryItems.map((item, index) => (
                                    <div key={item.id} className="w-full grid grid-rows-3 gap-3 grid-cols-1">
                                        
                                        <h1 className="text-3xl 1.5xl:text-4xl">{item.kurdish_word?.kurdish_word}</h1> 
                                        <p className="col-span-full 1.5xl:text-xl">{item.kurdish_word?.reason || "No reason provided"}</p>
                                        
                                        <div className="w-3/4 px-3.5 flex flex-col justify-center justify-self-center">
                                            <input
                                                type="range"
                                                min={0}
                                                max={10}
                                                step={1}
                                                className="bg-blue accent-[#155DFC]  w-full scale-[1.2] 1.5xl:scale-none"
                                                value={selectedVotes[item.id] || 0}
                                                onChange={(e) => handleChange(e, item.id)}
                                            />
                                            <div className="flex justify-between scale-[1.15] 1.5xl:scale-none">
                                                {Array.from({ length: 11 }, (_, index) => (
                                                    <span key={index} className="text-gray-800 text-[12px] 1.5xl:text-xl select-none">
                                                        {index}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        {validationErrors[`votes.${index}.vote_value`] && (
                                            <p className="text-red-500">{validationErrors[`votes.${index}.vote_value`]}</p>
                                        )}
                                        <div className="h-[1px] mt-5 mb-3 w-full bg-gradient-to-r from-[rgba(0,0,0,0)] from-20% via-black to-[rgba(0,0,0,0)] to-80%"></div>
                                    </div>
                                ))}
                            </div>
                            {
                                AddingNewWordVisibility && (
                                    <>
                                        <label className="text-2xl"> خۆت وشەیەک زیادکە </label>
                                        <div className="w-[107px] h-[45px] bg-[#155DFC] flex items-center justify-center rounded mt-5 text-white 
                                                1.5xl:w-[125px] 1.5xl:h-[55px] 1.5xl:ml-3 my-4
                                                hover:bg-[#0037ff] shadow-[0_0_7px_rgba(0,0,0,0.35)]">
                                            <button type="button" className="w-full h-full" style={{ fontSize: "26px" }} onClick={showCreate}> + </button>
                                        </div>
                                    </>
                                )
                            }
                            

                            {showForm && (
                                <form className="w-full flex flex-col text-[18px] 1.5xl:text-[24px] my-3" onSubmit={handleIncreaseWord}>
                                    {
                                        !AddingNewWordVisibility && (
                                            <div className="flex flex-col justify-center items-center">
                                                <label className="text-2xl"> خۆت وشەیەک زیادکە </label>       
                                                <div className="w-[107px] h-[45px] bg-green-500 flex items-center justify-center rounded mt-5 text-white 
                                                        1.5xl:w-[125px] 1.5xl:h-[55px] 1.5xl:ml-3 my-4
                                                        hover:bg-green-600 shadow-[0_0_7px_rgba(0,0,0,0.35)]">
                                                    <button type="submit" className="w-full h-full" style={{ fontSize: "26px" }} >  زیادکردن </button>
                                                </div>
                                            </div>
                                        )
                                    }
                                    <label>مانای کوردی: </label>
                                    <input
                                        type="text" 
                                        name="kurdish_word"
                                        value={AddingNewWord.kurdish_word}
                                        onChange={handlingSetData}
                                        className={`w-full h-[40px] bg-[#EDEDED] border-b-[4px] rounded-[6px] ${ error?.kurdish_word  ? 'border-red-500':'border-[#5e6676] hover:border-[#407dff]'} focus:border-[#155DFC] focus:outline-none`}
                                    />
                                    <p className="text-xs 1.5xl:text-[15px] text-[#5A5A5A]">
                                        ئەو وشە کوردیەی کە دەتەوێ لەبەرابەر وشە کوردیەکە بێ.
                                    </p>
                                    {
                                        error?.kurdish_word && (
                                            <p className="text-red-500 text-xs 1.5xl:text-[15px]">{error?.kurdish_word[0]}</p>
                                        )
                                    }
                                    <label> ڕوونکردنەوە </label>
                                    <textarea
                                        type="text"
                                        value={AddingNewWord.reason}
                                        name="reason"
                                        onChange={handlingSetData}
                                        style={{ fontSize: '16px' }}
                                        className={`w-full h-[76px] min-h-[16px] bg-[#EDEDED] border-b-[4px] ${ error?.reason ? 'border-red-500':'border-[#5e6676] hover:border-[#407dff]'} rounded-[6px]  focus:border-[#155DFC] focus:outline-none`}
                                    />
                                    <p className="text-xs 1.5xl:text-[15px] text-[#5A5A5A]">
                                        ڕوونکردنەوە لەسەر ئەوەی کە بۆچی ئەو وشەیە بە گونجاو دەزانی.
                                    </p>
                                    {
                                        error?.reason && (
                                            <p className="text-red-500 text-xs 1.5xl:text-[15px]">{error?.reason[0]}</p>
                                        )
                                    }

                                </form>
                            )}
                        </>
                    )}
                </div>
                <div className="w-[107px] h-[45px] bg-[#155DFC] flex items-center justify-center rounded mt-5 text-white 
                                       1.5xl:w-[125px] 1.5xl:h-[55px] 1.5xl:ml-3
                                       hover:bg-[#0037ff] shadow-[0_0_7px_rgba(0,0,0,0.35)]">
                    <button type="button" className="w-full h-full" style={{ fontSize: "22px" }} onClick={handleNext}>
                        دواتر
                    </button>
                </div>
                {
                    loadingIncreaseData && (
                        <>
                            <div className="w-full h-screen absolute top-0 bg-gray-50 opacity-5 " />
                            <div className="size-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#4F24FF" stroke="#4F24FF" stroke-width="15" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#4F24FF" stroke="#4F24FF" stroke-width="15" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#4F24FF" stroke="#4F24FF" stroke-width="15" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
                            </div>
                        </>
                    )
                }
            </div>
        </>
    );
};

export default Voting;
