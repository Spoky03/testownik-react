import { FaUser as UserIcon } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md"
import { useContext } from "react"
import { ThemeContext } from "../App"

const ThemeButton = ({setDarkMode} : {setDarkMode : React.Dispatch<React.SetStateAction<boolean | null>>}) => {
    const darkMode = useContext(ThemeContext)
    const toggleDarkMode = (e : React.MouseEvent) => {
        e.preventDefault()
        setDarkMode((prev : boolean | null) => {
            localStorage.setItem('darkMode', JSON.stringify(!prev))
            return !prev
        })

    }
    return (
        <div className="flex">
            <div role="button" onClick={toggleDarkMode} className='rounded-md p-1 m-1  place-self-center hover:animate-[spin_0.6s_ease-in-out]'>
                {darkMode ? <MdLightMode size={30} /> : <MdDarkMode size={30} />}
            </div>
        </div>
    )
}
const ProfileButton = () => {
    
    return (
        <div className="flex">
            <div role="button" className='rounded-md p-1 m-1 place-self-center'>
                <Link to="/profile">
                    <UserIcon size={25}/>
                </Link>
            </div>
        </div>
    )
}
export const Navbar = ({ setDarkMode}: { setDarkMode: React.Dispatch<React.SetStateAction<boolean | null>>}) => {
    return (
        <div className="flex justify-between absolute right-0 top-0 z-10 ">
            <ProfileButton />
            <ThemeButton setDarkMode={setDarkMode} />
        </div>
    )
}