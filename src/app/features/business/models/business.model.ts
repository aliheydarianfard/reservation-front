export interface Business {
  id:string;
  name: string;
  categoryName: string;
  businessCategory: number;
  address: {
    provinceName: string;
    cityName: string;
    fullAddress: string;
    postalCode: string;
  };
}