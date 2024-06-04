interface ButtonProps {
    type: "button" | "submit" | "reset";
    onclick: () => void;
    label: string;
}
export const Button = (props : ButtonProps) => {
    return (
        <button type={props.type} onClick={props.onclick} className=" bg-w-secondary shadow-slate-400 dark:bg-secondary dark:border-white border-w-secondary border-2 rounded-md dark:shadow-slate-700/50 dark:shadow-xl dark:hover:shadow-slate-600/50 transition-all duration-300 hover:scale-95 drop-shadow-xl shadow-sm py-2 px-1 min-w-16 max-w-32 ">{props.label}</button>
    )
}