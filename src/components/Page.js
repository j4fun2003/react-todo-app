/*import React, { Component } from "react";

class Page extends Component {
    constructor(props) {
        super(props);
        this.buttonRef = React.createRef();
    }


    render() {
        const { handlePageClick, totalPages, currentPage } = this.props;
        return (
            <div className="pagination">
                {Array.from({ length: totalPages }, (_,index) => (
                    <button
                        ref={this.buttonRef}
                        key={index + 1}
                        className={index + 1 === currentPage ? "selected" : ""}
                        onClick={() => handlePageClick(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}

            </div>
        );
    }
}
export default Page;*/