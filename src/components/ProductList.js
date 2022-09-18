import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BASEURL from "../const/Baseurl";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const products = await axios.get(BASEURL + "/products");
    // console.log(products.data)
    setProducts(products.data);
  };

  /* Fungsi formatRupiah */
  const formatRupiah = (angka, prefix) => {
    var number_string = angka.replace(/[^,\d]/g, "").toString(),
      split = number_string.split(","),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi),
      separator = "";

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
      separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
    return prefix === undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
  };

  const deleteProduct = async (id) => {
    let confirm = window.confirm("Delete the item?");
    if (confirm) {
      await axios.delete(`${BASEURL}/products/${id}`);
      getProducts();
    } else {
      window.alert("Delete Canceled!");
    }
  };

  return (
    <div style={{ margin: "0 auto", width: "80%" }}>
      <Link to="/add" className="btn btn-success mb-2">
        Add New <i className="bi-plus-lg ml-2"></i>
      </Link>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col" className="text-center">
                Act
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.title}</td>
                <td>{product.category}</td>
                <td>{formatRupiah(product.price, "Rp. ")}</td>
                <td className="text-center">
                  <Link
                    to={`/edit/${product.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    <span>Edit</span>
                    <i className="bi-pencil ms-2"></i>
                  </Link>
                  <button
                    onClick={() => {
                      deleteProduct(product.id);
                    }}
                    className="btn btn-danger btn-sm ms-2"
                  >
                    <span>Delete</span>
                    <i className="bi-trash ms-2"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductList;
