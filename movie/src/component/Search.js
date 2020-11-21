import React, {Component} from 'react';
import Result from './Result'

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchData:[],
        }
        this.url = 'http://www.omdbapi.com/?apikey=10da10cb&s=';
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.searchRef = React.createRef();
    }
    
    handleSearchClick(e) {
        let searchValue = e.target.value;
        if(e.key === 'Enter'){
            let url = this.url + searchValue;
            fetch(url)
            .then(responce =>{
                return responce.json();
            })
            .then(data=>{
                console.log(data.Search);
                this.setState({
                    searchData: data.Search,
                });
            })
            .catch(err=>{
                console.error(err);
            }) 
        }
    }
   
    componentDidMount(){
       this.searchRef.current.focus();
    }
    render(){
        return(
            <div className="text-center container mt-5">
                <input 
                    type="search" 
                    placeholder="Search movie here" 
                    className="w-75 m-auto rounded border-0 p-2"
                    onKeyUp = {this.handleSearchClick}
                    ref = {this.searchRef}
                />
                <Result searchData = {this.state.searchData}/>
            </div>
        );
    }
}

export default Search;
