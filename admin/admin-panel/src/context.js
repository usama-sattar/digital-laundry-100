import React,{Component} from 'react';
import axios from 'axios'

const ProductContext = React.createContext()
class ProductProvider extends Component{
    state={
        customers:[{}],
        vendors:[{}],
        riders:[{}],
        orders: [{}],
        ratings: [{}],
        sideBar: true,
        shops:[{}],
        searchCustomer:[],
        searchVendor:[],
        searchRider:[],
        searchShop:[],
    }
    componentDidMount(){
        this.getCustomers()
        this.getVendors()
        this.getRiders()
        this.getShops()
        this.getOrders()
        this.getRatings()
    }
    getVendors=()=>{
        axios.get("/vendors/total")
        .then((res) => this.setState({vendors:res.data}))
    }
    getCustomers=()=>{
        axios.get("/customers/total")
        .then((res) => this.setState({customers:res.data}))
    }
    getRiders=()=>{
        axios.get("/riders/total")
        .then((res) => this.setState({riders:res.data}))
    }
    getShops=()=>{
        axios.get("/shop/")
        .then((res) => this.setState({shops:res.data}))
    }
    getOrders=()=>{
        axios.get("/customers/orders")
        .then((res) => this.setState({orders:res.data}))
    }
    getRatings=()=>{
        axios.get("/app/allRatings")
        .then((res) => this.setState({ratings:res.data}))
    }
    delCustomer=(e)=>{
       console.log(e)
    }    
        
    showSideBar = () => {
        this.setState({
            sideBar: !(this.state.sideBar)
        })
      };
    searchItem = async (array, string, key) => {
        if(key === "customer") await this.setState({searchCustomer: []});
        if(key === "vendor") await this.setState({searchVendor: []});
        if(key === "rider") await this.setState({searchRider: []});
        if(key === "shop") await this.setState({searchShop: []});

        let temp = [];
        if (array.length >= 1 && string !== "") {
          array.filter((o) =>
            Object.keys(o).some((k) =>
              k === "name"
                ? o[k].includes(string)
                  ? temp = [...temp, o]
                  : null
                : null
            )
          );
        }
        if(key === "customer")await this.setState({searchCustomer: temp})
        if(key === "vendor") await this.setState({searchVendor: temp});
        if(key === "rider") await this.setState({searchRider: temp});
        if(key === "shop") await this.setState({searchShop: temp});
      };
    render(){
        return <ProductContext.Provider value={{
            getCustomers: this.getCustomers,
            getVendors: this.getVendors,
            getRiders: this.getRiders,
            showSideBar:this.showSideBar,
            getShops:this.getShops,
            sideBar: this.state.sideBar,
            customers: this.state.customers,
            vendors: this.state.vendors,
            riders: this.state.riders,
            shops: this.state.shops,
            orders:this.state.orders,
            ratings: this.state.ratings,
            searchItem: this.searchItem,
            searchCustomer: this.state.searchCustomer,
            searchRider: this.state.searchRider,
            searchVendor: this.state.searchVendor,
            searchShop: this.state.searchShop
            
        }}>
            
            {this.props.children}
        </ProductContext.Provider>
    }
}
const ProductConsumer = ProductContext.Consumer;
export { ProductConsumer, ProductProvider };
