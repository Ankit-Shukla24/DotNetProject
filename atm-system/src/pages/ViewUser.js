import React,{useState,useContext,useEffect} from 'react';
import axios from 'axios';
import Card from '../components/Card/Card';
import "../styles/ViewUser.css";
import EditCustomerPage from './EditCustomerPage';
import EditAccountPage from './EditAccountPage';
import {useParams} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ViewUser = () => {
    const {id} = useParams();
    const [tab,setTab] = useState(0);
    const [loading,setLoading] = useState(true);
    const [customer,setCustomer] = useState({
        customerId: id,
        firstName: '',
        lastName: '',
        address: '',
        emailId: '',
        phoneNumber: '',
        dateOfbirth: '',
        emailId: '',
    });
    const [enabled,setEnabled] = useState(0);
    const [user,setUser] = useContext(AuthContext);
    const [account, setAccount] = useState(null);
    const [accountId,setAccountId] = useState(null);
    const headers = {
        "Authorization": `Bearer ${user.token}`
    }
    useEffect(()=>{
        axios.get(`https://localhost:7182/api/Customers/${id}`,{headers:headers})
        .then((response)=>{
            const cust = response.data
            setCustomer({customerId:parseInt(id),firstName: cust.firstName, lastName: cust.lastName, address: cust.address, emailId: cust.emailId, phoneNumber: cust.phoneNumber, dateOfbirth: cust.dateOfbirth})
            setEnabled(cust.credentials[0].isEnabled);
            const account = cust.accounts[0] ;
            setAccountId(account?.accountId);
            setAccount(cust.accounts.length === 0 ? null:{customerId: parseInt(id), cardNo:account?.cardNo,accountType:account?.accountType,city:account?.city, balance:account?.balance})
        })
        .then(()=>setLoading(false))
        .catch((error)=>{
          alert(error)
        })
      },[])
    return loading? (<>Loading...</>) : (
        <Card>
            <div className='tabs-wrapper'>
                <span onClick={()=>setTab(0)} className={`tabs ${tab===0?"active":""}`}>User Details</span>
                <span onClick={()=>setTab(1)} className={`tabs ${tab===1?"active":""}`}>Account Details</span>
            </div>
            {tab == 0? (<EditCustomerPage cust={customer} enabled={enabled} id={id}/>):(<EditAccountPage acc={account} id={accountId} customerId={id}/>)}
        </Card>
    )
}

export default ViewUser