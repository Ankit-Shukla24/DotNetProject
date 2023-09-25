import React,{useState} from 'react';
import Card from '../components/Card/Card';
import "../styles/ViewUser.css";
import EditCustomerPage from './EditCustomerPage';
import EditAccountPage from './EditAccountPage';

const ViewUser = () => {
    const [tab,setTab] = useState(1)
    return (
        <Card>
            <div className='tabs-wrapper'>
                <span onClick={()=>setTab(0)} className='tabs'>User details</span>
                <span onClick={()=>setTab(1)} className='tabs'>Account details</span>
            </div>
            {tab == 0? (<EditCustomerPage/>):(<EditAccountPage/>)}
        </Card>
    )
}

export default ViewUser