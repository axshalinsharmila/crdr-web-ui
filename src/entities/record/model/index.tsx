import { Storage, useStore } from "../../../shared/lib/storage";

// export const ProductStore = (<Awaited<ReturnType>>)

export const initialProductStore = {
    data:null,
    error:null,
    loading : false,
}
// } as Productstore;

export const productStore = Storage(initialProductStore)

export const useLazyStudyProduct =()=>{
    const [store] =useStore(productStore);
    return [store] as const
}

