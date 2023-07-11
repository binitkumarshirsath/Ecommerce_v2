import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/AdminMenu";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";
import Delete from "../../components/Prompt/Delete";

export default function CreateCategory() {
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const showDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setDeleteModalOpen(false);
  };
  const [name, setName] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        process.env.REACT_APP_API + "api/category/create-category",
        { name }
      );
      if (response.data.success) {
        toast.success(`${response.data.newCategory.name} category added`);
        setName("");
        getAllCategories();
      } else {
        toast.dark(response.data.message);
      }
    } catch (e) {
      toast.error("Error while adding category");
      console.log(e);
    }
  }
  async function handleUpdatedSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.put(
        process.env.REACT_APP_API +
          `api/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (response.data.success) {
        toast.success(`${selected.name} updated successfully`);
        getAllCategories();
        setIsModalOpen(false);
        setSelected(null);
      }
    } catch (error) {
      toast.error("Error while updating category");
      console.log(error);
    }
  }
  async function getAllCategories() {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API + "api/category/get-category"
      );
      if (data.success) setCategory(data.data);
    } catch (e) {
      toast.error("Something went wrong while fetching Categories");
      console.log(e);
    }
  }
  async function handleDelete(e) {
    try {
      e.preventDefault();
      const deletedItem = await axios.delete(
        process.env.REACT_APP_API +
          `api/category/delete-category/${selected._id}`
      );
      if (deletedItem.data.success) {
        toast.success(`${selected.name} category deleted successfully`);
        getAllCategories();
        setDeleteModalOpen(false);
        setSelected(null);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllCategories();
  }, []);
  const [category, setCategory] = useState([]);
  const [updatedName, setUpdatedName] = useState("");
  return (
    <Layout>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2 className="m-2">Add Category</h2>
            <CategoryForm
              value={name}
              setValue={setName}
              handleSubmit={handleSubmit}
            />{" "}
            <div className="my-3">
              <h3 className=" m-2">Manage Categories</h3>
              {category?.length === 0 ? (
                <h4 className="text-muted m-2">No Categories found ! Try creating one</h4>
              ) : (
                <div className="table-responive">
                  <table className="table w-75">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Category</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category?.map((item, i) => {
                        return (
                          <tr key={item._id}>
                            <th scope="row">{i + 1}</th>
                            <td>{item.name}</td>
                            <td>
                              <button
                                className="btn btn-secondary m-2"
                                onClick={() => {
                                  setUpdatedName(item.name);
                                  showModal();
                                  setSelected(item);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-danger m-2"
                                onClick={() => {
                                  showDeleteModal();
                                  setSelected(item);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          <Modal
            title="Edit category name"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
          >
            <CategoryForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdatedSubmit}
              placeholder={"Enter updated category name : "}
              buttonText={"Update category"}
            />
          </Modal>
          <Modal
            title="Delete Category"
            open={isDeleteModalOpen}
            onCancel={handleCancel}
            footer={null}
          >
            <Delete handleDelete={handleDelete} />
          </Modal>
        </div>
      </div>
    </Layout>
  );
}
