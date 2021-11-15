import React from 'react'
import { Info, Repos, User, Search, Navbar } from '../components'
import { GithubContext } from '../context/context.js';
import loadingImage from '../images/preloader.gif';

const Dashboard = React.memo(() => {
  const { isLoading } = React.useContext(GithubContext);
  //  const { isLoading, error } = useAuth0();
    
    if (isLoading) {
      return (
        <main>
          <Navbar />
          <Search />
          <img src={loadingImage} className="loading-img" alt="loading" />
        </main>
      );
    }

  return (
    <main>
      <Navbar />
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
    );
});

export default Dashboard;



  
