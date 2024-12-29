import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Dashboard = () => {

    const [userData, setUserData] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");
                const uuid = localStorage.getItem("uuid");
                if (!accessToken) {
                    console.log("Access token not found");
                    return;
                }

                const response = await fetch(`https://staging.tishyandco.com.au/v1/users/${uuid}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Fetched data:", data);
                    setUserData(data.data)
                } else {
                    console.log("Failed to fetch data:", response.status);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    function handleLogin() {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("uuid")
        toast("Logout Success")
        navigate('/login')
    }

    return (
        <div className='h-screen flex flex-col items-center justify-center gap-4 md:gap-8'>
            <h2 className='text-3xl  '>Hello {userData?.full_name}!</h2>
            <button className='bg-red-400 text-xl font-semibold text-white px-6 py-1 rounded-md' onClick={handleLogin}>Logout</button>
        </div>
    )
}

export default Dashboard