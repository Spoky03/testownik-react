import { Link } from 'react-router-dom';
export const LandingPage = () => {
    return (
        <div className='flex h-16 w-16 p-10'>
            <Link to="/quiz" className="p-5 border-2">Start</Link>
            <Link to="/profile" className="p-5 border-2">Profile</Link>
        </div>
    )
}