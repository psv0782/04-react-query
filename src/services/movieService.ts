import axios from 'axios';
import type {Movie} from '../types/movie';

const API_URL = 'https://api.themoviedb.org/3/search/movie';

interface TMDBResponse {
    results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
    const token = import.meta.env.VITE_TMDB_TOKEN;

    try {
        const response = await axios.get<TMDBResponse>(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                query,
                include_adult: false,
                language: 'en-US',
                page: 1,
            },
        });

        return response.data.results;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw new Error('Failed to fetch movies.');
    }
};