import React from 'react'
import styled from 'styled-components';
import { GithubContext} from '../context/context'
import { Pie, Column, Bar, Doughnut } from './Charts';

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }
  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;


const Repos = () => {
    const { repos } = React.useContext(GithubContext);

    // get languages 
    const languages = repos.reduce( (total,item) => {
      const { language , stargazers_count } = item; 
      if(!language) return total; 
 
        // languages/total {
        //    'HTML' : { label: 'HTML' , value: 14 }, -> language = HTML / total['HTML'] = {}
        //    'CSS': { label:'CSS' , value:38 },
        //    'PHP' : { label: 'PHP' , value: 68 }
        // } ; 

        // Check obj-total have property yet ,if property of total obj not exist , add one  
      if(!total[language]) {
        // add,update dynamic property for total object
        // language = 'HTML' => total['HTML']: {label: HTML ....}
        total[language] = { 
          label: language , 
          value: 1 ,
          stars: stargazers_count ,
        }; 
      }
      // update property already exist
      else {
        total[language] = {
          ...total[language],
          value: total[language].value + 1,
          stars: total[language].stars + stargazers_count
        };
      }
      return total; 
    }, {});

    // most use language 
    const mostUsed = Object.values(languages)
      .sort((a, b) => b.value - a.value)
      .slice(0,5); 
    
    // most stars per language
    const mostPopular = Object.values(languages)
      .sort((a,b) => b.stars - a.stars)
      .map( item => { 
        return { ...item , value: item.stars }; 
      })
      .slice(0,5);

    // get stars, forks
    // total.stars : { 
    //    stargazers_count: { label: name , value: stargazers_count },
    // },
    // total.forks
    let { stars , forks } = repos.reduce((total,item) => {
        const { stargazers_count , name , forks } = item;
        // add property for stars,forks in total , stargazers_count sẽ overwrite sau mỗi loop
        total.stars[stargazers_count] = { label: name, value: stargazers_count };
        total.forks[forks] = { label: name, value: forks };

        return total
      } , 
      { stars:{}, forks:{} }
    );

    // slice(-5) get last 5 item
    stars = Object.values(stars).slice(-5).reverse();
    forks = Object.values(forks).slice(-5).reverse();

    // construct for chart data { label: , value: }
    // const chartData = [
    //   {
    //     label : 'HTML',
    //     value : 15
    //   },
    //   {
    //     label : 'CSS',
    //     value : 170
    //   },
    //   {
    //     label : 'Java',
    //     value : 20
    //   }
    // ];

    return (
        <section className='section'>
            <Wrapper className='section-center'>
              <Pie data={mostUsed} />
              <Column data={stars} />
              <Doughnut data={mostPopular} />
              <Bar data={forks} />
            </Wrapper>
        </section>
    )
};

export default Repos


