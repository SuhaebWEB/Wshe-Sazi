import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchResult from "../../Components/SearchResult"; 
import axios from "../../api/axios";   
import UseAuth from "../../Auth/AuthContext";

const ModeratorMain = () => {
    const [search, setSearch] = useState("");
    const [getData, setData] = useState(false);
    const [getAllData, setAllData] = useState([]);   
    const { user,loading } = UseAuth();
    const [pageLoading, setpageLoading] = useState(false); 
    const navigate = useNavigate(); 
    useEffect(() => {
        if (search.trim() === "") {
          setData(false);
          setAllData([]);
          return;
        }
    
        const fetchData = async () => {
            setpageLoading(true); // Start pageLoading
          try {
            const response = await axios.get(`api/search?search=${search}`);
            setAllData(response.data.data);
            setData(true);
            if (response.data.data.length === 0) {
                setData(false); // Set getData to false if no data is found
            }
          } catch (error) {
            console.log(error);
          } finally { 
            setpageLoading(false); // Stop pageLoading
          }
        };
    
        const delayDebounce = setTimeout(() => {
          fetchData();
        }, 500); // Debounce delay
    
        return () => clearTimeout(delayDebounce);
      }, [search]);
    
      const handleInputChange = (e) => {
        setSearch(e.target.value);
      };
      const handleEnter = (e) => {
        if (e.key === "Enter" && getAllData.length !==0) {
          navigate(`/search/${search}`, { state: { searchResults: getAllData } });
        }
      };

      const handleSearchClick = () => {
          
        if(getAllData.length !==0){
            navigate(`/search/${search}`, { state: { searchResults: getAllData } });

        }
      };
    return (
        <>
            <div dir="rtl" className="h-screen w-full flex flex-col justify-center items-center 1.5xl:pt-[max(20vh,5vh)] 1.5xl:gap-5">
                {
                    loading ?(
                        <div className="size-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#4F24FF" stroke="#4F24FF" strokeWidth="15" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#4F24FF" stroke="#4F24FF" strokeWidth="15" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#4F24FF" stroke="#4F24FF" strokeWidth="15" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
                        </div>
                    ):(
                        <>
                            {
                                !getData &&
                                <div className="pb-[110px] font-bold 1.5xl:text-5xl text-2xl text-white flex items-center">
                                    بەخێربێیت، {user?.first_name}
                                </div>
                            }
                            <div dir="ltr" className={`transition-all duration-500 flex flex-col items-center ${getData ? "justify-end gap-2 pt-4" : "justify-center"}`}>
                            <form className="font_Rabar_021 relative flex flex-row px-2.5 items-center w-[391px] h-[45px] bg-white rounded-[78px] mx-auto
                                1.5xl:w-[705px] 1.5xl:h-[70px] 1.5xl:px-4.5 " onSubmit={handleEnter}>
                                <div onClick={handleEnter} className="ml-4 rotate-[14.46deg] 1.5xl:scale-[1.3] cursor-pointer">
                                    <img
                                        src="public/SVG/searchIcon.svg"
                                        alt="Search Icon"
                                        className="w-[31px] h-[28px]"
                                    />
                                </div>

                                <div className="flex-grow font-bold text-base text-right text-[#000000] placeholder-[#787878] 
                                    1.5xl:text-[24px]">
                                    <input
                                        id="searchBox"
                                        dir="rtl"
                                        type="text" 
                                        value={search}
                                        onChange={handleInputChange}
                                        onKeyDown={handleEnter}
                                        placeholder="گەڕان بەدوای وشە ..."
                                        className="h-full w-full pl-4 pr-2 focus:outline-none"
                                    />
                                </div>

                                <div className="w-[75px] h-[30px] bg-[#155DFC] rounded-[20px] flex items-center justify-center font-bold text-base text-white
                                    1.5xl:w-[113px]  1.5xl:h-[44px] 1.5xl:rounded-full 1.5xl:text-[20px]
                                    hover:bg-[#0037ff] shadow-[0_0_7px_rgba(0,0,0,0.35)]">
                                    <button type="submit"  onClick={handleSearchClick}  className="w-full h-full">
                                        گەڕان
                                    </button>
                                </div>
                                </form>  
                                {pageLoading ? (
                                    <div className="size-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#4F24FF" stroke="#4F24FF" stroke-width="15" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#4F24FF" stroke="#4F24FF" stroke-width="15" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#4F24FF" stroke="#4F24FF" stroke-width="15" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
                                    </div>
                                ) :(
                                        getData && <SearchResult getData={getAllData} />
                                    )
                                }
                            </div>

                            {!getData && (
                                <div className="w-[217px] h-[48px] bg-[#155DFC] rounded-[6px] flex items-center justify-center font-bold text-base text-white
                                            1.5xl:w-[217px]  1.5xl:h-[48px] 1.5xl:rounded-[6px] 1.5xl:text-[20px] 1.5xl:mt-10 1.5xl:mb-[150px] mt-5
                                            hover:bg-[#0037ff] shadow-[0_0_7px_rgba(0,0,0,0.35)]">
                                    <Link to='/moderator/voting' className="w-full h-full">
                                        <button type="submit" className="w-full text-white h-full" style={{ fontSize: '22px' }}>
                                            دەنگدان
                                        </button>
                                    </Link>
                                </div>
                            )} 
                        </>
                    )
                } 
                 
                
                
                
            </div>
        </>
    );
}

export default ModeratorMain;
