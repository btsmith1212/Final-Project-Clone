import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useStoreContext } from "../utils/GlobalState";

import InputField from "../components/InputField";
import { UPDATE_PRODUCTS } from "../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../utils/queries";
import { CREATE_PRODUCT } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";

import Axios from "axios";

function ProductPost() {
  const fields = [
    { label: "Name", name: "name", type: "text", required: true },
    { label: "Price", name: "price", type: "number", required: true },
    { label: "Quantity", name: "quantity", type: "number", required: true },
    { label: "Category", name: "category", type: "select", required: true },
    {
      label: "Image",
      name: "image",
      type: "text",
      class: "cloudinary-button",
      required: true,
    },
    {
      label: "Description",
      name: "description",
      type: "textarea",
      required: true,
    },
  ];

  const [state, dispatch] = useStoreContext();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    image: "",
    category: {
      name: "",
    },
  });
  const [createProduct] = useMutation(CREATE_PRODUCT);

  // const { loading, data } = useQuery(QUERY_PRODUCTS);

  // useEffect(() => {
  //     if (data) {
  //         dispatch({
  //             type: UPDATE_PRODUCTS,
  //             products: data.products,
  //         });
  //         data.products.forEach((product) => {
  //             idbPromise("products", "put", product);
  //         });
  //     } else if (!loading) {
  //         idbPromise("products", "get").then((products) => {
  //             dispatch({
  //                 type: UPDATE_PRODUCTS,
  //                 products: products,
  //             });
  //         });
  //     }
  // }, [data, loading, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const myWidget = cloudinary.createUploadWidget({
  //   cloudName: 'dvi14vg6b',
  //   uploadPreset: 'shopsphere'}, (error, result) => {
  //     if (!error && result && result.event === "success") {
  //       console.log('Done! Here is the image info: ', result.info);
  //     }
  //   }
  // )
  const [imageSelected, setImageSelected] = useState("");

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "shopsphere");

    Axios.post(
      "https://api.cloudinary.com/v1_1/dvi14vg6b/image/upload",
      formData
    ).then((response) => console.log(response));
  };

  // document.getElementById("upload_widget").addEventListener("click", function(){
  //     myWidget.open();
  //   }, false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createProduct({
        variables: {
          input: {
            ...formData,
            price: parseFloat(formData.price),
            quantity: parseInt(formData.quantity),
            category: { name: formData.category },
          },
        },
      });
      console.log(formData);

      // // Update the IndexedDB store
      // idbPromise("products", "put", data.createProduct);

      // // Dispatch the action to update the local state
      // dispatch({
      //     type: UPDATE_PRODUCTS,
      //     products: [...state.products, data.createProduct],
      // });

      console.log("Product created:", data.createProduct);
      console.log(state);

      // Reset the form data
      // setFormData({
      //     name: "",
      //     description: "",
      //     price: "",
      //     quantity: "",
      //     image: "",
      //     category: "",
      // });
    } catch (error) {
      console.error("Error creating product:", error.message);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center py-16 pl-2 pr-4">
      <h2 className="text-3xl text-center font-bold">Sell my product</h2>
      <p className="text-center text-lg mt-4">
        Share your eco-friendly product with the world! <br />
        Fill out the form below to get started.
      </p>

      <form
        className="flex flex-row flex-wrap max-w-xl mt-16"
        onSubmit={handleSubmit}
      >
        {fields.map((field) =>
          field.name == "image" ? (
            <input
              type="file"
              onChange={(event) => {
                setImageSelected(event.target.files[0]);
                // uploadImage(event.target.files);
              }}
            />
          ) : (
            // <button onClick={uploadImage}> Upload Image </button>
            <InputField
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              value={formData[field.name]}
              onChange={handleChange}
              required={field.required}
            />
          )
        )}

        <div className="w-full">
          <button
            type="submit"
            className="block mx-auto mt-5 px-10 py-4 bg-olive rounded-lg text-white text-center"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}

export default ProductPost;
