import constants from "../../constants";
import { FaCheck as CheckIcon } from "react-icons/fa6";
import { MdOutlineArrowBackIosNew as ArrowIcon } from "react-icons/md";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="dark:bg-primary bg-w-primary w-1/3 flex flex-col place-items-center p-5 gap-5 relative">
            <Link to="/"><h1 className="text-2xl text-center">{constants.APP_NAME}</h1></Link>
            <div className="flex flex-col justify-evenly h-full">
                <p>Udzielone odp</p>
                <p>Poprawne odp</p>
            </div>
            <button className="w-16 h-16 rounded-full bg-success absolute top-1/2 -left-8 shadow-sm hover:scale-95 transition-all">
                <CheckIcon className="text-white w-6 h-6 m-auto"/>
            </button>
        </div>
    );
}

export default Sidebar;