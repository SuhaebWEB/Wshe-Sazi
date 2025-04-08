import { useState,useEffect } from "react";
import axios from "../../api/axios";
import useAuth from "../../Auth/AuthContext";



const MyAccount = () => {
    const [userInfo, setUserInfo] = useState({
        id:"",
        first_name:'',
        last_name:"",
        email:"",
        phone_no:"",
    });

    const { csrf,user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try{
                await csrf();
                const response = await axios.get("api/moderator/myAccount");
                setUserInfo(response.data.user);
            }catch(error){
                console.log(error);
            }
        }
        fetchData();
    },[]) 
    return (
        <>
            <div dir="rtl" className="h-screen w-full flex flex-col justify-center items-center ">
                <div className="flex flex-col items-start justify-start gap-0 w-[350px] h-[550px] px-2.5 bg-white rounded-[21px] shadow-lg text-[24px] text-black 
                                1.5xl:w-[650px] 1.5xl:h-[60vh] 1.5xl:justify-start 1.5xl:pt-[10px]">
                    <div className="w-full pt-[10px] 1.5xl:pb-3" >
                        <h2 className="1.5xl:pb-3">هەژمارەکام</h2>
                        <div className="h-[1px] bg-black" />
                    </div>
                    <div className= "self-center flex flex-col items-center 1.5xl:items-start 1.5xl:self-auto px-10 mt-5" >
                        <h4>ناوم:</h4>
                        <h2>{user?.first_name}</h2><br />
                        <h4>ئیمەیڵەکەم:</h4>
                        <h2>{user?.email}</h2><br />
                        <h4>ژمارە مۆبایلم:</h4>
                        <h2 dir="ltr">{user?.phone_no}</h2>
                    </div>

                </div>
            </div>
        </>
    );
}

export default MyAccount;