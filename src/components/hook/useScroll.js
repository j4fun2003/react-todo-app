import React, { useEffect, useRef, useState } from "react";


const useScroll = (list , loading , setLoading) => {
  const limit = 5;
  const [page, setPage] = useState(1);
  const refOfElement = useRef(null);

  useEffect(() => {
    const handleScrollToEnd = () => {
      const lastItem = page * limit;
      const { scrollTop, scrollHeight, clientHeight } = refOfElement.current;
      console.log("scrollTOp", scrollTop);
      console.log("scrollHeight", scrollHeight);
      console.log("clientHeight", clientHeight);
      if (scrollTop + clientHeight + 1 >= scrollHeight && lastItem < list.length) {
        if (!loading) {
          setLoading(true);
          setTimeout(() => {
            setPage(prevPage => prevPage + 1);
            setLoading(false);
          }, 1000);
        }
      }
    };

    const element = refOfElement.current;
    if (element) {
      element.addEventListener('scroll', handleScrollToEnd);

      return () => {
        element.removeEventListener('scroll', handleScrollToEnd);
      };
    }
  }, [list, loading, page]);

  return {
    limit,
    page,
    refOfElement
  };
};


export default useScroll;
