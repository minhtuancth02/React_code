import React , {useState, useEffect} from 'react';
import axios from 'axios';
// import static data for default-state
import mockUser from './mockData.js/mockUser'
import mockRepos from './mockData.js/mockRepos'
import mockFollowers from './mockData.js/mockFollowers';

const rootUrl = 'https://api.github.com';
const GithubContext = React.createContext(); 

function GithubProvider ({children}) {
    const [ githubUser , setGithubUser ] = useState(mockUser);
    const [ repos , setRepos ] = useState(mockRepos);
    const [ followers , setFollwers ] = useState(mockFollowers);

    // request limit , loading status , error message
    const [ requests , setRequests ] = useState(0); 
    const [ isLoading , setIsLoading ] = useState(false);
    const [ error, setError ] = useState({ showErr: false, msg: ''});

    // search event -> update state
    const searchGithubUser = async (user) => {
      toggleError();
      setIsLoading(true);

      const res = await axios
        .get(`${rootUrl}/users/${user}`)
        .catch((err) => console.log(err));
      console.log(res);
      if (res) {
        setGithubUser(res.data);
        const { login, followers_url } = res.data;

        await Promise.allSettled([
          // return 100 post in the collection
          axios(`${rootUrl}/users/${login}/repos?per_page=100`),
          axios(`${followers_url}?per_page=100`),
        ])
          .then((results) => {
            // console.log(results)
            // results [ {status:'fulfilled' , value:{...}} , {status: ,value: } ]
            const [repos, followers] = results;
            repos.status === "fulfilled" && setRepos(repos.value.data);
            followers.status === "fulfilled" &&
              setFollwers(followers.value.data);
          })
          .catch((err) => console.log(err));
      } else {
        toggleError(true, "No username");
      }
      // after request, check 'remaining' value
      checkRequests();
      setIsLoading(false);
    };


    function toggleError(showErr = false , msg = '') {
        setError({showErr, msg});
    };

    // check rate -> requests limit - [Rate Limit](https://api.github.com/rate_limit)
    const checkRequests = () => {
        axios(`${rootUrl}/rate_limit`)
            .then(({ data }) => {
                let { rate: {remaining} } = data; 
                setRequests(remaining);
                remaining === 0 && toggleError(true , 'Reach the limit')
            })
            .catch(err => console.log(err))
    };

    // check error & limits when re-render 
    useEffect( checkRequests , []);
    
    return (
        <GithubContext.Provider 
            value={{
                githubUser , repos , followers ,
                requests, error , isLoading ,
                searchGithubUser
            }}
        >
            { children }
        </GithubContext.Provider>) 
} 

export { GithubContext, GithubProvider };

// [ Repos] (https://api.github.com/users/john-smilga/repos?per_page=100)
// await axios.get(`${rootUrl}/users/${login}/repos?per_page=100`)
//      .then(response => setRepos(response.data) )
            
// [Followers] (https://api.github.com/users/john-smilga/followers)
// await axios.get(`${followers_url}?per_page=100`)
//      .then(response => setFollwers(response.data)) 