
import './App.css';
import NotificationComponent from './components/Notification';
import { useEffect, useState,useRef, useContext } from 'react';
import Spinner from './components/Spinner';

import { AppContext } from './context/AppContext.js';

function App() {
  const [message,setMessage]=useState('');
  const [socket,setSocket]=useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  // const audioFile = './mixkit-musical-reveal-961.wav'; 
  const {audios,audioSelected,setaudioSelected,messages,firstRender,setFirstRender}=useContext(AppContext)
  const audioElement = new Audio(audios[audioSelected]);
  
  
  useEffect(()=>{
    setSocket(new WebSocket('ws://127.0.0.1:8000/ws/notification/'));
  },[])
  function submitHandler(){
      
        socket.addEventListener("open", event => {
          socket.send("Connection established");
          
        });
          socket.addEventListener("message", event => {
            console.log("Message from server ", event.data);
            console.log(audioElement);
            new Audio(audios[audioSelected]).play()
            // console.log(audioElement);
            console.log(audioSelected);
          });
          setFirstRender(!firstRender)
      

   
      socket.send(message);
      // togglePlay()
      
      messages.push(message);
      setMessage('');
      
      

  }
  const togglePlay = () => {
    if (isPlaying) {
      audioElement.current.pause();
    } else {
      audioElement.current.play();
    }
    setIsPlaying(!isPlaying);
  };


  async function audioHandler(e){
    console.log(audioSelected);
    console.log(e.target.value);
    
    await new Audio(audios[e.target.value]).play();
    setaudioSelected(e.target.value);
  }

  
  return (
    <div className="App">
      <h1>Notification System</h1>
      <div className='input'>

      
      {
        (socket==='')?(<Spinner/>):(<div>
          <NotificationComponent/>
          <input type='text' 
          value={message}
          placeholder='Enter value here'
          onChange={(e)=>{
           
           setMessage(e.target.value)
    
          }}/>
          <button onClick={submitHandler}>submit</button>
          {/* <audio src={require('./mixkit-musical-reveal-961.wav')}  controls ></audio> */}
          </div>)
      }
      </div>
      <div id='messages'>
        {
          messages.map((singleMessage,index)=>{
            return(
              <div id="entered-messages" key={index}>
              {messages[messages.length-index-1]}

              </div>
            )
          })
        }
      </div>
      <div className='sounds-div'>
        <label htmlFor='sounds'>Select notification sound from below</label>
        
        <select id='sounds' onChange={audioHandler}>
          <option value="0">mixkit-correct-answer-tone-2870.wav</option>
          <option value="1">mixkit-elevator-tone-2863.wav</option>
          <option value="2">mixkit-magic-marimba-2820.wav</option>
          <option value="3">mixkit-musical-reveal-961.wav</option>
          <option value="4">mixkit-sci-fi-reject-notification-896.wav</option>
          

          
        </select>
      </div>

   
    </div>
  );
}

export default App;
