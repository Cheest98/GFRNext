"use client";
import {
  deleteList,
  deleteProduct,
  fetchListProducts,
  updateProductStatus,
} from "@/lib/actions/list.actions";
import { Session } from "next-auth";
import Image from "next/image";
import { useEffect, useState } from "react";
import Product from "../forms/Product";
import ListModal from "../modals/ListModal";
import DeleteButton from "../shared/DeleteButton";
import EditButton from "../shared/EditButton";

interface ListCardProps {
  session: Session | null;
  id: string;
  list: string;
  status: string;
  price: number | null;
}

interface Product {
  id: string;
  product: string;
  status: string;
  listid: string;
}

function ListCard({ id, list, status, price, session }: ListCardProps) {
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

  const handleCheckboxChange = async (productId: string, checked: boolean) => {
    try {
      const newStatus = checked ? "Completed" : "Not Completed";
      await updateProductStatus({
        productId: productId,
        newStatus: newStatus,
      });

      // Refresh the product list to show the new status
      refreshProductList();
    } catch (error) {
      console.error("Failed to update product status:", error);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct({ productId: productId });
      // Refresh the product list to show the remaining products
      refreshProductList();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <>
      <article className="p-5 rounded-lg bg-dark-2   border-r-dark-1 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <p className="text-1.5rem font-semibold text-light-1">{list}</p>
          <div className="flex items-center gap-2">
            <EditButton
              session={session}
              data={{ id }}
              action={handleListClick}
            />
            <DeleteButton session={session} data={{ id }} action={deleteList} />
            <div></div>
          </div>
        </div>
        <div className="flex w-full flex-col">
          {products.map((product) => (
            <div
              key={product.id}
              className="mt-2 flex justify-between items-center"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={product.status === "Completed"}
                  onChange={(e) =>
                    handleCheckboxChange(product.id, e.target.checked)
                  }
                  className="rounded " // Add more styling as needed
                />
                <p className=" text-small-regular text-light-2">
                  {product.product}
                </p>
              </div>
              <button onClick={() => handleDeleteProduct(product.id)}>
                <Image
                  src="/assets/delete.svg"
                  alt="Trash"
                  width={14}
                  height={14}
                  className="cursor-pointer object-contain"
                />
              </button>
            </div>
          ))}
          <div>
            <Product listId={id} onProductAdded={refreshProductList} />
          </div>
          <div className=" mt-2 h-0.5 w-full bg-dark-3" />
          <div className="mt-2 flex justify-between items-center">
            <p className="text-subtle-medium text-gray-1">{status}</p>
            {status === "Completed" && (
              <p className="text-subtle-medium text-gray-1">
                {" "}
                Total price: {price}
              </p>
            )}
          </div>
        </div>
      </article>
      {isModalOpen && (
        <ListModal
          session={session}
          id={id}
          list={list}
          status={status}
          products={products}
          onClose={handleCloseModal}
          onStatusUpdate={handleCloseModal}
        />
      )}
    </>
  );
}

export default ListCard;
