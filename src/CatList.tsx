import { useEffect, useState } from "react";
import { Cat } from "./model";
import { fetchCats } from "./routes";
import Button from "react-bootstrap/Button";
import Modal from "react-modal";
import "./CatList.css";

const CatList = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [img, setImg] = useState("");
  useEffect(() => {
    fetchCats().then((data) => setCats(data));
  }, []);

  const handleDelete = (id: string) => {
    console.log("id is ", id);
    const newCats = cats.filter((cat) => cat.id != id);
    console.log("new cats are ", newCats);
    setCats(newCats);
  };

  const handleClose = () => setIsModalOpen(false);

  const handleViewImage = (url: string) => {
    console.log("id is ", url);
    setIsModalOpen(true);
    setImg(url);
  };

  return (
    <>
      <div className="CatList">
        <table className="center">
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Image Dimension</th>
            <th>Delete</th>
            <th>Full Image</th>
          </tr>
          {cats.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.id}</td>
                <td>
                  <img src={val.url} width="250" />
                </td>
                <td>
                  {val.width} x {val.height}
                </td>
                <td>
                  <Button onClick={() => handleDelete(val.id)}>Delete</Button>
                </td>
                <td>
                  <Button onClick={() => handleViewImage(val.url)}>View</Button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      <Modal isOpen={isModalOpen}>
        <div className="modal">
          <button
            type="button"
            className="btn btn-space"
            data-dismiss="modal"
            onClick={handleClose}
          >
            Close
          </button>

          <img src={img} />
        </div>
      </Modal>
    </>
  );
};

export default CatList;
