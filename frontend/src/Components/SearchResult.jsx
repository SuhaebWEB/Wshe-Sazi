const Searched = ({getData}) => { 
  
    return (
        <>
            <div className="transition-all duration-200 flex flex-col items-center w-[382px] h-[80vh] bg-white rounded-[21px] p-2
                                1.5xl:w-[705px] 1.5xl:h-[50vh]">
                <div className="w-full overflow-y-auto no-scrollbar::-webkit-scrollbar no-scrollbar">
                    {
                        getData.slice(0, 10).map((result, index) => (

                            <div key={index} className=" w-full flex flex-col items-center gap-3.5 1.5xl:px-6 1.5xl:items-end ">
                                <h3 className="max-1.5xl:text-center text-right mt-3" style={{ fontSize: "34px" }}>{result.kurdish_word.kurdish_word}</h3>
                                <p className=" max-1.5xl:text-center text-right " style={{ fontSize: "20px" }} > {result.kurdish_word.reason} </p>
                                <div className="h-[1px] w-full bg-gradient-to-r from-[rgba(0,0,0,0)] from-20% via-black to-[rgba(0,0,0,0)] to-80%"></div>
                            </div>
                        )
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default Searched;
