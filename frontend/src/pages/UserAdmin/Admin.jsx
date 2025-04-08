import { useState, useEffect } from "react"; 
import axios from "../../api/axios";
import UseAuth from "../../Auth/AuthContext"; 

const Admin = () => {

  const { csrf, logout,loading } = UseAuth(); 
  const [getMessageError, setMessageError] = useState({});
  const [getData, setData] = useState([]); 
  const [getValue, setValue] = useState({
    first_name: "",
    last_name: "",
    phone_no: "",
    email: "",
    password: "",
    role:"2"
  });

  const [loadingData,setLoadingData] = useState(true)
  const [loadingSubmitData,setLoadingSubmitData] = useState(false)

  const handlingLogout = () => {
    logout();
  }
  const [getSuccessedMessage,setSucessedMessage] = useState('Hello world') 

  const handleChange = (e) => {
    setValue({ ...getValue, [e.target.name]: e.target.value });
  }; 

  const fetchUsers = async () => {
    setLoadingData(true);
    try {
      const response = await axios.get("/api/admin/user");
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }finally{
      setLoadingData(false);
    }
  };

  const handlingSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmitData(true);
    try {
      await csrf();
      const response = await axios.post("/api/admin/user", getValue);
      setSucessedMessage(response.data.message)
      
      // ✅ Immediately update state with new user
      setData((prevData) => [...prevData, response.data.data]);
  
      // ✅ Clear input fields after submission
      setValue({
        first_name: "",
        last_name: "",
        phone_no: "",
        email: "",
        password: "",
        role: "2",
      });

      setMessageError({}); // Reset errors after submit

      fetchUsers();
  
    } catch (error) {
      if(error?.response && error?.response.data.errors){
        setMessageError(error?.response.data.errors)
      } 
    }finally{
      setLoadingSubmitData(false);
    }
  }; 
  

  useEffect(() => { 
    fetchUsers();  
  }, []);
  
  return (
    <>
      <div className="h-screen w-full flex flex-col justify-around items-center 1.5xl:gap-5 ">
        {
          loading ? (
            <div className="size-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#4F24FF" stroke="#4F24FF" strokeWidth="15" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#4F24FF" stroke="#4F24FF" strokeWidth="15" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#4F24FF" stroke="#4F24FF" strokeWidth="15" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
            </div>
          ):(
            <div className="w-full flex flex-col items-center justify-center gap-6"> 
              <div className="h-auto max-sm:w-11/12 min-h-[64vh] sm:min-h-[70vh] sm:px-10 z-10 relative">
                <h1 className="text-center text-white text-3xl sm:text-5xl pt-5 pb-10">
                  زیادکردنی ئەندام
                </h1>
                <div className="w-full bg-white rounded-[28px] p-5 sm:p-8 flex flex-col 1.5xl:flex-row gap-y-4 1.5xl:gap-x-4">
                  <div className="w-full 1.5xl:h-96 h-56 overflow-scroll">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs text-gray-700 uppercase">
                        <tr>
                          <th scope="col" className="px-4 py-3">#</th>
                          <th scope="col" className="px-2 py-3">First Name</th>
                          <th scope="col" className="px-2 py-3">Last Name</th>
                          <th scope="col" className="px-3 py-3  min-w-32">Phone Number</th>
                          <th scope="col" className="px-3 py-3">Email</th>
                          <th scope="col" className="px-1 py-3">role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          loadingData ?(
                            <tr>
                                <td colSpan={6} className="size-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#4F24FF" stroke="#4F24FF" strokeWidth="15" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#4F24FF" stroke="#4F24FF" strokeWidth="15" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#4F24FF" stroke="#4F24FF" strokeWidth="15" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
                                </td>
                            </tr>
                          ):(
                            getData.map((user, index) => (
                              <tr key={index} className="bg-white border-b border-gray-200">
                                <td className="text-center">{index+1}</td>
                                <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
                                  {user?.first_name}
                                </th>
                                <td className="px-2 py-4">{user?.last_name}</td>
                                <td className="py-4 px-3">{user?.phone_no}</td>
                                <td className="px-3 py-4">{user?.email}</td>
                                <td className="px-1 py-4">{user?.role}</td>
                              </tr>
                            ))
                          )
                        }
                      </tbody>
                    </table>
                    
                  </div>
                  {/* Form Section */}
                  <div className="w-full">
                    <form dir="rtl" className="w-full flex flex-col items-center" onSubmit={handlingSubmit}>
                      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 mb-10">
                        <div>
                          <label htmlFor="name">Firstname</label>
                          <input type="text" value={getValue.first_name} name="first_name" id="name" placeholder="Enter your first name" onChange={handleChange} className={`w-full h-10 bg-[#EDEDED] border-b-4  ${getMessageError.first_name ? 'border-red-500':'border-[#5e6676] hover:border-[#407dff]'} rounded-md focus:border-[#155DFC] focus:outline-none`} />
                          {
                            getMessageError.first_name && (
                              <div className="mt-0.5 py-1  text-red-500  flex justify-between items-center">
                                <span >{getMessageError.first_name}</span> 
                              </div>
                            )
                          }
                        </div>
                        <div>
                          <label htmlFor="lastname">Last Name</label>
                          <input type="text" value={getValue.last_name} name="last_name" id="lastname" placeholder="Enter your last name" onChange={handleChange} className={`w-full h-10 ${getMessageError.last_name ? 'border-red-500':'border-[#5e6676] hover:border-[#407dff]'} bg-[#EDEDED] border-b-4  rounded-md  focus:border-[#155DFC] focus:outline-none`} />
                          {
                            getMessageError.last_name && (
                              <div className="mt-0.5 py-1  text-red-500  flex justify-between items-center">
                                <span >{getMessageError.last_name}</span> 
                              </div>
                            )
                          }
                        </div>
                        <div>
                          <label htmlFor="email">Email</label>
                          <input type="email" value={getValue.email} name="email" id="email" placeholder="Enter your email" onChange={handleChange} className={`w-full h-10 bg-[#EDEDED] border-b-4  ${getMessageError.email ? 'border-red-500':'border-[#5e6676] hover:border-[#407dff]'} rounded-md focus:border-[#155DFC] focus:outline-none`} />
                          {
                            getMessageError.email && (
                              <div className="mt-0.5 py-1  text-red-500  flex justify-between items-center">
                                <span >{getMessageError.email}</span> 
                              </div>
                            )
                          }
                        </div>
                        <div>
                          <label htmlFor="phone_no">Phone Number</label>
                          <input type="number" value={getValue.phone_no} name="phone_no" id="phone_no" placeholder="Enter your phone number" onChange={handleChange} className={`w-full h-10 bg-[#EDEDED] border-b-4  ${getMessageError.phone_no ? 'border-red-500':'border-[#5e6676] hover:border-[#407dff]'} rounded-md focus:border-[#155DFC] focus:outline-none`} />
                          {
                            getMessageError.phone_no && (
                              <div className="mt-0.5 py-1  text-red-500  flex justify-between items-center">
                                <span >{getMessageError.phone_no}</span> 
                              </div>
                            )
                          }
                        </div>
                        <div className="w-full">
                          <label htmlFor="password">Password</label>
                          <input type="password" value={getValue.password} name="password" id="password" placeholder="Enter your password" onChange={handleChange} className={`w-full h-10 bg-[#EDEDED] border-b-4  ${getMessageError.password ? 'border-red-500':'border-[#5e6676] hover:border-[#407dff]'} rounded-md focus:border-[#155DFC] focus:outline-none`} />
                          {
                            getMessageError.password && (
                              <div className="mt-0.5 py-1  text-red-500  flex justify-between items-center">
                                <span >{getMessageError.password}</span> 
                              </div>
                            )
                          }
                        </div>
                      </div>
                      <button type="submit" className="w-full sm:w-1/4 py-2 bg-white transition-all duration-200 text-[#155DFC] border-2 active:bg-[#155DFC] active:text-white border-[#0044d6] rounded-lg font-bold">
                        داخیل کردن
                      </button>

                    </form>
                  </div>
                </div>
              </div>
              <button type="button" onClick={handlingLogout} className="max-1.5xl:mb-3 w-[325px] 1.5xl:w-[580px] h-[51px] text-xl 1.5xl:pr-5 1.5xl:text-2xl rounded-full 1.5xl:rounded-[20px] items-center  bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white flex flex-row-reverse justify-around 1.5xl:justify-start ">
                چوونەدەرەوە
                <img
                  src=" ../public/SVG/Exit.svg "
                  alt="Exit Icon"
                  className="w-[30px] h-[30px] 1.5xl:mr-auto 1.5xl:ml-5"
                />
              </button>
            </div> 
          )
        }
        {
          loadingSubmitData && (
            <>
              <div className="absolute z-10 h-screen w-full bg-gray-100 opacity-15" />
              <div className="z-20 size-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#4F24FF" stroke="#4F24FF" strokeWidth="15" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#4F24FF" stroke="#4F24FF" strokeWidth="15" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#4F24FF" stroke="#4F24FF" strokeWidth="15" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
              </div> 
            </>
          )
        }
      </div>
    </>
  );
};

export default Admin;
