import spinner from "../assets/spinner.gif";

function Loading(){
    return (
        <div className="absolute top-0 left-0 z-30 w-full h-full flex flex-col justify-center items-center bg-white">
            <div className="text-xl text-center text-olive font-bold">
                Loading in progress<br />
                We&apos;re working on it
            </div>
            <img src={spinner} alt="loading gif file" className="w-36"/>
        </div>
    )
}

export default Loading;