
export const Spinner = (props) => {
    const stylingClasses: string = props.className
    const color: string = props.color

    return (
        <div className={`flex justify-center items-center w-full h-full ${stylingClasses}`}>
            <div className={`border-4 border-t-transparent border-${color} rounded-full animate-spin`}></div>
        </div>
    );
};