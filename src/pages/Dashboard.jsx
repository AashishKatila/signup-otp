import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Dashboard = () => {

    const navigate = useNavigate()

    const userName = localStorage.getItem("user_name")

    function handleLogout() {
        localStorage.removeItem("token")
        localStorage.removeItem("user_name")
        toast("Logout Success")
        navigate('/login')
    }

    return (
        <div className='h-screen flex flex-col items-center justify-center gap-4 md:gap-8'>
            <h2 className='text-3xl  '>Hello {userName}!</h2>
            <button className='bg-red-400 text-xl font-semibold text-white px-6 py-1 rounded-md' onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Dashboard