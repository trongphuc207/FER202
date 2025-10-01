import hero from "../components/assets/sv.png"; 

export default function Hero() {
  return (
    <div style={{background:"#e79033"}}>
      <div className="container py-3">
        <img src={hero} alt="Students" className="img-fluid rounded w-100" />
      </div>
    </div>
  );
}
