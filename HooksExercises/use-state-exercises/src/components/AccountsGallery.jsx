import React from "react";
import { Card, Row, Col, Form, Image, Badge } from "react-bootstrap";

const accounts = [
  { id: 1, username: "phuc",    password: "123456", avatar: "/images/phuc.jpg" },
  { id: 2, username: "quan",    password: "abcxyz", avatar: "/images/quan.jpg" },
  { id: 3, username: "thinh",   password: "pass12", avatar: "/images/thinh.jpg" },
  { id: 4, username: "dong",    password: "secret", avatar: "/images/dong.jpg" },
  { id: 5, username: "quang", password: "pizzmna1", avatar: "/images/quang.jpg" },
];

export default function AccountsGalleryCards() {
  const [term, setTerm] = React.useState("");
  const [filtered, setFiltered] = React.useState(
    [...accounts].sort((a, b) => a.avatar.localeCompare(b.avatar))
  );

  const onSearchChange = (e) => {
    const value = e.target.value;
    setTerm(value);

    const kw = value.trim().toLowerCase();
    const sorted = [...accounts].sort((a, b) => a.avatar.localeCompare(b.avatar));
    setFiltered(
      kw ? sorted.filter(a => a.username.toLowerCase().includes(kw)) : sorted
    );
  };

  return (
    <Card className="shadow-sm border-0" style={{ maxWidth: 900, margin: "32px auto", borderRadius: 16 }}>
      <Card.Header className="text-center fs-3 bg-light">Tìm kiếm theo tên</Card.Header>
      <Card.Body className="p-4">
        <Form.Control
          placeholder="Tìm kiếm theo username..."
          value={term}
          onChange={onSearchChange}
          className="mb-4"
          style={{ height: 44, borderRadius: 10 }}
        />

        {filtered.length === 0 ? (
          <div className="text-muted">Không tìm thấy kết quả</div>
        ) : (
          <Row className="g-3">
            {filtered.map(a => (
              <Col key={a.id} xs={12} sm={6} md={4}>
                <Card className="h-100 shadow-sm" style={{ borderRadius: 14 }}>
                  <Card.Body className="d-flex align-items-center gap-3">
                    <Image
                      src={a.avatar}
                      alt={a.username}
                      roundedCircle
                      style={{ width: 56, height: 56, objectFit: "cover" }}
                    />
                    <div>
                      <div className="fw-bold">
                        {a.username} <Badge bg="secondary">ID {a.id}</Badge>
                      </div>
                      {/* HIỂN THỊ PASSWORD */}
                      <div className="text-muted small">Mật khẩu: {a.password}</div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Card.Body>
    </Card>
  );
}
