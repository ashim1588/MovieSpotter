import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';
import { useCallback, useEffect, useState } from 'react';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setIsError(null);
    try {
      const res = await fetch('your firebase url here');
      if( !res.ok ) {
        throw new Error("Oops! can't fetch movies now. Try again later");
      }
      const allMoviesList = await res.json();
      if (!allMoviesList){
        throw new Error("Can't fetch movies now.");
      }
      const transformedMovies = [];
      for (const key in allMoviesList) {
        transformedMovies.push({ 
         id: key,
         title: allMoviesList[key].title,
         openingText: allMoviesList[key].openingText,
         releaseDate: allMoviesList[key].releaseDate
        });
       }
       setMovies(transformedMovies);
    } catch (error) {
      setIsError(error.message);
    }
      
    setIsLoading(false);
  },[]);

  useEffect(() => {
    fetchMoviesHandler();
  },[fetchMoviesHandler]);

  let moviesContent = <p>No Movies Availabel.</p>;

  if(movies.length > 0){
    moviesContent = <MoviesList movies={movies} fetchMovies={fetchMoviesHandler}/>;
  }
  if (error) {
    moviesContent = <p>{error}</p>;
  }
  if(isLoading){
    moviesContent = <p>Loading Movies ...</p>
  }

  const addMovieHandler = async (movie) => {
    const res = await fetch(
      "your firebase url here",{
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {'ContentType': 'application/JSON'}
      });
      const resData = await res.json();
      console.log(resData);
      fetchMoviesHandler();
  }
  
  return (
    <>
      <section><AddMovie onAddMovie={addMovieHandler}/></section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {moviesContent  }
      </section>
    </>
  );
}

export default App;
