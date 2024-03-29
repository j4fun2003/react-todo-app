import React, { Component } from "react";

class Page extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {handlePageClick,totalPages,currentPage} = this.props;
        const pageButtons = [];
        for (let i = 1; i <= totalPages; i++) {
            pageButtons.push(
                <button
                    key={i}
                    className={i === currentPage ? "selected" : ""}
                    onClick={() => handlePageClick(i)}
                >
                    {i}
                </button>
            );
        }
        return (
            <div className="pagination">
               {pageButtons}
            </div>
        );
    }
}

export default Page;