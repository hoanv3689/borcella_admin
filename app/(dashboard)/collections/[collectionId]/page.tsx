"use client";

import CollectionForm from "@/components/collections/CollectionForm"
import Loader from "@/components/custom_ui/Loader";
import { CollectionType } from "@/lib/types"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CollectionDetail = ({params}: {params: {collectionId: string}}) => {
  const [loading, setLoading] = useState(true);
  const [collectionDetail, setCollectionDetail] = useState<CollectionType | null>(null);

  const getCollectionDetail = async () => {
    try {
      const res = await fetch(`/api/collections/${params.collectionId}`, {
        method: "GET"
      });
      const data = await res.json();

      setCollectionDetail(data);
      setLoading(false);

    } catch (error) {
      console.log("collectionID_GET", error)
      toast("Something went wrong! Please try again")
    }
  }

  useEffect(() => {
    getCollectionDetail();
  }, [])

  return loading ? <Loader /> : (
    <CollectionForm initialData={collectionDetail} />
  )
}

export default CollectionDetail