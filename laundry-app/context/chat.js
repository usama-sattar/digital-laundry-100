import React, { useState, useEffect,createContext, useContext, useCallback, } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { socketContext } from "./socket";

export const chatContext = createContext()

function ChatContextProvider({children}){
    const [user, setUser] = useState("")
    const [vendor, setVendor] = useState("")
    useEffect(()=>{
        getData();
    },[])

    const getData = async () => {
        const customer = await AsyncStorage.getItem("customerId");
        if (customer) {
          const customerId = await JSON.parse(customer);
          setUser(customerId);
        }
        const vendor = await AsyncStorage.getItem("vendorId");
        if (vendor) {
          const vendorId = await JSON.parse(vendor);
          setVendor(vendorId);
        }
      };
    
    return(
        <chatContext.Provider value={{user, vendor}}>
            {children}
        </chatContext.Provider>
    )
}
export default ChatContextProvider