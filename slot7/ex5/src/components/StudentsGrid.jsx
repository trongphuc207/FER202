import {useState} from "react";
import StudentCard from "./StudentCard";
import s1 from "../components/assets/anh1.png";
import s2 from "../components/assets/anh2.png";
import s3 from "../components/assets/anh3.png";
import s4 from "../components/assets/anh4.png";

const initial = [
  {id:"DE160182", name:"Nguyễn Hữu Quốc Khánh", city:"DaNang", photo:s1},
  {id:"DE160377", name:"Choy Vinh Thiên", city:"QuangNam", photo:s2},
  {id:"DE160547", name:"Đỗ Nguyên Phúc", city:"QuangNam", photo:s3},
  {id:"DE170049", name:"Lê Hoàng Minh", city:"DaNang", photo:s4},
];

export default function StudentsGrid(){
  const [attend, setAttend] = useState(
    Object.fromEntries(initial.map(s=>[s.id, "present"])) // default
  );

  const handleChange = (id, value) => {
    setAttend(prev => ({...prev, [id]: value}));
  };

  const handleSubmit = (id) => {
    alert(`Submitted ${id}: ${attend[id]}`);
  };

  return (
    <div className="row g-4">
      {initial.map(s=>(
        <div className="col-12 col-md-6" key={s.id}>
          <StudentCard
            data={s}
            value={attend[s.id]}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
      ))}
    </div>
  );
}
