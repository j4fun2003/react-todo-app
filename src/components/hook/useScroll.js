import React, { useEffect, useRef, useState } from "react";
import {
  setLoading
} from '../redux/actions';
import { useDispatch } from 'react-redux';

const useScroll = (list) => {
  const limit = 5;
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  // const refOfComponent = useRef(null);
  const refOfElement = useRef(null);

  useEffect(() => {
    // refOfElement.current = refOfComponent.current;

    const handleScrollToEnd = () => {
      const lastItem = page * limit;
      const { scrollTop, scrollHeight, clientHeight } = refOfElement.current;
      console.log("scrollTOp", scrollTop);
      console.log("scrollHeight", scrollHeight);
      console.log("clientHeight", clientHeight);
      if (scrollTop + clientHeight + 1 >= scrollHeight && lastItem < list.length) {
        dispatch(setLoading(true));
        setTimeout(() => {
          setPage(prevPage => prevPage + 1);
          console.log("page", page);
          dispatch(setLoading(false));
        }, 1000);
      }
    };

    const element = refOfElement.current;
    if (element) {
      element.addEventListener('scroll', handleScrollToEnd);

      return () => {
        element.removeEventListener('scroll', handleScrollToEnd);
      };
    }
  }, [list, page]);

  return {
    limit,
    page,
    refOfElement
  };
};


export default useScroll;
