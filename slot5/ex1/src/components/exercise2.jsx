export function Exercise2() {
  //1. Tạo 1 mảng số nguyên, in ra danh sách list
  const numbers = [1, 2, 3, 4, 5];
  //tính tổng các phần tử của mảng
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  //tính trung bình các phần tử của mảng
  const average = sum / numbers.length;

  // khai mảng chuỗi name, in ra danh sách các tên, theo thứ tự tăng dần theo Alphabet 
  const names = ['An', 'Binh', 'Cuong', 'Dung', 'Em'];
  names.sort();

  //khai báo 1 mảng people chứa 10 đối tượng sinh viên
  const students = [
    { id: 1, name: 'An', age: 20, grade: 8.4 },
    { id: 2, name: 'Binh', age: 21, grade: 6.4 },
    { id: 3, name: 'Cuong', age: 22, grade: 7.9 },
    { id: 4, name: 'Dung', age: 23, grade: 5.4 },
    { id: 5, name: 'Em', age: 24, grade: 9.4 },
    { id: 6, name: 'Hung', age: 25, grade: 8.1 },
    { id: 7, name: 'Khanh', age: 26, grade: 6.9 },
    { id: 8, name: 'Linh', age: 27, grade: 7.5 },
    { id: 9, name: 'Minh', age: 28, grade: 8.7 },
    { id: 10, name: 'Nam', age: 29, grade: 5.9 },
  ];

  //lọc và sắp xếp sinh viên
  const Topgrade = students
    .filter(student => student.grade >= 7.5)
    .sort((a, b) => b.grade - a.grade);

  const topGradeAverage =
    Topgrade.reduce((acc, student) => acc + student.grade, 0) /
    Topgrade.length;

  return (
    <div>
      <h2>Exercise 2</h2>
      <p>In ra mảng số nguyên</p>
      <ul>
        {numbers.map((num, index) => (
          <li key={index}>phần tử thứ {index} - {num}</li>
        ))}
      </ul>

      {/* in tổng các phần tử của mảng */}
      <p>Tổng các phần tử của mảng: {sum}</p>
      <p>Trung bình các phần tử của mảng: {average.toFixed(2)}</p>

      <p>In ra mảng tên theo thứ tự tăng dần theo Alphabet</p>
      <ul>
        {names.map((name, index) => (
          <li key={index}>phần tử thứ {index} - {name}</li>
        ))}
      </ul>

      <h3>Danh sách sinh viên có grade lớn hơn hoặc bằng 7.5: </h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {Topgrade.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.grade}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="3">Trung bình điểm</td>
            <td>{topGradeAverage.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
