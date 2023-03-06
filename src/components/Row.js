import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import "./Row.css";
import MovieModal from './MovieModal';
import { Swiper , SwiperSlide} from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import 'swiper/css';
import "swiper/css/scrollbar"
import "swiper/css/navigation"
import "swiper/css/pagination"

/* App.js 에 있는 정보들을 porps 로 내려받는다 . 필요한 영화 정보들을 먼저 받아오기 */
function Row({ isLargeRow, title, id, fetchUrl }) {
    const [movies, setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelected, setMovieSelected] = useState({});


    useEffect( () => {
        fetchMovieData();
    },[]);

    const fetchMovieData = async () => {
        const request = await axios.get(fetchUrl);
        console.log('request',request);
        setMovies(request.data.results);
    };

    // 클릭시 모달창이 열리는 부분에 대한 로직.
    const handleClick = (movie) => {
        setModalOpen(true)
        setMovieSelected(movie);
    };

  return (
  <section className='row'>
    <h2>{title}</h2>
     <Swiper
     modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={5}
      loop={true}
      breakpoints={{
        1378:{
            slidesPerView: 6,
            slidesPerGroup: 6,
        },
        998: {
            slidesPerView: 5,
            slidesPerGroup: 5,
        },
        625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
        },
        0: {
            slidesPerView: 3,
            slidesPerGroup: 3,
        }
      }}
       navigation
      pagination={{ clickable:true }}
    >

    {/* <div className='slider'>
    <div className='slider__arrow-left'>
        <span 
        className='arrow'
        onClick={ () => {
            document.getElementById(id).scrollLeft -= window.innerWidth -80;
        }}>
            {"<"}
            </span>
    </div> */}

    <div id={id} className='row__posters'>
    {movies.map((movie) => (
        <SwiperSlide>
        <img
            key={movie.id}
            style={{ padding: "25px 0" }}
            className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
            src={`https://image.tmdb.org/t/p/original/${
                isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                alt= {movie.name}
                onClick={() => handleClick(movie)}  // 영화를 클릭시 그 영화에 대한 정보가 나와야한다. 
                />
                
            </SwiperSlide>
    ))}
    </div>
    </Swiper>
    {/* modalOpen 이 true 일때 모달창이 열렸을때  MovieModal창에 있는 내용을 보여준다.*/}
        {modalOpen && 
        (<MovieModal {...movieSelected}
          setModalOpen={setModalOpen}/>
       )}

    {/* <div className='slider__arrow-right'>
        <span 
        className='arrow'
        onClick={() => {
            document.getElementById(id).scrollLeft +=window.innerWidth -80;
        }}>
            {">"}
        </span>
    </div> */}
    {/*</div>*/}
</section>
 );
}
export default Row;