import React from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
const Main =() => {
    return(
        <div className='main'>
            <div className='nav'>
                <p>NexGen</p>
                <img src={assets.user_icon} alt='' />
            </div>
            <div className='main-container'>
                <div className='greet'>
                    <p><span>Hello, Developers</span></p>
                    <p>How can i help you today?</p>
                </div>
                <div className='cards'>
                    <div className='card'>
                        <p>Suggest beautiful places to see in upcoming road trip</p>
                        <img src={assets.compass_icon} alt='' />
                    </div>
                    <div className='card'>
                        <p>Briefly summarize the concept: urban planning</p>
                        <img src={assets.bulb_icon} alt='' />
                    </div>
                    <div className='card'>
                        <p>Brainstorm team bonding activities for our work retreat</p>
                        <img src={assets.message_icon} alt='' />
                    </div>
                    <div className='card'>
                        <p>Improve readabilty of following code</p>
                        <img src={assets.code_icon} alt='' />
                    </div>
                </div>
            <div className="mainbottom">
                <div className="search-box">
                    <input type="text" placeholder='Enter a prompt here'/>
               <div>
                <img src={assets.gallery_icon} alt="" />
                <img src={assets.mic_icon} alt="" />
                <img src={assets.send_icon} alt="" />
                </div>
                </div>
                <p className='bottom-info'>
                    NexGen may display inaccurate info, including about people, so double check its responses. Your privacy and NexGen Apps.
                </p>
            </div>
            </div>
     
        </div>
    )
}
export default Main