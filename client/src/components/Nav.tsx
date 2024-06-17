import { FaUser as UserIcon } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md"
import { useContext } from "react"
import { ThemeContext } from "../App"
import constants from "@/constants";

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
            <div role="button" onClick={toggleDarkMode} className='rounded-md p-1 m-1  place-self-center  hover:text-success transition:colors duration-300 hover:animate-[spin_0.6s_ease-in-out]'>
                {darkMode ? <MdLightMode size={30} /> : <MdDarkMode size={30} />}
            </div>
        </div>
    )
}
const SingleLink = ({to, children} : {to : string, children : string}) => {
    return (
        <div role="button" className='rounded-md p-1 m-1 place-self-center hover:text-success transition:colors duration-300'>
            <Link to={to}>
                {children}
            </Link>
        </div>
    )
}
const NavLinks = () => {
    return (
        <div className="flex gap-5 mr-5">
            <SingleLink to='/profile'>Profile</SingleLink>
            <SingleLink to='/dashboard'>Dashboard</SingleLink>
            <SingleLink to='/browser'>Browser</SingleLink>
        </div>
    )
}
export const Navbar = ({ setDarkMode}: { setDarkMode: React.Dispatch<React.SetStateAction<boolean | null>>}) => {
    return (
        <div className="flex justify-center z-10 px-2 sm:px-10 mb-1 shadow-md fixed w-full bg-w-primary dark:bg-primary">
            <div className={`flex justify-between w-full ${constants.STYLES.MAX_WIDTH}`}>
                <Link to="/" className="place-self-center text-xl sm:text-2xl font-bold">Testownik</Link>
                <div className="flex">
                    <NavLinks />
                    <ThemeButton setDarkMode={setDarkMode} />
                </div>
            </div>
        </div>
    )
}