/* useDebounce 란? -> 특정 시간이 지난 후에 한 번만 이벤트가 실행되도록 하는 것
    ex)  영화검색창에 글자를 입력 할때마다 한글자마다의 데이터가 표시됨으로 너무 쓸모 없은 데이터 들이 소요가 된다. 
    따라, delay 를 시켜서 정해준 시간 이후에  state 값으로 들어가게 하는것.
*/

import {useState, useEffect } from "react";

export const useDebounce = (value, delay) => {

    const [debounceValue, setDebounceValue] = useState(value);

    useEffect( () => {
        const handler = setTimeout( ()=> {
            setDebounceValue(value)
        }, delay);

            return () => {
                clearTimeout(handler);
            };
    },[value, delay]);

    return debounceValue;
};