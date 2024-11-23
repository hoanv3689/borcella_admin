"use client";

import CollectionForm from "@/components/products/ProductForm"
import Loader from "@/components/custom_ui/Loader";
import { ProductType } from "@/lib/types"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CollectionDetail = ({params}: {params: {productId: string}}) => {
  const [loading, setLoading] = useState(true);
  const [productDetail, setProductDetail] = useState<ProductType | null>(null);

  const getProductDetail = async () => {
    try {
      const res = await fetch(`/api/products/${params.productId}`, {
        method: "GET"
      });
      const data = await res.json();

      setProductDetail(data);
      setLoading(false);

    } catch (error) {
      console.log("productID_GET", error)
      toast("Something went wrong! Please try again")
    }
  }

  useEffect(() => {
    getProductDetail();
  }, [])

  return loading ? <Loader /> : (
    <CollectionForm initialData={productDetail} />
  )
}

export default CollectionDetail