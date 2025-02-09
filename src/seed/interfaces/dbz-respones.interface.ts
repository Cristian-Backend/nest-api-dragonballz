export interface DbzResponse {
    items: Item[];
    meta: Meta;
    links: Links;
  }
  
  export interface Item {
    id: number;
    name: string;
    ki: string;
    maxKi: string;
    race: string;
    gender: string;
    description: string;
    image: string;
    affiliation: string;
    deletedAt: null | string;
  }
  
  export interface Meta {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  }
  
  export interface Links {
    first: string;
    previous: string;
    next: string;
    last: string;
  }