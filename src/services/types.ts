import { RaRecord, Identifier } from "react-admin";

export interface Image extends RaRecord {
  fileName: string;
  filePath: string;
  fileSize: string;
  fileType: string;
  id: number;
}

export interface ProjectFile extends RaRecord {
  id: number;
  image: string;
}

export type ThemeName = "light" | "dark";

export interface Category extends RaRecord {
  name: string;
}

export interface Product extends RaRecord {
  category_id: Identifier;
  description: string;
  height: number;
  image: string;
  price: number;
  reference: string;
  stock: number;
  thumbnail: string;
  width: number;
}

export interface Customer extends RaRecord {
  first_name: string;
  last_name: string;
  address: string;
  stateAbbr: string;
  city: string;
  zipcode: string;
  avatar: string;
  birthday: string;
  first_seen: string;
  last_seen: string;
  has_ordered: boolean;
  latest_purchase: string;
  has_newsletter: boolean;
  groups: string[];
  nb_commands: number;
  total_spent: number;
}

export type OrderStatus = "ordered" | "delivered" | "cancelled";

export interface Order extends RaRecord {
  status: OrderStatus;
  basket: BasketItem[];
  date: Date;
  total: number;
}

export interface BasketItem {
  product_id: Identifier;
  quantity: number;
}

export interface Invoice extends RaRecord { }

export type ReviewStatus = "accepted" | "pending" | "rejected";

export interface Review extends RaRecord {
  date: Date;
  status: ReviewStatus;
  customer_id: Identifier;
  product_id: Identifier;
}

declare global {
  interface Window {
    restServer: any;
  }
}

export interface MovieInfo extends RaRecord {
  title: string,
  director: string,
  country: string,
  homePage: string,
  overview: string,
  release: string,
  duration: string,
  rating: Number,
  synopsis: string,
  status: string,
  image: Image[];
}

export interface Informasi extends RaRecord {
  title: string;
  content: string;
  kategori: string;
  image: string;
  type: string;
  user: string;
}

export interface Peminjaman extends RaRecord {
  nim: string;
  tgl: Date;
  ket: Number;
  user_id: string;
  nama: string;
  status: Number;
  tglkembali: Date;
}
