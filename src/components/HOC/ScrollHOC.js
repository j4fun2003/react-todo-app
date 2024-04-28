import React, { useEffect, useRef, useState } from "react";

const ScrollFunction = (WrappedComponent) => {
    const limit = 5;
    const ScrollHOC = (props) => {
        const { list, updateLoading } = props;
        const [page, setPage] = useState(1);
        const refOfComponent = useRef(null);

        useEffect(() => {
            const handleScrollToEnd = () => {
                const lastItem = page * limit;
                const { scrollTop, scrollHeight, clientHeight } = refOfComponent.current;
                if (scrollTop + clientHeight >= scrollHeight && lastItem < list.length) {
                    updateLoading(true);
                    setTimeout(() => {
                        setPage(prevPage => prevPage + 1);
                        updateLoading(false);
                    }, 1000);
                }
            };

            refOfComponent.current.addEventListener('scroll', handleScrollToEnd);

            return () => {
                refOfComponent.current.removeEventListener('scroll', handleScrollToEnd);
            };
        }, [list, page, updateLoading]);

        return (
            <div ref={refOfComponent} style={{ overflowY: 'scroll', height: '200px' }}>
                <WrappedComponent 
                    {...props}
                    limit={limit}
                    page={page}
                    refOfComponent={refOfComponent} 
                />
            </div>
        );
    };

    return ScrollHOC;
};

export default ScrollFunction;
