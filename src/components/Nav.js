import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Nav.css"


export default function Nav() {

    // 스크롤 할때 nav바의 색상이 바뀌는 로직.  useState로 상태변경 관리를 해준다. 

    const [ show, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate(); //  input 창에 치면 경로이동 


    useEffect( () => {
        window.addEventListener("scroll", ()=> {
            console.log('window,scroll',window.scrollY);
            if ( window.scrollY > 50) {
                setShow(true);
            }else {
                setShow(false);
            }
        });
        return () =>{
            window.removeEventListener("scroll",()=>{})
        }
    },[]);

    const handleChange = (e)=> {
        setSearchValue(e.target.value);
        navigate(`/search?q=${e.target.value}`); // 입력시 입력한대로 주소창 경로 연결 
    };

  return (
  <nav className={`nav ${show && "nav__black"}`}>
    <img
    alt='Netflix logo'
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/128px-Netflix_2015_logo.svg.png"
    className='nav__logo'
    onClick={() => window.location.reload()}
    />

    <input value={searchValue} 
    onChange={handleChange} 
    className="nav__input"
    type="text"
    placeholder='영화를 검색해 주세요.'
    />
    
    <img
        alt="User logged"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        className="nav__avatar"/>
  </nav>
  )
  }
