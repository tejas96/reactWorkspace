import React,{Component} from 'react';
import '../css/body.css';
import supportData from '../supportData/data.json';


let prevVal;
let nextVal;
class BankBody extends Component{
    constructor(props){
        super(props);
        this.state={
            banksDetails:[],
            perPage : 0,
            bankDetailsFilter:[],
            from:0,
            to:0
        }
        this.onSelectSpecificRange = this.onSelectSpecificRange.bind(this);
        this.onSelectArrowNextButton = this.onSelectArrowNextButton.bind(this);
        this.onSelectArrowPrevButton = this.onSelectArrowPrevButton.bind(this);
        this.onSearchEnter = this.onSearchEnter.bind(this);
        this.onSelectCity = this.onSelectCity.bind(this);
    }
    
    onSelectCity(event){
        if(event.target.value === 'Select City'){
            document.querySelector('.pagination').style.visibility = 'hidden';
        }
        else if(document.getElementById('selectCategory').disabled){
            document.querySelector('.pagination').style.visibility = 'visible';
            this.callApi(event.target.value.toUpperCase());
        }
    }

    onSearchEnter(event){
        if(event.key === 'Enter'){
           
        }
    }

    onSelectSpecificRange(event){
        let perPage = +event.target.value;
        let from = 1;
        if(perPage===0)
            from=0;
        let bankDetailsFilter; this.getDataFromRange(perPage);
        if(this.state.from != 0 && perPage != 0){
            from =  this.state.from
            let to = this.state.to;
            if(perPage >= to-from)
                to+=(perPage-(to-from))-1;
            else    
                to-=((to-from)-perPage)+1;
            bankDetailsFilter = this.getDataFromRange(to, from);
            this.setState({
                bankDetailsFilter,
                to,
                from,
                perPage
            });
        }else{
            bankDetailsFilter = this.getDataFromRange(perPage);
            this.setState({
                perPage,
                bankDetailsFilter,
                from,
                to:perPage,
            })
        }
        
    }

    onSelectArrowNextButton(event){
        event.target.previousSibling.disabled = false;
        let from, to;
        let bankDetailsFilter;
        from = this.state.to+1;
        if(this.state.to+this.state.perPage > this.state.banksDetails.length){
            to = this.state.banksDetails.length;
            event.target.disabled = true;
            bankDetailsFilter = this.getDataFromRange(to, from);
            this.setState({
                bankDetailsFilter,
                from,
                to,
            });
        }else{
            to=this.state.to+this.state.perPage;
            bankDetailsFilter = this.getDataFromRange(to, from);
            this.setState({
                bankDetailsFilter,
                from,
                to,
            });
        }
       
    }

    onSelectArrowPrevButton(event){
        event.target.nextSibling.disabled = false;
        let from, to;
        let bankDetailsFilter;
        to = this.state.from-1;
        if(this.state.from-this.state.perPage <= 1){
            event.target.disabled = true;
            from=0;
            bankDetailsFilter = this.getDataFromRange(to, from);
            this.setState({
                bankDetailsFilter,
                from,
                to,
            });
        }else{
            from = this.state.from-this.state.perPage;
            bankDetailsFilter = this.getDataFromRange(to, from);
            this.setState({
                bankDetailsFilter,
                from,
                to,
            });
        }
    }

    componentDidMount(){
        document.querySelector('.pagination').style.visibility = 'hidden';
        let searchBox = document.getElementById('searchBox');
        if(document.getElementById('selectCategory').disabled){
            searchBox.disabled = true;
            searchBox.style.background = 'none';
        }else{
            searchBox.disabled = false;
        }
        this.callApi();
    }

    callApi(cityName){
        console.log('fetching start');
        let loader = document.querySelector('.loaderContainer');
        loader.style.display = 'block';
        fetch(`https://vast-shore-74260.herokuapp.com/banks?city=${cityName}`)
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                banksDetails: res,
            });
            loader.style.display = 'none';
        }).catch(err=>{
            console.log(err);
        });
    }

    getDataFromRange(to, from=0){
        let bankDetailsFilter = [];
        for(let i =from; i<to; i++){
            bankDetailsFilter.push(this.state.banksDetails[i]);
        }
        return bankDetailsFilter;
    }

    render(){
        return(
            <div className="col-12 mt-2 p-0">
                <div className="border m-auto p-3 col-11 dataContainer">
                    
                    {/* bank filter toolKit part */}
                    <div className="header">
                        <span className="display-5 font-weight-bold">Banks</span>
                        <div className="headerToolKit float-right">
                            <div className="d-inline-block filter1">
                                <select className="filterSelect" onChange={this.onSelectCity}>
                                    <option defaultValue>Select City</option>
                                    {
                                        supportData.bodyPage.heading.selectOpt1.map((item,index)=>{
                                        return <option key={index}>{item}</option>
                                        })
                                    }
                                </select>
                             </div>
                            <div className="d-inline-block filter1">
                                <select className="filterSelect" disabled id="selectCategory">
                                    <option defaultValue>Select Category</option>
                                    {
                                        supportData.bodyPage.heading.selectOpt2.map((item,index)=>{
                                            
                                            return <option key={index}>{item}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="d-inline-block filter2">
                                <input type="search" placeholder="&#x1F50D;" onKeyDown={this.onSearchEnter} className="filterInput" id="searchBox"/>
                            </div>
                        </div>
                    </div>

                    {/* bank details display part */}
                    <div className="bankBody mt-3">
                        <table className="table table-no-border table-hover">
                            <thead>
                                <tr>
                                <th scope="col">Bank</th>
                                <th scope="col">IFSC</th>
                                <th scope="col">Branch</th>
                                <th scope="col">Bank_Id</th>
                                <th scope="col">Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.bankDetailsFilter.map((item, index)=>{
                                            return(
                                                <tr key={index}>
                                                    <td><i className="fa fa-star goldenStar" aria-hidden="true"></i><span className="m-3">{item.bank_name}</span></td>
                                                    <td>{item.ifsc}</td>
                                                    <td>{item.branch}</td>
                                                    <td>{item.bank_id}</td>
                                                    <td className="text-break">{item.address}</td>
                                                </tr>
                                            )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    
                    {/* pagiganation footer */}
                    <div className="pagination">
                        <div className="paginationFilter">
                                <span>row per page</span>
                                <select className="rowFilter" onChange={this.onSelectSpecificRange}>
                                    {
                                        supportData.bodyPage.footer.rowPerPage.map((item,index)=>{
                                            return <option key={index}>{item}</option>
                                        })
                                        
                                    }
                                </select>
                        </div>
                        <div className="paginationRangeControl">
                                <span className="pageRange" ><span id="range">{`${this.state.from}-${this.state.to}`}</span> of {this.state.banksDetails.length}</span>
                            <button className="arrowButton" onClick={this.onSelectArrowPrevButton} > &lt; </button>
                            <button className="arrowButton" onClick={this.onSelectArrowNextButton}> &gt; </button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default BankBody;
