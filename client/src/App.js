
import './App.css';
import {useState, useEffect} from 'react'
import Axios from 'axios'

function App() {
  const [movieName, setMovieName] = useState('')
  const[review, setReview] = useState('')
  const[movieList, setMovieList] = useState([])
  const[newReview, setNewReview] = useState('')


  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setMovieList(response.data)
    })
  }, [])

  const nameChangeHandler = (event) => {
    setMovieName(event.target.value)
  }
  const revChangeHandler = (event) => {
    setReview(event.target.value)}

  const submitHandler = () => {
        Axios.post('http://localhost:3001/api/insert', {
          movieName: movieName, 
          movieReview: review
        })
        setMovieList(
            [...movieList, 
            {movieName: movieName, 
            movieReview: review}]
           )
  }

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}` )
  }

  const updateReview = (movie) => {
    Axios.put('http://localhost:3001/api/update/', {
    movieName: movie, 
    movieReview: newReview
    })
    console.log(movie)
    console.log(newReview)
  }
  return (
   <div className = "App">
     <h1> CRUD APPLICATION</h1>

     <div className = "form">
       <label>Movie Name</label>
      <input 
            type = "text" 
            name = "movieName" 
            onChange ={nameChangeHandler}></input>
      <label>Movie Review</label>
      <input 
            type = "text" 
            name = "review"
            onChange = {revChangeHandler}></input> 

      <button onClick = {submitHandler}>Submit</button>

      {movieList.map((value) => {
          return(
            <div className = "card">
                <h1>{value.movieName}  </h1>
                <p>{value.movieReview}</p>

                <button onClick = {() => {deleteReview(value.movieName)}}>Delete</button>
                <input 
                    type="text" 
                    id = "updateInput"
                    onChange = {(event) => {setNewReview(event.target.value)}}  />
                <button onClick = {() => {updateReview(value.movieName)}}>Update</button>
            </div>)
      })}
      
     </div>
   </div>
  );
}

export default App;
