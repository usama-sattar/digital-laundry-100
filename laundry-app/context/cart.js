import React, { useState, useEffect,createContext } from "react";

export const cartContext = createContext()

function CartContextProvider({children}){
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)
    const [order, setOrder] = useState(true)

    const setOrderState=()=>{
        setOrder(!order)
    }
    const addToCart = async(name , price) => {
        const cartData = await{
            name,
            price,
            quantity: 1
        }
        await setCart([...cart, cartData] )
        await getTotal()
    }
    const increment= async(product,index)=>{
        const temp = await [...cart]
        const item = await temp[index]
        item.quantity = await item.quantity + 1 
        await setCart(temp)
        await getTotal()

    }
    const decrement=async(product,index)=>{
        const temp = await [...cart]
        const item = await temp[index]
        if(item.quantity > 0){
            item.quantity = item.quantity - 1 
        }
        await setCart(temp)
        await getTotal()
    }
    const getTotal =async()=>{
        let t = 0
        cart.map((item)=> t = t + (item.price * item.quantity) )
        await setTotal(t)
    }
    const remove=async(index)=>{
        const temp = await [...cart]
        await temp.splice(index, 1)
        await setCart(temp)
        await getTotal()
    }
    return(
        <cartContext.Provider value={{cart,setCart,addToCart,increment,decrement,total,remove, setTotal, setOrderState, order}}>
            {children}
        </cartContext.Provider>
    )
}
export default CartContextProvider