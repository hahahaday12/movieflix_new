import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params:{
        api_key: process.env.REACT_APP_MOVIE_DB_API_KEY,// 정보 보호를 위해 환경변수 사용. 
        language: "ko-KR",
    }
});

export default instance;