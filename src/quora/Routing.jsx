import React from "react"
import './Quora.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Answer from "./Answer";
import Spaces from "./Spaces";
import Search from "./Search";
import Language from "./Language";
import Profile from "./Profile";
import Question from "./AddQuestion";
import Notification from "./Notification";
import Practise from "./Practise";
import Following from "./Folowing";
import PostList from "./PostList";
import Logout from "./Logout";
import Header from "./Navbar";
import AddPost from "./AddPost";
import QuestionsList from "./QuestionList";
import Comments from "./Comments";
import Answers from "./Answer";
import PageNotFound from "./PageNotFound";
import LoginPage from "./LoginPage";
import SingInPage from "./SignInPage";
import MyPosts from "./MyPosts";
import Bookmarks from "./Bookmark";
import CraditCard from "./CreditCard";
import Spiners from "./Spiners";
import CreditCard from "./CreditCard";
import DeleteAccount from "./DeleteAccount";
import ProtectedRouet from "./ProtectedRoute";
const Quora = (props) => {
  return (
    <div>
<BrowserRouter>
<Header/>
<Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/comments" element={<Comments/>}/>
    <Route path="following" element={<Following/>}/>
    <Route path="/answer" element={<ProtectedRouet Component={Answer}/>}/>
    <Route path="/spaces" element={<Spaces/>}/>
    <Route path="/notification" element={<Notification/>}/>
    <Route path="/search" element={<Search/>}/>
    <Route path="/language" element={<Language/>}/>
    <Route path="/Profile" element={<Profile/>}/>
    <Route path="/question" element={<Question/>}/>
    <Route path="/questionslist" element={<QuestionsList/>}/>
    <Route path="/postslist" element={<PostList/>}/>
    <Route path="/loginpage" element={<LoginPage/>}/>
    <Route path="/signup" element={<SingInPage/>}/>
    <Route path="/logout" element={<Logout/>}/>
    <Route path="/deleteaccount" element={<DeleteAccount/>}/>
    <Route path="/myposts" element={<MyPosts/>}/>
    <Route path="/addpost" element={<ProtectedRouet Component={AddPost}/>}/>
    <Route path="/bookmark" element={<ProtectedRouet Component={Bookmarks}/>}/>
    <Route path="/practise" element={<Practise/>}/>
    <Route path="/creditcard" element={<CreditCard/>}/>
    <Route path="/spiners" element={<Spiners/>}/>
    
    <Route path="/*" element={<PageNotFound/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  )
};

export default Quora;
