import React from "react";
import { Card, Form, Button, Toast, ToastContainer, Modal } from "react-bootstrap";

const init = { username: "", email: "", password: "", confirm: "" };

function validate(v) {
  const e = {};
  const u = v.username.trim();
  if (!u) e.username = "Username là bắt buộc";
  else if (!/^[A-Za-z0-9_.]{3,}$/.test(u)) e.username = "≥3 ký tự, chỉ chữ, số, . hoặc _";
  else if (u !== v.username) e.username = "Không khoảng trắng đầu/cuối";

  if (!v.email.trim()) e.email = "Email là bắt buộc";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Email không hợp lệ";

  if (!v.password) e.password = "Mật khẩu là bắt buộc";
  else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(v.password))
    e.password = "≥8 ký tự, có hoa, thường, số, ký tự đặc biệt";

  if (!v.confirm) e.confirm = "Nhập lại mật khẩu";
  else if (v.confirm !== v.password) e.confirm = "Mật khẩu không khớp";
  return e;
}

export default function RegisterForm() {
  const [values, setValues] = React.useState(init);
  const [touched, setTouched] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [showToast, setShowToast] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const onBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(values));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setShowToast(true);
      setShowModal(true);
    }
  };

  const onCancel = () => {
    setValues(init);
    setTouched({});
    setErrors({});
  };

  const allFilled = values.username && values.email && values.password && values.confirm;
  const isValid = allFilled && Object.keys(validate(values)).length === 0;

  return (
    <Card
      className="shadow-sm"
      style={{ maxWidth: 520, margin: "32px auto", borderRadius: 12 }}
    >
      <Card.Header className="text-center fs-3 bg-light">Register</Card.Header>
      <Card.Body>
        <Form noValidate onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              placeholder="Enter username"
              value={values.username}
              onChange={onChange}
              onBlur={onBlur}
              isInvalid={touched.username && !!errors.username}
            />
            <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              value={values.email}
              onChange={onChange}
              onBlur={onBlur}
              isInvalid={touched.email && !!errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Enter password"
              value={values.password}
              onChange={onChange}
              onBlur={onBlur}
              isInvalid={touched.password && !!errors.password}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              name="confirm"
              type="password"
              placeholder="Re-enter password"
              value={values.confirm}
              onChange={onChange}
              onBlur={onBlur}
              isInvalid={touched.confirm && !!errors.confirm}
            />
            <Form.Control.Feedback type="invalid">{errors.confirm}</Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex gap-2">
            <Button type="submit" className="flex-fill" disabled={!isValid}>
              Submit
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              className="flex-fill"
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Card.Body>

      {/* Toast */}
      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={2000} autohide>
          <Toast.Header>
            <strong className="me-auto">Register</strong>
          </Toast.Header>
          <Toast.Body>Submitted successfully!</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Modal hiển thị thông tin */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin đăng ký</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Card.Title className="mb-3 text-success">
                Đăng ký thành công!
              </Card.Title>
              <Card.Text className="mb-1">
                <strong>Username:</strong> {values.username.trim()}
              </Card.Text>
              <Card.Text className="mb-0">
                <strong>Email:</strong> {values.email}
              </Card.Text>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </Card>
  );
}
