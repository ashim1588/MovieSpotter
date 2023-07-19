import classes from './Movie.module.css';

const Movie = (props) => {
  const removeMovieHandler = async () => {
    await fetch(
      `https://movief33eetcher-281466254-default-rtdb.firebaseio.com/movies/${props.id}.json`, {
      method: 'DELETE'
      });
      props.fetchMovies();
  }
  return (
    <li className={classes.movie} onClick={
      () => {
        if(window.confirm('Remove selected movie?')) {
          removeMovieHandler()
        }
      }
    }>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
    </li>
  );
};

export default Movie;
