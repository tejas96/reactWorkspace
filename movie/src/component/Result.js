import React, {Component} from 'react';
import Modal from './Modal';
import '../css/result.js.css';

class Result extends Component {
    constructor(props){
        super(props);
        this.state = {
            movieData : [],
            modal :{
                isModalOpen: false,
                renderData : null,
            },
        }
        this.handleMovieClick = this.handleMovieClick.bind(this);
        this.modalCloseClickHandler = this.modalCloseClickHandler.bind(this);
    }
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.searchData.length===0)
            return null;
       prevState.movieData = nextProps.searchData;
        return true;
    }

    modalCloseClickHandler(){
        this.setState({
            modal :{
                isModalOpen: false,
                renderData : null,
            },
        })
    }

    handleMovieClick(e){
        const _this = this.state;
        this.setState({
            modal:{
                isModalOpen: true,    
                renderData : _this.movieData[e.target.parentElement.dataset.key],
            }    
        })
       
    }

    render(){
        return(
            <div className="container p-5 mt-2">
                    <div className="row">
                        {
                            this.state.movieData.map((item,index)=>{
                                if(item.Poster !== "N/A"){
                                    return(
                                        <div className="col-3 mt-2 border-1 movie" onClick={this.handleMovieClick} data-key={index} key={index}>
                                            <img 
                                            src={item.Poster} 
                                            className="img-fluid img-height" 
                                            alt="movie"/>
                                            
                                            <div className="col-12 m-auto text-break text-left text-white movie-detail">
                                                <span>{item.Title}</span>
                                                <span>-{item.Year}</span>
                                            </div>
                                        </div>
                                    )
                                }
                                else    
                                    return null
                            })
                        }
                    </div>
                    <Modal isOpen={this.state.modal.isModalOpen} modalClose={this.modalCloseClickHandler}/>
            </div>
        );
    }
}

export default Result;