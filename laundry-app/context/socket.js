import React, { useState, useEffect,createContext, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
window.navigator.userAgent = 'react-native';
import io from "socket.io-client/dist/socket.io";
import { API } from "../global/constants";

export const socketContext = createContext()

function SocketContextProvider({children}){
    const [user,setUser] = useState('')
    const [socket, setSocket] = useState(null)
    useEffect(()=>{
        getData();
    },[])
    const getData = async () => {
        const customer = await AsyncStorage.getItem("customerId");
        if (customer) {
          const customerId = await JSON.parse(customer);
          setUser(customerId);
          connectSocket(customerId)
        }
      };
      const connectSocket = async (id)=>{
          const newSocket =  await io(`${API}`, { query: {id: id}, jsonp: false });
          const s = await newSocket
          await setSocket(s)
      }
    return(
        <socketContext.Provider value={{socket}}>
            {children}
        </socketContext.Provider>
    )
}
export default SocketContextProvider