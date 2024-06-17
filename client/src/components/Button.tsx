interface ButtonProps {
    type: "button" | "submit" | "reset";
    onClick?: () => void;
    label: React.ReactNode;
}

export const Button = (props: ButtonProps) => {
    return (
        <button type={props.type} onClick={props.onClick} className="bg-w-secondary shadow-slate-400 dark:bg-secondary dark:border-white border-w-secondary border-2 rounded-md dark:shadow-slate-700/50 dark:shadow-xl dark:hover:shadow-slate-600/50 transition-all duration-300 hover:scale-95 drop-shadow-xl shadow-sm w-full h-full">
            <div className="flex place-content-center">{props.label}</div>
        </button>
    );
};
