import { SeacrhTop } from "@/src/components/Searchbar"
import {  useState } from "react"
//import { PageContext } from "../_app"
import { useRouter } from "next/router"
//import { Back } from "@/src/components/back"
import { FooterScreen } from "@/src/components/footer"
import { LogoTop } from "@/src/components/LogoTop"
import axios from "axios"

export const MainLayout= ({children}:any) =>{
  const router = useRouter()
  const[active, setActive] = useState(0)
  const[menus,setMenus] = useState([])
  const[hide, SetHide] = useState(true)
  //let isHomePage= useContext(PageContext)
  
  
  return(
    <>
      <LogoTop/>
      <SeacrhTop
        // active={active}
        // setActive={setActive}
        // menus={menus}
        // setMenus={setMenus}
        // hide={hide}
        // SetHide={SetHide}
      />
      
      {
        children
      }
      <FooterScreen/>
    </>
  )
}

export default MainLayout


// export async function getServerSideProps(){
//   const url= process.env.NEXT_PUBLIC_FOOD_URL+String("/categories");
//   const data_categories = (await axios.get(url)).data.categories
//   //console.log('loaded:',data_categories)
  
//   return {
//     props:{
//       categories:"Hello"
//     }
//   }
// }