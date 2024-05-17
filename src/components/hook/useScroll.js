import React, { useEffect, useRef, useState } from "react";

const useScroll = (list, updateLoading) => {
  const limit = 5;
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
        updateLoading(true);
        setTimeout(() => {
          setPage(prevPage => prevPage + 1);
          console.log("page", page);
          updateLoading(false);
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
  }, [list, page, updateLoading]);

  return {
    limit,
    page,
    refOfElement
  };
};


export default useScroll;
