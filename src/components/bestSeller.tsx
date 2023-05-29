import { MenuCard2 } from "./menuCard2"

export const BestSeller = () =>{
  const ListArr2 = ["./01.jpg", "./02.jpg", "./03.jpg"];

  return(
    <>
      <div className="mt-5">
            {/* <h2 className="text-primary">Best Seller</h2> */}
            <div className="row px-2">
            {
              ListArr2.map((p:any, index:number) => {
                return(
                  <div className="col-md-4 mb-3" key={index+1}>
                    <MenuCard2
                      code="23AVX"
                      image={p}
                      title_kh="សាឡាដត្រីធូណានិងពងទា"
                      title_en="Tuna Salad With Egg"
                      index={index}
                      
                    />
                  </div>
                )
              })
            }
          </div>
          </div>
    </>
  )
}

export default BestSeller