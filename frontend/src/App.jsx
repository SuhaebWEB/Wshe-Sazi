
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ModeratorDashboard from './pages/Moderator/ModeratorDashboard';
import AddingKurdishTranslation from './pages/Moderator/addingKurdishTranslation';
import WordsHistory from './pages/Moderator/wordsHistory';
import VotingHistory from './pages/Moderator/votingHistory'; 
import ModeratorHome from './pages/Moderator/ModeratorHome';
import Voting from './pages/Moderator/Voting';
import MyAccount from './pages/Moderator/MyAccount';
import Admin from './pages/UserAdmin/Admin';
 
import ModeratorLayout from './Layouts/ModeratorLayout';
import GuestLayout from './Layouts/GuestLayout';
import AdminLayout from './Layouts/AdminLayout';
import SearchResultPaginate from './pages/SearchResultPage';
function App() {

  
  return (
    <>

      <div className="flex justify-center mx-auto font_Rabar_021 ">
        <Navbar />
      </div>
      <div className="font_Rabar_021">
        <Routes >

          
          <Route element={<GuestLayout/>}>
            <Route path='/login' element={ <Login /> } /> 
          </Route>
          
          <Route path='/' element={ <Home /> } />
          <Route path='/search/:getdata' element={ <SearchResultPaginate /> } />
            

          <Route  element={<ModeratorLayout/>}>
            <Route path='/moderator' element={ <ModeratorHome /> } />
            <Route path='moderator/dashboard' element={ <ModeratorDashboard /> } />
            <Route path='moderator/create' element={ <AddingKurdishTranslation /> } />
            <Route path='moderator/account' element={ <MyAccount /> } />
            <Route path='moderator/words_history' element={ <WordsHistory /> } />
            <Route path='moderator/voting_history' element={ <VotingHistory /> } />
            <Route path='moderator/voting' element={ <Voting /> } />
          </Route> 

          <Route element={<AdminLayout/>}>
              <Route path='/admin' element={ <Admin /> } />
          </Route>


        </Routes>
      </div>


    </>

  )
}

export default App