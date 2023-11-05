
import './App.css';
import NotificationComponent from './components/Notification';
import { useEffect, useState,useRef, useContext } from 'react';
import Spinner from './components/Spinner';

import { AppContext } from './context/AppContext.js';

function App() {
  const [message,setMessage]=useState('');
  const [num1,setNum1]=useState(0);
  const [num2,setNum2]=useState(0);

  const [socket,setSocket]=useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  // const audioFile = './mixkit-musical-reveal-961.wav'; 
  const {audios,audioSelected,setaudioSelected,messages,firstRender,setFirstRender,setMessages}=useContext(AppContext)
  const audioElement = new Audio(audios[audioSelected]);
  
  console.log(messages);
  useEffect(()=>{
    setSocket(new WebSocket('ws://127.0.0.1:8000/ws/notification/'));
  },[])
 
  function submitHandler(){
      
        // socket.addEventListener("open", event => {
        //   socket.send("Connection established");
          
        // });
          
          setFirstRender(!firstRender)
      

   
      socket.send(JSON.stringify({"num1":num1,"num2":num2}));
      socket.addEventListener("message", event => {
        console.log("Message from server ", event.data,num1,num2);
        const output=event.data
        console.log(JSON.parse(output)["result"]);
        const newMessage=`${num1} * ${num2} = ${JSON.parse(output)["result"]}`
        setMessages((prev)=>[newMessage])
        
        console.log(audioElement);
        new Audio(audios[audioSelected]).play()
        // console.log(audioElement);
        console.log(audioSelected);
      });
      // togglePlay()
      
      
      setNum1(0);
      setNum2(0);
     
      
      

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
          <div className='table'>

          
          <input type='number' 
          value={num1}
          placeholder='Enter value here'
          onChange={(e)=>{
           
           setNum1(e.target.value)
    
          }}/>
          <div className='symbol'>X</div>
          <input type='number' 
          value={num2}
          placeholder='Enter value here'
          onChange={(e)=>{
           
           setNum2(e.target.value)
    
          }}/>
          
          <button onClick={submitHandler}>submit</button>
          </div>
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
