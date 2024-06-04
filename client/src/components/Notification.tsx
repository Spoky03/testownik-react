interface NotificationProps {
    text: string,
    type: string
}
export const Notification = ({props} : {props : NotificationProps}) =>{

    return(
        <div className={"p-2 rounded-md m-2  " + (props.type === 'error' ? 'bg-error': 'bg-w-primary dark:bg-primary' ) }>
            {props.text}
        </div>
    )
}