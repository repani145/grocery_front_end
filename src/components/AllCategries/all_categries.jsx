import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth/userAuth";
import axios from "axios";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { baseUrl } from "../../urls/urls";
// const baseUrl = 'http://127.0.0.1:5000/';

const AllCatgryList = () => {
    const { accessToken } = useAuth();
    const [catgryList, setCatgryList] = useState([]);
    const [newCategory, setNewCategory] = useState({ category_name: '', image: null });
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const dataFetch = async () => {
            try {
                const response = await axios.get(`${baseUrl}/categories`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                if (response.data.success === 1) {
                    setCatgryList(response.data.data);
                }
            } catch (error) {
                alert(error);
            }
        };
        dataFetch();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCategory({ ...newCategory, [name]: value });
    };

    const handleImageChange = (e) => {
        setNewCategory({ ...newCategory, image: e.target.files[0] });
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('category_name', newCategory.category_name);
        formData.append('image', newCategory.image);

        try {
            const response = await axios.post(`${baseUrl}/categories`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success === 1) {
                setCatgryList([...catgryList, response.data.data]);
                setNewCategory({ category_name: '', image: null });
                setShowModal(false);
            } else {
                alert("Failed to add category");
            }
        } catch (error) {
            alert(error);
        }
    };

    const handleDelete = async (id) => {
        console.log('id================>',id)
        try {
            const response = await axios.delete(`${baseUrl}//delete-cat/${id}`,{
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            if (response.data.success === 1) {
                setCatgryList(catgryList.filter(cat => cat["id"] !== id));
            } else {
                alert("Failed to delete category");
            }
        } catch (error) {
            alert(error);
        }
    };

    return (
        <Container className="mt-4" style={{ height: "80vh", overflowY: "auto", backgroundColor: "#212529", borderRadius: "8px", padding: "20px", position: "relative" }}>
            <br/>
            {/* Add New Category Button */}
            <Button variant="secondary" onClick={() => setShowModal(true)} style={{ position: "absolute", top: "10px", right: "10px" }}>
                Add New Category
            </Button>

            {/* Modal for Add Category Form */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
                    <Modal.Title>Add New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: "#6c757d" }}>
                    <Form onSubmit={handleAddCategory}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                name="category_name"
                                value={newCategory.category_name}
                                onChange={handleInputChange}
                                placeholder="Category Name"
                                required
                                style={{ backgroundColor: "#2c3e50", color: "#fff" }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="file"
                                name="image"
                                onChange={handleImageChange}
                                required
                                style={{ backgroundColor: "#2c3e50", color: "#fff" }}
                            />
                        </Form.Group>
                        <Button variant="warning" type="submit" className="w-100">
                            Add Category
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Category List */}
            <Row className="mt-3">
                {catgryList.length ? (
                    catgryList.map((single_cat, index) => (
                        <Col key={index} md={4} sm={6} xs={12} className="mb-4">
                            <Card className="shadow-sm" style={{ backgroundColor: "#2c3e50", color: "#fff", position: "relative" }}>
                                <div style={{ position: "relative" }}>
                                    <Card.Img variant="top" src={single_cat['image']} alt="category image" style={{ height: "200px", objectFit: "cover" }} />
                                    {/* Delete Icon */}
                                    <FaTrash
                                        onClick={() => handleDelete(single_cat['id'])}
                                        style={{
                                            position: "absolute",
                                            top: "10px",
                                            right: "10px",
                                            color: "#e74c3c",
                                            cursor: "pointer",
                                            fontSize: "1.2rem"
                                        }}
                                    />
                                </div>
                                <Card.Body>
                                    <Card.Title>{single_cat['category_name']}</Card.Title>
                                    {/* <Card.Text>Explore our {single_cat['category_name']} collection.</Card.Text> */}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col>
                        <h1 className="text-center" style={{ color: "#6c757d" }}>No categories available</h1>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default AllCatgryList;
