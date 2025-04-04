import { useState,useEffect } from 'react'
//import logo from '../assets/zipSy_eatry_svg_logo.svg'
import Search from './Search'
import { Link, useLocation,useNavigate } from 'react-router-dom'
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from '../hooks/useMobile';
import { BsCart4 } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import DisplayCartItem from './DisplayCartItem';

const Header = () => {
    const [ isMobile ] = useMobile()
    const location = useLocation()
    const isSearchPage = location.pathname === "/search"
    const navigate = useNavigate()
    const user = useSelector((state)=> state?.user)
    //const [openUserMenu,setOpenUserMenu] = useState(false)
    const cartItem = useSelector(state => state.cartItem.cart)
    const productData=useSelector(state=>state.product.products)
    const [totalPrice,setTotalPrice] = useState(0)
    const [totalQty,setTotalQty] = useState(0)
    
    const logo ="https://res.cloudinary.com/dcd5xkb4q/image/upload/v1740461709/zipSy_eatry_svg_logo_w44jol.svg"
    const [openCartSection,setOpenCartSection] = useState(false)
 
    const redirectToLoginPage = ()=>{
        navigate("/googleLogin")
    }

    const getProductbyProductId=(productId)=>{
        return productData.find(item=>item.id==productId)
    }

    const getTotalPrice = ()=>{
        return cartItem.reduce((totalPrice,curr)=>{
            totalPrice+(curr.productQuantity * (getProductbyProductId(curr.productId).price))
        },0)
    }
    const getTotalQuantity=()=>{
        return cartItem.reduce((totalQuantity,curr)=>{
            totalQuantity+curr.quantity
        },0)
    }

    /*const handleCloseUserMenu = ()=>{
        setOpenUserMenu(false)
    }*/
    const handleUserAccount=()=>{
        console.log("Account Button Clicked on Header !!!!!!!!!!!!!!!!!11")
    }

    const handleMobileUser = ()=>{
        if(!user._id){
            navigate("/login")
            return
        }

        navigate("/user")
    }

    //total item and total price
     useEffect(()=>{
         
         setTotalQty(getTotalQuantity())  
         setTotalPrice(getTotalPrice())
     },[cartItem])

  return (
    <header className='h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white'>
        {
            !(isSearchPage && isMobile) && (
                <div className='container mx-auto flex items-center px-2 justify-between'>
                                {/**logo */}
                                <div className='h-full'>
                                    <Link to={"/"} className='h-full flex justify-center items-center'>
                                        <img 
                                            src={logo}
                                            width={170}
                                            height={60}
                                            alt='logo'
                                            className='hidden lg:block'
                                        />
                                        <img 
                                            src={logo}
                                            width={120}
                                            height={60}
                                            alt='logo'
                                            className='lg:hidden'
                                        />
                                    </Link>
                                </div>

                                {/**Search */}
                                <div className='hidden lg:block'>
                                    <Search/>
                                </div>


                                {/**login and my cart */}
                                <div className=''>
                                    {/**user icons display in only mobile version**/}
                                    <button className='text-neutral-600 lg:hidden' onClick={handleMobileUser}>
                                        <FaRegCircleUser size={26}/>
                                    </button>

                                      {/**Desktop**/}
                                    <div className='hidden lg:flex  items-center gap-10'>
                                        {
                                            user?.id ? (
                                                <div className='relative'>
                                                    <div onClick={handleUserAccount} className='flex select-none items-center gap-1 cursor-pointer'>
                                                        <p>Account</p>                                                      
                                                       
                                                    </div>
                                                    
                                                    
                                                </div>
                                            ) : (
                                                <button onClick={redirectToLoginPage} className='text-lg px-2'>Login</button>
                                            )
                                        }
                                        <button onClick={()=>setOpenCartSection(true)} className='flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-2 rounded text-white'>
                                            {/**add to card icons */}
                                            <div className='animate-bounce'>
                                                <BsCart4 size={26}/>
                                            </div>
                                            <div className='font-semibold text-sm'>
                                                {
                                                    cartItem[0] ? (
                                                        <div>
                                                            <p>{totalQty} Items</p>
                                                            <p>{DisplayPriceInRupees(totalPrice)}</p>
                                                        </div>
                                                    ) : (
                                                        <p>My Cart</p>
                                                    )
                                                }
                                            </div>    
                                        </button>
                                    </div>
                                </div>
                </div>
            )
        }
        
        <div className='container mx-auto px-2 lg:hidden'>
            <Search/>
        </div>

        {
            openCartSection && (
                <DisplayCartItem close={()=>setOpenCartSection(false)}/>
            )
        }
    </header>
  )
}

export default Header