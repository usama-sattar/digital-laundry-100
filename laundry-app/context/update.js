import React, { useState, useEffect,createContext } from "react";

export const updateContext = createContext()
    
function ShopContextProvider({children}){
    const [price,setPrice] = useState(10)
    const [shop, setShop] = useState({});
    const [services, setServices] = useState([]);
    
    const updatePrice = async(p, data) => {
        await setPrice(p)
        let temp = [...services]
        let index = temp.findIndex(x => x.title === data.title)
        if (index !== -1) {
          temp.price = price;
          setServices(temp);
        }
      };
    const removeService = (data) => {
        let temp = [...services]
        let index = temp.findIndex(x => x.title === data.title)
        if (index !== -1) {
          temp.splice(index, 1);
          setServices(temp);
        }
      };
    const saveService = (data) => {
        const service = {
          title: data.title,
          price: data.price,
        };
        setServices([...services, service])
      };
    
    return(
        <updateContext.Provider value={{shop, services, updatePrice, setShop, setServices, setPrice, saveService, removeService}}>
            {children}
        </updateContext.Provider>
    )
}
export default ShopContextProvider