import { FooterScreen } from "@/src/components/footer"
import { MenuCard } from "@/src/components/menuCard"
import { AxiosClient} from "@/src/libs/AxiosClient"
import axios from "axios"
import { error } from "console"
import { useRouter } from "next/router"

// export const config = {
// 	runtime: 'experimental-edge',
// };

export const Search = (res:any)=>{
  // const router = useRouter()
  // const menus= res.res
  // console.log('Menus=>', menus)
  return(
    <>
    <h1>Hello</h1>
     {/* <div className={ !menus || menus.length===0 || menus.length<=3?"container mt-3 p-0 h-100vh":"container mt-3 p-0"}>
        { !menus || menus.length===0 ? 
          <div>
            <h3 className="text-center mt-4 text-primary">Menus Not Found</h3>
          </div> 
          : <div className="row px-2">
          {
            menus?.sort((a:any, b:any) => b.id - a.id)?.map((p:any, index:number) => {
              return(
                <div className="col-md-3 mb-4" key={index+1}>
                  <MenuCard
                    code={p.code}
                    image={p.thumbnail}
                    title_kh={p.title_kh}
                    title_en={p.title_en}
                    price={p.price}
                  />
                </div>
              )
            })
          }
          </div>
          
        }
      </div>  */}
    </>
  )
}

export default Search

// export async function getServerSideProps(context:any){
//   const {name} = context.query
//   const UrlBase = String(process.env.NEXT_PUBLIC_FOOD_URL+`/search/menus?name=${name}`)
//   const baseURL2 = String(process.env.NEXT_PUBLIC_FOOD_URL+'/menus')
//   let res,menus
//   try{
//     res = await (await axios.get(UrlBase)).data.menus
//     menus = await (await axios.get(baseURL2)).data.menus
//   }catch{(error:any) => console.log(error)}

//   return{
//     props:{
//       res: name==='null' ||name===''? menus : res
//     }
//   }
// }