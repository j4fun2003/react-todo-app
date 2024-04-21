import React from "react";


const ScrollFunction = (WrappedComponent) => {
    const limit = 5;
    class ScrollHOC extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                page: 1,
            }
            this.refOfComponent = React.createRef();
        }

        componentDidMount() {
            this.refOfComponent.current.addEventListener('scroll', this.handleScrollToEnd);
          }
        
          componentWillUnmount() {
            this.refOfComponent.current.removeEventListener('scroll', this.handleScrollToEnd);
          }
        
          handleScrollToEnd = () => {
            const { list , updateLoading} = this.props;
            const { page } = this.state;
            const lastItem = page * limit;
            const { scrollTop, scrollHeight, clientHeight } = this.refOfComponent.current;
            if (
              scrollTop + clientHeight >= scrollHeight &&
              lastItem < list.length
            ) {
                updateLoading(true);
                setTimeout(() => {
                this.setState(prevState => ({
                  page: prevState.page + 1,
                }),  () => {
                    updateLoading(false);
                  });  
              }, 1000);
            }
          }  
    
        render(){
            return (
                <div ref={this.refOfComponent} style={{ overflowY: 'scroll', height: '200px' }}>
                        <WrappedComponent 
                            {...this.props}
                            limit={limit}
                            page={this.state.page}
                            refOfComponent={this.refOfComponent} 
                           >
                        </WrappedComponent>
                </div>
            );
        }
    }
    return ScrollHOC;
}

export default ScrollFunction;
