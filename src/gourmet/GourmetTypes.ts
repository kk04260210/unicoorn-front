export type GourmetParamsType = {
  shopName: string;
  areaCode: string;
};

export type GourmetType = {
  searchWord: string;
  shops: Array<ShopType>;
};

export type ShopType = {
  id: string;
  name: string;
  logo_image: string;
  name_kana: string;
  address: string;
  access: string;
  url: string;
  image: string;
};
