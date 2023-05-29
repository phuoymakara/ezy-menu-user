import Head from 'next/head'
//import Image from 'next/image'
import { Inter } from 'next/font/google'
//import { MenuCard } from '@/src/components/menuCard'
import { HomePageScreen } from '@/src/screen/HomePage'
//import { GetServerSideProps } from 'next'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { CategoryContext } from './_app'
import { useRouter } from 'next/router'
import { Spinner } from 'reactstrap'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  let temp: any | []

  const {name} = router.query

  let isCategory = useContext(CategoryContext)
  const[menus,setMenu] =useState()
  const[res,setRes]=useState()
  const[page,setPage]= useState(1)
  const[loading,setLoading]=useState(false)
  const[all,setAll]=useState(false)

  const baseURL2 = String(process.env.NEXT_PUBLIC_FOOD_URL+`/menus?page=${page}`)
  const UrlBase = String(process.env.NEXT_PUBLIC_FOOD_URL+`/search/menus?name=${name}`)
  
  async function DataFetching(per_page:number){
    setLoading(true)
      if( !name || name==="" || name?.length===0){
        const menu = await (await axios.get(`${process.env.NEXT_PUBLIC_FOOD_URL}/menus?page=${per_page}`)).data
        setMenu(menu.menus)
        setAll(menu?.all)
      }else{
        const saved = (await axios.get(UrlBase)).data
        setMenu(saved.menus)
        setAll(saved?.all)
      }
    setLoading(false)
  }

  useEffect(() =>{
    
    DataFetching(page)
    
  },[name,page])

  if(isCategory.category !==0 ){
    //@ts-ignore
    temp = menus?.filter((e:any,i:number)=>{
      return e?.category_Id === isCategory.category
    })
  }else{
   temp = menus
  }
  const loadMore = async () => {
    setLoading(true)
    setPage(page+1)
    await DataFetching(page)
  }

  return (
    <>
      <Head>
        <title>Ezy Menu</title>
        <meta name="description" content="Power by godital" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.jpg" />
      </Head>
        <HomePageScreen 
          menus={temp}
        />
      {
        loading ? (
          <div style={{display:"flex",justifyContent:"center",padding:"20px"}}>
            <Spinner/>
          </div>
        )
        :
        
          !all && (
            <div style={{padding:"10px",display:"flex",justifyContent:"center"}}>
            <button 
            onClick={loadMore}
            disabled={loading}
            style={{padding:"2px 5px",backgroundColor:"gray",color:"white",border:"none"}}>
              Load more...
            </button>
          </div>
          )
        
      }

      
    </>
  )
}



/*
///Top of Home Return 

  let isMenus
  if(isCategory.category===0){
    isMenus = res
  }else {
    isMenus = res?.filter((p:any) => p.category?.id === isCategory.category)
  }

  if(isMenus.length===0){
    isMenus = res?.filter((p:any) => p?.category_Id === isCategory.category)
  }
 



//// 
export async function getServerSideProps(context:any){
  const { name} = context.query
  const {asPath} = context
  let  res,menus

  const baseURL2 = String(process.env.NEXT_PUBLIC_FOOD_URL+'/menus')
  

  if(name){
      if(name==='null'){
        menus = await (await axios.get(baseURL2)).data.menus
      }else{
        const UrlBase = String(process.env.NEXT_PUBLIC_FOOD_URL+`/search/menus?name=${name==='null'?'':name}`)
        res = await (await axios.get(UrlBase)).data.menus
      }
  }else if(asPath === '/' || !name ){
    menus = await (await axios.get(baseURL2)).data.menus
  }

  return{
    props:{
      res: menus ? menus : res
    }
  }
}



Home.getInitialProps = async (context:any) => {
  //const router = useRouter()
  const {name} = context.query 
  const {asPath} = context
  let  res,menus

  const baseURL2 = String(process.env.NEXT_PUBLIC_FOOD_URL+'/menus')
  

  if(name){
      if(name==='null'){
        menus = await (await axios.get(baseURL2)).data.menus
      }else{
        const UrlBase = String(process.env.NEXT_PUBLIC_FOOD_URL+`/search/menus?name=${name==='null'?'':name}`)
        res = await (await axios.get(UrlBase)).data.menus
      }
  }else if(asPath === '/' || !name ){
    menus = await (await axios.get(baseURL2)).data.menus
  }

  return{
    // props:{
    //   res: menus? menus : res
    // }
    res: menus? menus : res
  }

}


*/