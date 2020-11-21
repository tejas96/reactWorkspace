import React,{Component, Fragment} from 'react';
import Header from './header';
import SideNav from './sideNav';
import BankBody from './body';
import '../css/comman.css';
import Loader from './loading';


class BankDetailsContainer extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Fragment>
                <Loader/>                
                <div className="d-inline-block col-12 col-lg-2 col-md-2 col-xl-2 p-0">
                    <SideNav/>
                </div>
                <div className="d-inline-block container2 col-12 col-lg-10 col-xl-10 col-md-10 p-0">
                    <Header/>
                    <BankBody/>
                </div>
                
            </Fragment>
        );
    }
}

export default BankDetailsContainer;