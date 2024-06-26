import { server } from "typescript";

export interface IMenu{
  id: number | string;
  Menu_Price?: Array<IMenuPrice|any>;
  category_Id: number | string;
  code: string;
  thumbnail: string;
  menu_category: Array<IMenuCategory | any>;
  menu_tags?: Array<any>;
  price: string | number;
  title_en: string;
  title_kh?: string;
  title_ch?: string;
  isNew: boolean;
  top: boolean;
}

interface IMenuPrice{
  id: number | string;
  menu_code: string;
  price: string | number;
  size: string;
}

interface IMenuCategory{
  category:{
    id: number | string;
    slug: string;
    title_en: string;
    title_kh?: string;
    title_ch?: string;
    thumbnail: string;
  }
}