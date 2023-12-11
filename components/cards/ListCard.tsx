"use client"
import { fetchListProducts, updateList } from "@/lib/actions/list.actions";
import Product from "../forms/Product";
import StatusButton from "../shared/StatusButton";
import { Session } from "next-auth";
import { useEffect, useState } from "react";

interface ListCardProps {
  session: Session | null;
  id: string;
  list: string;
  status: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
}

interface Product {
  id: string;
  name: string;
  status: string;
  listid: string;
}

function ListCard({ id, list, author, status, session }: ListCardProps) {

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchListProducts({ listId: id });
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        // Handle error appropriately
      }
    };

    loadProducts();
  }, [id]);

  const refreshProductList = async () => {
    try {
      const fetchedProducts = await fetchListProducts({ listId: id });
      setProducts(fetchedProducts); // This should update the state with the new list
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };
  
  return (
    <article className="p-5 rounded-lg bg-dark-2   border-r-dark-1 flex flex-col gap-2">
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex w-full flex-col">
            <div>
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h4>
              <p className="mt-2 text-small-regular text-light-2">{list}</p>
              <p className="mt-2 text-small-regular text-light-2">{status}</p>
            </div>
            {products.map((product) => (
          <div key={product.id}>
            <p className="mt-2 text-small-regular text-light-2">{product.name}</p>
            {/* Render other product details as needed */}
          </div>
        ))}
            <div>
              <Product listId={id} refreshProductList={refreshProductList} />
            </div>
          </div>
          <div>
            {status !== "Completed" && (
              <StatusButton
              session={session}
                data={{ id, status: "Completed", session }}
                action={updateList}
                label="Completed"
                
              />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default ListCard;
