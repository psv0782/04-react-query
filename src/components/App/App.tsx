import {useState} from 'react';
import styles from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import {fetchMovies} from '../../services/movieService';
import type {Movie} from '../../types/movie';
import toast, {Toaster} from 'react-hot-toast';
import Loader from "../Loader/Loader.tsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";

export default function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const handleSearch = async (query: string) => {
        setMovies([]);
        setError(null);
        setSelectedMovie(null); // очищаем выделенный фильм
        setLoading(true);

        try {
            const results = await fetchMovies(query);

            if (results.length === 0) {
                toast.error('No movies found for your request.');
            }

            setMovies(results);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch movies.');
        } finally {
            setLoading(false);
        }
    };

    const handleSelectMovie = (movie: Movie) => {
        setSelectedMovie(movie);
    };

    const handleCloseModal = () => {
        setSelectedMovie(null);
    };

    return (
        <div className={styles.app}>
            <Toaster position="top-center"/>
            <SearchBar onSubmit={handleSearch}/>
            {loading && <Loader/>}
            {error && <ErrorMessage/>}
            <MovieGrid movies={movies} onSelect={handleSelectMovie}/>
            {selectedMovie && (
                <MovieModal movie={selectedMovie} onClose={handleCloseModal}/>
            )}
        </div>
    );
}