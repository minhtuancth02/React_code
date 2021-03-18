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

    // search -> update state
    const searchGithubUser = async (user) => {
        toggleError(); 
        setIsLoading(true);

        const res = await axios.get(`${rootUrl}/users/${user}`).catch(err => console.log(err));
        
        // request success , user exist -> update state (githubUser, repos, followers)
        if(res) {
            setGithubUser(res.data);
            const { login , followers_url } = res.data;
            await Promise.allSettled([
                axios(`${rootUrl}/users/${login}/repos?per_page=100`), // repos request
                axios(`${followers_url}?per_page=100`), // followers
              ])
              .then(results => {
                const [ repos, followers ] = results; // array(2): results [ {status:'fulfilled' , value:{...}} , {status: ,value: } ]
                if(repos.status === 'fulfilled') { setRepos(repos.value.data); }
                if(followers.status === 'fulfilled') { setFollwers(followers.value.data); }
              })
              .catch( err => console.log(err));

            // [ Repos] (https://api.github.com/users/john-smilga/repos?per_page=100)
            // await axios.get(`${rootUrl}/users/${login}/repos?per_page=100`)
            //      .then(response => setRepos(response.data) )
            
            // [Followers] (https://api.github.com/users/john-smilga/followers)
            // await axios.get(`${followers_url}?per_page=100`)
            //      .then(response => setFollwers(response.data)) 
        }
        else { 
            toggleError(true , 'No user with that name'); 
        }
        checkRequests(); // after request check remaining value
        setIsLoading(false); // loading is done 
    };


    function toggleError(showErr = false , msg = '') {
        setError({showErr, msg});
    };

    // check rate -> requests limit - [Rate Limit](https://api.github.com/rate_limit)
    // response {  data: {} , .... } ; let { data } = resposne
    //  data { 
    //     rate: { limit: 60 , remaining: 54 , ... }, // data.rate
    //     resources: { core: {...} , graphic: {....} }
    //  }
    const checkRequests = () => {
        axios(`${rootUrl}/rate_limit`)
            .then( ({ data }) => {
                let { rate: {remaining} } = data; // get remaining from data{}
                setRequests(remaining);
                if (remaining === 0) {
                    toggleError(true , 'You out of limits')
                }
            })
            .catch(err => console.log(err))
    };

    // check error , limits every re-render 
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

export { GithubContext , GithubProvider };