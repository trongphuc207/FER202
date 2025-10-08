import MyFooter from "../components/Footer/MyFooter";

export default function FooterPage() {
    return (
       <div className="footer">
       <h2 style={{textAlign: "center", maxWidth: 600, margin: "0 auto"}}></h2>
       <MyFooter author="Trong Phuc" email = "phucltde180994@fpt.edu.vn" linkGithub="https://github.com/trongphuc207/FER202" />
       </div>
    );
}
