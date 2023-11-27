import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { AxiosClient } from "../libs/AxiosClient";
import { useRouter } from "next/router";
import { CategoryContext, PageContext } from "@/pages/_app";
import axios from "axios";

type SearchTopProps={
  menBox ? : string
  hide? : Boolean;
  SetHide? : any
  menus? :any
  setMenus?:any
  active? : number
  setActive? :any
}
//{active, setActive,menus,setMenus,hide,SetHide}: SearchTopProps, 
export const SeacrhTop = (categories:any) => {
  const router = useRouter()
  const[valusearch, setValueSearch]= useState('')
  const[valuinput, setValueInput]= useState('')
  // const Listclick = ["Categories", "foods", "drinks", "Juice"];
  // const ListArr = ["1", "2", "3", "4", "5"]; //, "6", "7", "8","1", "2", "3", "4", "5", "6", "7", "8"
  //console.log('loaded:',categories)

  const{data,isError, isLoading} = useQuery({
    queryKey:'category',
    queryFn: async() => {
      return await (await AxiosClient.get(`/menus/categories`)).data.categories
    }
  })
  const handelSearch = (e:any) =>{
    if(valuinput){
      router.push({
        pathname: '/',
        query: {name: valuinput}
      })
    }
    
  }

  const handleChangeSearch =(e:any) =>{
    e.preventDefault()
    if(e.target.value){
      router.push({
        //pathname: '/search',
        query: {name: e.target.value}
      })
    }else if(e.target.value===''){
      router.push({
        //pathname: '/search',
        query: {name: ''}
      })
    }
    
  }

  let isHomePage = useContext(PageContext)
  let isCategory = useContext(CategoryContext)
  
  //console.log(data)
  

  return (
    <>
        <div className="container-md" style={{alignItems:"center", padding:"0px 12px"}}>
          {/* <div className="d-flex justify-content-between"> </div> */}
            <div className="row m-0">
            <div className="col-md-8 px-0">
              {/* <div className="filter-menu d-flex py-2 px-0 justify-content-start"></div>  */}
                <div className="cover-btn-filter d-flex p-0 m-0"> {/* add p-0 m-0 */}
                  {
                    data?.map( (p:any, index:number) =>{
                      //if(p?.menu_category?.length>0 && isCategory){
                        return(
                          <div  key={index} className={`${index}`}>
                            <button  className=
                            { 
                              isCategory.category=== 0 && index ===0 ?`btn-filter bg-active`: p.id === isCategory.category && index!=0?`btn-filter bg-active`: `btn-filter `
                            }
                            onClick={()=>isCategory.setCategory(p.id===isCategory.category? isCategory.category : index===0? 0 :p.id)}>
                              {index === 0 ? "All Category" : p.title_en }
                              {/* {p.title_en } {index} {} */}
                            </button>
                          </div>
                        )
                      //}
                      //return <h1>{index}</h1>
                    })
                  }
                </div>  
            </div>
            <div className="col-4 d-flex justify-content-end p-0">
              <div className="search d-flex ">
                <div className="input-group m-0"> {/* mb-3 */}
                  <form  action="" >
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search..."
                    onChange={(e:any)=> {setValueInput(e.target.value), handleChangeSearch(e)}}
                    //onFocus={handelSearch}
                  />
                  </form>
                </div>
              </div>
            </div>
          </div> 
        </div>
    </>
  );
};


