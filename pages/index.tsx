import Head from 'next/head'
import { Inter } from 'next/font/google'
import { HomePageScreen } from '@/src/screen/HomePage'
import {AxiosClient} from '@/src/libs/AxiosClient'
import { 
  useCallback, 
  useContext, 
  useEffect, 
  useRef, 
  useState } from 'react'
import { CategoryContext,SubcategoryContext } from './_app'
import { useRouter } from 'next/router'
import { Spinner } from 'reactstrap'
import { useInfiniteQuery } from 'react-query'
import useIntersectionObserver from '@/src/components/useInterSection'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  let temp: any | []

  const {name} = router.query

  let isCategory = useContext(CategoryContext)
  let subcategoryContext = useContext(SubcategoryContext)
  const[menus,setMenu] =useState<any|any[]>([])
  const[res,setRes]=useState()
  const[page,setPage]= useState(1)
  const[loading,setLoading]=useState(false)
  const[all,setAll]=useState(false)
  const [isScrolledToLoad, setIsScrolledToLoad] = useState(false);
  const Ref = useRef<HTMLDivElement|any>(null);
  const max_page = Math.floor(menus?.length/8)
  const baseURL2 = String(process.env.NEXT_PUBLIC_FOOD_URL+`/menus?page=${page}`)
  const UrlBase = String(process.env.NEXT_PUBLIC_FOOD_URL+`/search/menus?name=${name}`)
  

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
   } = useInfiniteQuery('menuspage', 
   ({pageParam}:any)=>DataFetching(pageParam), 
   {
    getNextPageParam: (lastPage:any, allPages:any) => allPages.length && allPages.length <= max_page+1 ? allPages.length+1 : max_page+1,
   });


  const DataFetching = async (per_page:number) =>{
   //console.log('first page>',per_page)
    try {
    setLoading(true);

    let response;

    if (!name || name === "" || name?.length === 0) {
      //Replace axios to AxiosClient
      response = await AxiosClient.get(`${process.env.NEXT_PUBLIC_FOOD_URL}/menus?page=${per_page}`);
      //console.log('Hello',response.data.menus)
    } else {
      //Replace axios to AxiosClient
      response = await AxiosClient.get(UrlBase);
    }

    setAll(response.data?.all);
    setMenu(response.data?.menus)
    return {
      pages: [response.data.menus], // Assuming the response structure has a 'data' property
    };
  } catch (error) {
    console.error(error);
    return {
      pages: [], // Return an empty array in case of an error
    };
  } finally {
    setLoading(false);
  }
  }

  useEffect(()=>{
    //if(data?.pageParams.length) 
    //console.log(data?.pages.length)
    DataFetching(data?.pageParams.length? data.pageParams.length : menus.length)
  },[name])
  console.log('page num',page,Ref)
   if(isCategory.category !==0 ){
//Old version

    //@ts-ignore
    // temp = menus?.filter((e:any,i:number)=>{
    //   return e?.category_Id === isCategory.category
    // })
    temp = menus?.filter((res:any)=>{
      //console.log("RR",res)
       return res.menu_category?.some((fil:any) => {
          return fil.category && fil.category.id === isCategory.category
        })
      })
  }else{
   temp = menus
  }
  
  useIntersectionObserver({
    target: Ref,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });
  
  // console.log('Data',temp)
  // console.log('Data Page,',data?.pageParams.length)
  // console.log('Menus page',temp?.length)
  // console.log('Name>',name)
  // console.log('Param Data',data?.pageParams.length)
  // console.log('Param Menus',temp)
  //console.log('Parame MaxLength',loading,all)
  return (
    <>
      <Head>
        <title>Ezy Menu</title>
        <meta name="description" content="Power by godital" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.jpg" />
      </Head>
     {
      isLoading?
      (
        // <div style={{
        //   width:"100%",
        //   height:"100%",
        //   backgroundColor:"rgba(0, 0, 0, 0.289)",
        //   position:"absolute",
        //   left:"0",
        //   top:"0",
        //   }}>

        // </div>
        ''
      )
      :
      <HomePageScreen 
      menus={temp} //data?.pages[0]?.pages[0]
    />
     }

      {
        loading=== true && all===false ?
          <div style={{display:"flex",justifyContent:"center",padding:"20px",marginTop:"5%"}}>
            <Spinner/>
          </div>
        : ''
      }
    
      {
        all ?
        '':
        (
          <div
          ref={Ref} 
          id="test" 
          style={{ 
            //background:"red",
            marginTop:"5%" , //10%
            height: '20px', //50px 
            width:'100%', 
            backgroundColor: "#F6FAF7" }}>
        </div>
        )
      }

    </>
  )
}
