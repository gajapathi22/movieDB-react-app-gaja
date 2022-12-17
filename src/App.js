import React,{useState,useEffect} from 'react';
import './App.css';
import MovieBox from './MovieBox';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Container,Nav,Form, FormControl, } from 'react-bootstrap';


// const API_URL='process.env.REACT_APP_API_KEY';
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`
// const API_URL="https://api.themoviedb.org/3/movie/latest?api_key=<<api key>>&language=en-US";
// const API_SEARCH="https://api.themoviedb.org/3/search/movie?api_key=<<api key>>&query";
console.log(process.env.REACT_APP_API_KEY)
function App() {

  const [movies, setMovies]=useState([]);
  const [query, setQuery]=useState('');

  useEffect(() => {
    fetch(API_URL)
    .then((res)=>res.json())
    .then(data=>{
      console.log(data);
      setMovies(data.results);
    })
  }, [])


  const searchMovie = async(e)=>{
    e.preventDefault();
    console.log("Searching");
    if (query){
      try{
        const url=`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${query}`;
        const res= await fetch(url);
        const data= await res.json();
        console.log(data);
        setMovies(data.results);
      }
      catch(e){
        console.log(e);
      }
    }
   else{
    fetch(API_URL)
    .then((res)=>res.json())
    .then(data=>{
      console.log(data);
      setMovies(data.results);
    })
   }
  }

  const changeHandler=(e)=>{
    setQuery(e.target.value);
  }
  return (
    <>
    
    <Navbar bg="white" expand="lg" variant="dark">
      <Container fluid>
            <Nav 
            className="me-auto my-2 my-lg-3"
            style={{maxHeight:'100px'}}
            navbarScroll></Nav>
            
            <Form className="d-flex" onSubmit={searchMovie} autoComplete="off">
               
              <FormControl
              type="search"
              placeholder="Search for a movie"
              className="me-2"
              aria-label="search"
              name="query"
              value={query} onChange={changeHandler}>
              
              </FormControl>
            
              
             
          
            </Form>
      </Container>
    </Navbar>
    <hr/>
    
    <div>
      <div style = {{fontWeight:'bold', marginLeft:100}}>Most Recent Movies</div>
      {movies.length > 0 ?(
        <div className="container">
        <div className="grid">
          {movies.map((movieReq)=>
          <MovieBox key={movieReq.id} {...movieReq}/>)}
            </div>
    </div>
      ):(
        <h2>Sorry !! No Movies Found</h2>
      )}
    </div>   
    </>
   
  );
}

export default App;
