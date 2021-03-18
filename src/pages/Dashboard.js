import React, { Suspense } from 'react'
import { Info, Repos, User, Search, Navbar } from '../components'
// import Info from '../components/Info';
// import Repos from "../components/Repos";
// import User from "../components/User";
// import Search from "../components/Search";
// import Navbar from "../components/Navbar";

import { GithubContext } from '../context/context.js';
import loadingImage from '../images/preloader.gif';

const Dashboard = () => {
    const { isLoading } = React.useContext(GithubContext);
    
    if (isLoading) {
      return (
        <main>
          <Navbar />
          <Search />
          <img src={loadingImage} className='loading-img' alt='loading' />
        </main>
      );
    }

    return (
      // <Suspense fallback={
      //       <main>
      //           <Navbar />
      //           <Search />
      //           <img src={loadingImage} className='loading-img' alt='loading' />
      //       </main>
      // }>
          <main>
              <Navbar />
              <Search />
              <Info />
              <User />
              <Repos />
          </main>
      // </Suspense>
    );
  };

export default Dashboard;



  
