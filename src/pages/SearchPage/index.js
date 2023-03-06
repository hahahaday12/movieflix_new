import axios from '../../api/axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "./search.css"
import { useDebounce } from '../../hooks/useDebounce';


export default function SearchPage() {
    const navigate = useNavigate();
    const[searchResults, setSearchResults] = useState([]);

    
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    const searchTerm = query.get("q")
                                                        /* 원하는 딜레이 시간 */
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    console.log('searchTerm',searchTerm);

    useEffect( ()=> {
        if(debouncedSearchTerm){
            fetchSearchMovie(debouncedSearchTerm)
        }
    },[debouncedSearchTerm]);

    const fetchSearchMovie = async(searchTerm) => {
        try {
            const request = await axios.get(
                `/search/multi?include_adult=fale&query=${searchTerm}` // 성인 영화는 포함하지 않음. 
            )
            console.log(request);
            setSearchResults(request.data.results)
        } catch (error){
            console.log("error",error);
        }
    }

    const renderSearchResults = () => {
        return searchResults.length > 0 ? (
            <section className='search-container'>
                {searchResults.map((movie) => {
                    if(movie.backdrop_path !== null && movie.media_type !== "person") {
                        const movieImageUrl = 
                        "https://image.tmdb.org/t/p/w500" + movie.backdrop_path
                        return(
                            <div className='movie' key={movie.id}>
                                <div
                                    onClick={() => navigate(`/${movie.id}`)}
                                    className='movie__column-poster'>
                                    <img src={movieImageUrl} alt="movie"
                                    className='movie__poster'/>
                                </div>
                            </div>
                        )
                    }
                })}
            </section>
        ) : (
            <section className='no-results'>
                <div className='no-results__text'>
                    <p>
                        찿고자하는 검색어"{searchTerm}"에 맞는 영화가 없습니다.
                    </p>
                </div>
            </section>
        )
    }
  return renderSearchResults ();
  
}
