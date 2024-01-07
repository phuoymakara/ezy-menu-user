//import Select from "react-select";
//import { Button, FormGroup } from "reactstrap";
import { useContext, useState } from "react";
import {AiOutlineCaretDown} from 'react-icons/ai'
import Image from "next/image";
import { DismissalPriceContext } from "@/pages/_app";


type MenuCardProps = {
  id ? : number | any
  image?: string;
  code?: string;
  title_kh?: string;
  title_en?: string;
  title_ch?: string;
  price?: number | any;
  menu_price?: any;
};


export const MenuCard = ({
  menu_price,
  price,
  image,
  code,
  title_ch,
  title_en,
  title_kh,
  id
}: MenuCardProps) => {
  const[showprice,setshowPrice] = useState(0)
  const sumprice = price ? parseFloat(price).toFixed(2) : price;
  const [selectPrice, setSelectprice] = useState(menu_price);

  const show_price = useContext(DismissalPriceContext)
  
  

  const onSelect = (event: any, priceTag:any) => {
    //setSelectprice(event.target.value);
    console.log(priceTag)
  };
  let ops
  if(menu_price){
    ops = menu_price.map((item:any) => ({
      value: item.id,
      label: `${item.size} - $${parseFloat(item.price).toFixed(2)}`,
    }));
  }
  
  const handleShowPrice = (e:any,id:number) =>{
    e.preventDefault()
    if(show_price.dismissal_price===id){
      show_price.setDismissal_price(0)
    }else{
      show_price.setDismissal_price(id)
    }
  }
  //console.log('Show Price',show_price.dismissal_price)
  return (
    <>
      <div 
       
      className="card card-custom rounded-3 px-0 shadow-sm" >
        {/* <div className="px-3 object-fit-cover py-1"> </div> */}
        {
          image? 
          <Image
            src={image}
            className="card-img-top img-card"
            width={300}
            height={210}
            style={{objectFit:"cover"}}
            alt="My Image"
            loading="lazy"
            placeholder="empty"
            blurDataURL="https://ezymenu-dashboard.vercel.app/img_loading.jpeg"
          />
        //   <img
        //   src={image}
        //   className="card-img-top img-card object-fit-cover"
        //   height={210}
        //   alt="My Image"
        // />
        : <img
        src='../img_loading.jpeg'
        className="card-img-top img-card object-fit-cover"
        height={200}
        alt="My Image"
      />
        }
        <div className="card-body px-2 pb-0 mb-0 mt-0">
          <div className="d-flex justify-content-between px-0 m-0 btn-main"> {/* removed px-1 to --> px-0 */}
            <button className="btn-menu">{code}</button>
            {menu_price && menu_price?.length > 0 ?
            <>
              <button 
              id="show_price_card"
              className="btn-menu" onClick={(e:any)=>handleShowPrice(e,menu_price[0].id)}>
                ${parseFloat(menu_price[0].price).toFixed(2)}
                
              <AiOutlineCaretDown color="#fff" cursor={'pointer'} style={{marginLeft:"0.3rem"}} /> {/* Add style margin to for same size => 0.5 => 0.3  */}
              </button>
              <div className={Number(menu_price[0].id)===show_price.dismissal_price?"price-pop":"d-none"}> 
                {
                  menu_price.map((x:any,index:number)=>{
                    return(
                      <span className="d-flex float-left m-0 p-0" key={index} > {x.size} - ${parseFloat(x.price).toFixed(2)}</span>
                    )
                  })
                }
              </div>
            </>
           : 
            <button className="btn-menu">${sumprice}</button>
            }
          </div>
          <div className="mt-3 mb-0 py-0">
            <h5 className="text-kh">{title_kh}</h5>
            <h5 className="text-en">{title_en}</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuCard

