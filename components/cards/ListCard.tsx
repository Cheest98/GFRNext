"use client"
import { fetchListProducts, updateList } from "@/lib/actions/list.actions";
import Product from "../forms/Product";
import StatusButton from "../shared/StatusButton";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import ListModal from "../modals/ListModal";

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
  product: string;
  status: string;
  listid: string;
}

function ListCard({ id, list, author, status, session, onListUpdate  }: ListCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      setProducts(fetchedProducts); // Update the state with new product list
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };


  const handleListClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleListStatusUpdate = (updatedList) => {
    onListUpdate(updatedList); // Update the list status in the parent component
    handleCloseModal(); // Close the modal
  };

  return (
    <>
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
            <p className="mt-2 text-small-regular text-light-2">{product.product}</p>
            {/* Render other product details as needed */}
          </div>
        ))}
            <div>
              <Product listId={id} onProductAdded={refreshProductList} />
            </div>
          </div>
          <Button className="bg-primar-200" onClick={handleListClick}> Edit</Button>
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
    {isModalOpen && (
        <ListModal  
          session={session}           
          id={id}
          list={list}
          status={status}
          onClose={handleCloseModal}
          onStatusUpdate={handleCloseModal}
        />
      )}
    </>
  );
}

export default ListCard;
