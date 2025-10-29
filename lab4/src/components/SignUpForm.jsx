import React, { useReducer } from "react";
import { Card, Form, Button, Toast, ToastContainer, Modal } from "react-bootstrap";
import ModalComponent from "./ModalComponent";
import ToastComponent from "./ToastComponent";

const initValues = { username: "", email: "", password: "", confirm: "" };

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


const initialState = {
  values: initValues,
  touched: {},
  errors: {},
  showToast: false,
  showModal: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD": {
      const values = { ...state.values, [action.field]: action.value };
      const errors = validate(values); 
      return { ...state, values, errors };
    }
    case "TOUCH": {
      return { ...state, touched: { ...state.touched, [action.field]: true } };
    }
    case "VALIDATE": {
      return { ...state, errors: validate(state.values) };
    }
    case "SUBMIT_SUCCESS":
      return { ...state, showToast: true, showModal: true };
    case "CANCEL":
      return { ...initialState };
    case "CLOSE_TOAST":
      return { ...state, showToast: false };
    case "CLOSE_MODAL":
      return { ...state, showModal: false };
    default:
      return state;
  }
}

export default function SignUpForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { values, touched, errors, showToast, showModal } = state;

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value });
  };

  const onBlur = (e) => {
    dispatch({ type: "TOUCH", field: e.target.name });
    dispatch({ type: "VALIDATE" });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "VALIDATE" });
    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length === 0) {
      
      dispatch({ type: "SUBMIT_SUCCESS" });
    }
  };

  const onCancel = () => dispatch({ type: "CANCEL" });

  const allFilled =
    values.username && values.email && values.password && values.confirm;
  const isValid = allFilled && Object.keys(errors).length === 0;

  return (
    <Card className="shadow-sm" style={{ maxWidth: 520, margin: "32px auto", borderRadius: 12 }}>
      <Card.Header className="text-center fs-3 bg-light">Sign Up</Card.Header>
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
              autoComplete="username"
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
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
              autoComplete="email"
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
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
              autoComplete="new-password"
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
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
              autoComplete="new-password"
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirm}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex gap-2">
            <Button type="submit" className="flex-fill" disabled={!isValid}>
              Submit
            </Button>
            <Button type="button" variant="secondary" onClick={onCancel} className="flex-fill">
              Cancel
            </Button>
          </div>
        </Form>
      </Card.Body>

      {/* Toast */}
      <ToastComponent
        show={showToast}
        handleClose={() => dispatch({ type: "CLOSE_TOAST" })}
        title="Success"
        body="Đăng ký thành công!"
      />

      {/* Modal hiển thị thông tin */}
      <ModalComponent
        show={showModal}
        handleClose={() => dispatch({ type: "CLOSE_MODAL" })}
        title="Thông tin đăng ký"
        body={
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Card.Title className="mb-3 text-success">Đăng ký thành công!</Card.Title>
              <Card.Text className="mb-1">
                <strong>Username:</strong> {values.username.trim()}
              </Card.Text>
              <Card.Text className="mb-0">
                <strong>Email:</strong> {values.email}
              </Card.Text>
            </Card.Body>
          </Card>
        }
      />
    </Card>
  );
}
