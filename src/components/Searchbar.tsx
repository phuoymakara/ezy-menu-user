import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { AxiosClient } from "../libs/AxiosClient";
import { useRouter } from "next/router";
import { CategoryContext, PageContext, SubcategoryContext } from "@/pages/_app";
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
  const [isInputFocused, setIsInputFocused] = useState(false);
  // const Listclick = ["Categories", "foods", "drinks", "Juice"];
  // const ListArr = ["1", "2", "3", "4", "5"]; //, "6", "7", "8","1", "2", "3", "4", "5", "6", "7", "8"
  //console.log('loaded:',categories)
  let isHomePage = useContext(PageContext)
  let isCategory = useContext(CategoryContext)
  let subcategoryContext = useContext(SubcategoryContext)

  const{data,isError, isLoading} = useQuery({
    queryKey:['category'],
    queryFn: async() => {
      return await (await AxiosClient.get(`/menus/categories`)).data.categories
    }
  })
  const subcategory = useQuery({
    queryKey:['subcategory'],
    queryFn: async() => {
      return await (await AxiosClient.get(`/some/subcategories`)).data.subcategories
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

  const handleClearSearchText= (e:any) =>{
    e.preventDefault()
    //console.log("Clear...")
    setValueInput("")
    router.push({
      //pathname: '/search',
      query: {name: ''}
    })
    //setValueInput('')
  }
  const handleCheckSubcategory = (e:any, id:number) =>{
    let box = e?.target
    if(box.checked){
      //@ts-ignore
      subcategoryContext.setIsSubcategory((t:number[])=> [...t,id])
    }else{
      //@ts-ignore
      subcategoryContext.setIsSubcategory((t:number[])=> t.filter((subId:number)=> subId !== id));
    }
  }


  // console.log("FF",isCategory.category)
  //let subcategory = data?.map((d:any)=> d.subcategory)
  //console.log('Sub',subcategoryContext.isSubcategory)
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
                        return(
                          <div  key={index} className={`${index}`}>
                            <button  className=
                            { 
                              isCategory.category=== 0 && index ===0 ?`btn-filter bg-active`: p.id === isCategory.category && index!=0?`btn-filter bg-active`: `btn-filter `
                            }
                            onClick={()=>{
                              isCategory.setCategory(p.id===isCategory.category? isCategory.category : index===0? 0 :p.id),
                               subcategoryContext.setIsSubcategory([0])
                               }}>
                              {index === 0 ? "All Category" : p.title_en }
                            </button>
                          </div>
                        )
                    })
                  }
                </div>  
            </div>
            <div className="col-4 d-flex justify-content-end p-0">
              <div className="search d-flex ">
                <div className="input-group m-0"> {/* mb-3 */}
                  <form  action="" >
                  <span id="cover-search" style={{
                    display:"flex", 
                    borderRadius:"10px",
                    border: "1px solid #303E27",
                    padding:"0px 15px 0px 5px"}}>
                    <input
                      type="text"
                      className="search-input"
                      style={{border:"none"}}
                      placeholder="Search..."
                      value={valuinput}
                      onChange={(e:any)=> {setValueInput(e.target.value), handleChangeSearch(e)}}
                      onFocus={()=> setIsInputFocused(true)}
                      onBlur={()=> setIsInputFocused(false)}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className={valuinput?"":"d-none"} onClick={handleClearSearchText} width="24" height="32" style={{margin:"0px",cursor:"pointer"}} viewBox="0 0 24 24"><path fill="#303e27" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"/></svg>
                  </span>
                  </form>
                </div>
              </div>
            </div>
          </div> 
        </div>
        <div className={isCategory.category===0?"d-none":"container-md"}>
          <div className="my-4 flex">
           {
            subcategory.data?.map((d:any)=>{
              if(Number(d.category.id)===isCategory.category){
                return(
                  <span key={d.id} className="flex" style={{marginRight:"20px"}}>
                    <input type="checkbox" name="subcategory" id="" onClick={(e)=> handleCheckSubcategory(e,d.id)} />
                    <label htmlFor="" style={{marginLeft:"4px",fontSize:"15px"}}>{d.title_en}</label>
                  </span>
                )
              }
            })
           }
          </div>
        </div>
    </>
  );
};


{/**       

<span key={i} className="flex" style={{marginRight:"18px"}}>
  <input type="checkbox" name="subcategory" id="" />
  <label htmlFor="" style={{marginLeft:"4px",fontSize:"15px"}}>{s.id}</label>
</span>
                          
 */}