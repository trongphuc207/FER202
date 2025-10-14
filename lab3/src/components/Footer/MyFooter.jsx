import "./Footer.css"; 
import Button from "react-bootstrap/Button";

function MyFooter() {
  return (
    <footer>
      <p>Author: Trong Phuc</p>
      <p>Created by: phucltde180994@fpt.edu.vn </p>
      <p>&copy; {new Date().getFullYear()} Phuc. All rights reserved </p>
      <Button variant="link" href="https://github.com/trongphuc207/FER202" >My Link Github's project: Movies Management </Button>
    </footer>
  )
}
export default MyFooter;
