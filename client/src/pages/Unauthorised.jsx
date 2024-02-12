import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom';

export default function Unauthorised () {

    //---------//
    //- Hooks -//
    //---------//

    // Hook to useNavigate
    const navigate = useNavigate();


    //--------------------------------------//
    //- Event Listener - Page Load -//
    //--------------------------------------//

    // Counts down from 5 and redirects the user back to log in page
    useEffect( ()=> {

            
            let i = 5
            const countdown = setInterval(function () {

                if (i >=0) {
                    document.getElementById('countdown').textContent = `${i} seconds ...`
                    i--;
                } else {
                    document.getElementById('countdown').textContent = `Time is up!`

                    clearInterval(countdown)  // Stops the setInterval process 
                    navigate('/login')      
                }
            },1000)
        // });
    })


    return (
        <div>
            <div className = "text-center py-2"><img className = "m-auto py-2" width="100px" src="https://s3.getstickerpack.com/storage/uploads/sticker-pack/chiikawa/sticker_10.gif?aca172b7d546d3d9c51f3e57204f75f2"></img></div>
            <div className = "text-center py-2 text-3xl">We seem to have hit an error!</div>
            <div className = "text-center py-2 text-3xl"> Stand by to be redirected to the log in screen </div>
            <div id = "countdown" className = "text-center py-2 text-4xl">Redirecting in...</div>            
            <div className = "text-center py-2"><img className = "m-auto py-2" width="500px" src="./assets/images/unauthorised.jpg"></img></div>
        </div>
    )
}