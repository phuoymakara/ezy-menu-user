import { 
  useContext,
  useEffect, 
  useRef, 
  useState } from "react";
import  MenuCard  from "../components/menuCard";

import dynamic from "next/dynamic";
import { DismissalPriceContext } from "@/pages/_app";

type HomePageProps={
  menus ? :any|[]
  active ? : number
  setActive ? : (active: number) => void,
  lastElementRef? : HTMLDivElement|any
}

const DynamicLoading = dynamic(()=>import("@/src/components/menuCard"))

export const HomePageScreen = ({menus,active, setActive, lastElementRef}: HomePageProps) => {
  const[currentPage,setCurrentPage]= useState(1)
  const [loading, setLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const bottom = useRef(null);
  const delay = 10000; 
  const DismiasalPrice = useContext(DismissalPriceContext)


  const[data,setData]=useState( () => {
    return menus
  })
  useEffect(()=>{
    setData(menus)
  },[menus])
  // const handleDismiisalPrice = (e:any) =>{
  //   e.preventDefault()
  //   if(DismiasalPrice.dismissal_price>0){
  //     DismiasalPrice.setDismissal_price(0)
  //   }
  //   // else{
  //   //   DismiasalPrice.setDismissal_price(DismiasalPrice.dismissal_price)
  //   // }
  // }
  useEffect(()=>{
    const handleDismiisalPrice = () =>{
      //e.preventDefault()
      if(DismiasalPrice.dismissal_price>0){
        DismiasalPrice.setDismissal_price(0)
      }else{
        DismiasalPrice.setDismissal_price(DismiasalPrice.dismissal_price)
      }
      //console.log('Cliked...')
    }
    const bodyClickHandler = (event:any) => {
      // Check if the clicked element is not a descendant of the component
      if (!event.target.closest("#show_price_card")) {
        handleDismiisalPrice();
      }
    };

    document.body.addEventListener("click",bodyClickHandler)
    return document.body.addEventListener("click",bodyClickHandler)
  },[])

  return(
    <>
      {
        data?.length === 0? 
        <div className="d-flex justify-content-center" style={{margin:"50px 0px"}}>
          {/* <h3 className="text-center mt-4 text-primary">Menus Not Found</h3> */}
          <div>
          <img src="../EzyMenu-404.png" width={400} alt="data_not_found" />
          </div>
        </div> 
      :
      <>
        <div 
        //onClick={handleDismiisalPrice}
        className={data?.length===0 || data?.length<3?"container mt-3 p-0 h-100vh":"container mt-40 p-0"}>
          <div className="row mx-0"> {/* Responsive for add mx-0 & removed px-2 */}
            {
              data?.sort((a:any, b:any) => b.id - a.id)?.map((p:any, index:number) => {
                return(
                  <div className="col-md-3 mb-4 d-flex"   key={index+1} ref={index === data.length - 1 ? lastElementRef : null}>
                   <MenuCard
                      id={p.id}
                      code={p.code}
                      image={p.thumbnail}
                      title_kh={p.title_kh}
                      title_en={p.title_en}
                      price={p.price}
                      menu_price={p.Menu_Price}
                    /> 
                    
                  </div>
                )
              })
            }
          </div>
          
          {/* <BestSeller/> */}

          {/* <div className={arrOfPage?.length <=1 ?"d-none":"d-flex p-2"}>
            <button className="btn-next" onClick={()=>handlePageChange(currentPage>1?currentPage-1:1)}>Back</button>
            {
              arrOfPage.map((p:any,index:number)=>{
                return(
                  <button key={index} className={`mx-1 ${p===currentPage?'bg-pagination':''}`} onClick={()=>handlePageChange(p)}>{p}</button>
                )
              })
            }
            <button className="btn-next" onClick={()=>handlePageChange(currentPage>=1 && currentPage<pagination?currentPage+1:currentPage)}>Next</button>
          </div> */}

        </div>

          {/* {loading && (
          <div
            className={showLoading ? "loading" : ""}
            style={{ opacity: showLoading ? 1 : 0 }}
          >
            Loading...
          </div>
        )
        }
        <div ref={bottom} /> */}
      </>

   }

   
    </>
  )
}



/*
//import { MenuCard2 } from "../components/menuCard2";
//import { useQuery } from "react-query";
//import { AxiosClient } from "../libs/AxiosClient";
//import { type } from "os";
//import axios from "axios";
//import { GetStaticProps, GetServerSideProps } from "next";
//import  BestSeller  from "../components/bestSeller";
//import { CategoryContext } from "@/pages/_app";
//import { SeacrhTop } from "../components/Searchbar"
//import { FooterScreen } from "../components/footer";

  


export const getServerSideProps : GetServerSideProps = async (context:any) => {
  const {name} = context.query.name ?? ""
  console.log('Name=> ',name)

  const UrlBase = String(process.env.NEXT_PUBLIC_FOOD_URL+`/search/menus?name=${name}`)
  const baseURL2 = String(process.env.NEXT_PUBLIC_FOOD_URL+'/menus')
  let res,menus
  
  res = await (await axios.get(UrlBase)).data.menus
  menus = await (await axios.get(baseURL2)).data.menus
  
  console.log(menus)

  return{
    props:{
      res: name==='null' || name===''? 'menus' : 'res'
    }
  }

}

  */
