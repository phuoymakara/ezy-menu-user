type MenuCardProps={
  image ? : string;
  code ? : string;
  title_kh ? : string;
  title_en ? : string;
  title_ch ? : string;
  index? : number
}

export const MenuCard2 = ({index,image,code,title_ch,title_en,title_kh }: MenuCardProps) => {
  
  return (
    <>
        <div className="card card-custom2 rounded-3 shadow-sm">
          {/* <div className="px-3 object-fit-cover py-1"> </div> */}
          <img
            src={image}
            className="card-img-top img-card object-fit-cover"
            height={220}
            alt="My Image"
          />
          <div className="card-body px-2 ">
            <div className="d-flex justify-content-between m-0">
              <button className="btn-menu">{code}</button>
              <button className="btn-menu">$5.69</button>
            </div>
            <div className="mt-3">
              <h5>{title_kh}</h5>
              <h5>{title_en}</h5>
            </div>
          </div>
          {
            index===0? <div className="out-stock">out stock</div> : ''
          }
        </div>
    </>
  );
};
