import React from 'react'
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();
    const handleRedirectToModalPage = ()=>{
        navigate('/modal');
    }
    return (
        <div className="container-2">
        <div className="jumbotron">
            <div className="container-2">
                <div className="main">
                    <h1>We are Hiring</h1>
                    <a href="#" className="btn-main" onClick={handleRedirectToModalPage}>Add Employee</a>
                </div>
            </div>
        </div>
        </div>
    )
}

export default HomePage
