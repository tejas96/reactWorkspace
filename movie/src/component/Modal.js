import React,{Component} from 'react';
import '../css/modal.js.css';

class Modal extends Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        prevState.isOpen = nextProps.isOpen;
        return true;
    }

    componentWillUnmount(){
        alert('aaa');
    }
    render(){
        return(
            <>
                {
                     this.state.isOpen ?<div className="movie-modal">
                         <span 
                         className="float-right text-white display-4 mr-2 modal-close"
                         onClick={this.props.modalClose}
                         >X</span>
                     </div> : null
                }
            </>
        )
    }
}

export default Modal;