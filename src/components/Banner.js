import React, { useEffect, useState }  from 'react';
import axios from "../api/axios";
import requests from "../api/requests";
import "./Banner.css";
import styled from "styled-components";


// 로고 아래에 2번째로 구현하는 배경화면 이미지. 뒤 배경에 나오는 영화 이미지들이 리로드 할때마다 랜덤으로 나옴
export default function Banner() {
    const [movie, setMovie ] = useState([]);

    /* play 버튼을 누르면 해당 영화정보에 관한 비디오가 재생되는 로직이다. */
    const [isClicked, setClicked] = useState(false);

    useEffect( ()=> {
        fetchData();
    },[]);

    /*비동기로 요청을 보내기 때문에 , 바로 요청받은것을 처리 할수 있는게 아닌 
    요청 보낸곳에서도 일종의 처리시간이 필요하기 때문에 일정의 텀을 기다린후 데이터를 넘겨 받고 나서 실행해야 함.따라
    await 라는 것을 붙여준다. */
    const fetchData = async () => {

        // 현재 상영중인 영화 정보를 가져옴 (여러가지의 영화)
        /* 따라 .get(request) 정보를 넘겨 받은후 변수에 담는다. api.reaust 에 넣은  이미지 랜덤값에 대한
        api주소를 넣어준다. r그리고 import axios의 경로를 바꿔준다*/
    
        const request = await axios.get(requests.fetchNowPlaying);
        console.log(request)

        // 여러 영화중 하나의 영화를 가져오기 위래. 랜덤의 숫자중 1개의 아이디를 가져온다. 
        const movieId = request.data.results[ Math.floor(Math.random() * request.data.results.length)
        ].id;
    

        // 특정 영화의 더 상세한 정보를 가져오기 ( 비디오 정보도 포함.)
        const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
            params: { append_to_response: "videos" },
        });
        setMovie(movieDetail);
    };

    /* str 이 있을 때만 length의 값을 구한다. str이 없을때도 length의 길이를 구라혀고 하면 undefined의 에러.
    str, number 값을 받아오고 str이 있다면 length가 n(100)보다 크면 substr을 이용해 (0 부터 ~ n-1) 을 보여주고 
    + ... 를 붙여준다. 그게 아니면 : 원래의 string 을 보여준다. */
    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "...": str;
    }

    console.log('movie', movie)
    if(!isClicked){

    return(
        <header
        className="banner"
        style={{
            backgroundImage: `url("http://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
            backgroundPosition: "top center",
            backgroundSize: "cover",
        }}
        >
        <div className='banner__contents'>
            {/* 받아오는 데이터에 title 이 없으면 name 을 보여주고 , name이 없으면 original_name을 보여줌  */}
            <h1 className='banner__title'>{movie.title || movie.name || movie.original_name}</h1>

            <div className='banner__buttons'>
                <button className='banner__button play'
                 onClick={() => setClicked(true)}>Play</button>

                <button className='banner__button info'>More Information</button>
            </div>

            {/* 영화 상세설명인데. 100자 이상이면 글 자른후에 ... 붙이기. truncate 자르다 라는 명령어 
            영화의 상세정보가 100글자 가 넘어가면. */}
            <h1 className='banner__description'>{movie.overview}
            {truncate(movie.overview, 100)}
            </h1>
        </div>
        <div className='banner--fadeBottom' />
    </header>
    );
        } else {
            return(
                <Container>
                    <HomContainer>
                    <Iframe width="560" 
                    height="315" 
                    src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen></Iframe>
                    </HomContainer>
                </Container>
            )
        }
}

const Iframe = styled.iframe`
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.65;
    border: none;

    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`

const HomContainer = styled.div`
width: 100%;
height: 100%;
`