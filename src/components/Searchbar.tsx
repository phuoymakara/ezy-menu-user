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
      return await (await AxiosClient.get(`/categories`)).data.categories
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
  
  //console.log(isCategory.category)
  

  return (
    <>
      <div className="container-fluid mt-200 ">
        <div className="container-md ">
          {/* <div className="d-flex justify-content-between"> </div> */}
            <div className="row">
            <div className="col-md-8 px-0">
              {/* <div className="filter-menu d-flex py-2 px-0 justify-content-start"></div>  */}
                <div className="cover-btn-filter d-flex ">
                  {
                    data?.map((p:any, index:number) =>{
                      if(p?.products?.length!==0){
                        return(
                          <div   key={index+1} className="">
                            <button  className=
                            { 
                              isCategory.category=== 0 && index ===0 ?`btn-filter bg-active`: p.id === isCategory.category && index!=0?`btn-filter bg-active`: `btn-filter `
                            }
                            onClick={()=>isCategory.setCategory(p.id===isCategory.category? isCategory.category : index===0? 0 :p.id)}>
                              {index===0 ?"All Category": p.title_en || p.slug }
                            </button>
                          </div>
                        )
                      }
                    })
                  }
                </div>  
            </div>
            <div className="col-4 d-flex justify-content-end p-0">
              <div className="search d-flex ">
                <div className="input-group mb-3">
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
      </div>
    </>
  );
};


