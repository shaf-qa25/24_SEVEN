import { createContext, useEffect, useRef, useState } from "react";
import {io} from 'socket.io-client'
const SocketContext = createContext();
import Peer from "simple-peer"

const socket = io("http://localhost:5000", {
    transports: ['websocket'],
    upgrade: false
});

const ContextProvider = ({children})=>{
    const [stream,setStream]= useState(null);
    const [me,setMe] = useState('');
    const [call,setCall]= useState({});
    const [callAccepted,setAcceptedCall]=useState(false);
    const [callEnded,setEndedCall]=useState(false);
    const [name,setName]= useState('');

    const myVideo = useRef();
    const userVideo = useRef(); 
    const connectionRef =useRef();

    useEffect(()=>{
        socket.on('connect', () => {
            console.log("Mera Socket Server se jud gaya! ID:", socket.id);
        });

        socket.on('connect_error', (err) => {
            console.log("❌ Socket Connection Error:", err.message);
        });
        
        navigator.mediaDevices.getUserMedia({video:true,audio:true})
        .then((currentStream)=>{
            setStream(currentStream);

            if (myVideo.current) {
                myVideo.current.srcObject = currentStream;
            }


            setTimeout(() => {
                if (myVideo.current && !myVideo.current.srcObject) {
                    myVideo.current.srcObject = currentStream;
                }
            }, 500);
        });
        socket.on('me', (id) => {
        console.log("Socket ne 'me' event bheja, ID mili:", id);
        setMe(id);
    });
        socket.on('calluser',({from,name:callerName,signal})=>{
            setCall({isReceivedCall:true,from,name:callerName,signal})
        })
        return () => {
            socket.off('connect');
            socket.off('me');
            socket.off('calluser');
        };
        
    },[])
    const answerCall = ()=>{
        setAcceptedCall(true);
        const peer = new Peer ({initiator:false,trickle:false,stream});

        peer.on('signal',(data)=>{
            socket.emit('answercall',{signal:data,to:call.from});
        })
        peer.on('stream',(currentStream)=>{
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);
        connectionRef.current = peer;
    }

    const callUser = (id)=>{
        const peer = new Peer ({initiator:true,trickle:false,stream});
        peer.on('signal',(data)=>{
            socket.emit('calluser',{userToCall:id,signalData:data,from:me,name});
        })
        peer.on('stream',(currentStream)=>{
            userVideo.current.srcObject = currentStream;
        })

        socket.on('callaccepted', (signal) => {
            setAcceptedCall(true);
            peer.signal(signal);
        });
        connectionRef.current = peer;

    }

    const leaveCall = ()=>{
        setEndedCall(true);
        if (connectionRef.current) {
            connectionRef.current.destroy();
        }
        window.location.reload();
    }
    console.log("Current Stream:", stream);
    return (
        <SocketContext.Provider value={{
          call,
          callAccepted,
          myVideo,
          userVideo,
          stream,
          name,
          setName,
          callEnded,
          me,
          callUser,
          leaveCall,
          answerCall,
        }}
        >
          {children}
        </SocketContext.Provider>
      );

}


export { ContextProvider, SocketContext };