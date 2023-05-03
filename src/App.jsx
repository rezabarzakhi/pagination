import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedTodo, setPageinatedTodos] = useState([]);

  let pageSize = 10;

  let pagesNumbers;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((datas) => {
        setTodos(datas);
        let endIndex = pageSize * currentPage
        let startIndex = endIndex - pageSize
        let allShownTodos = datas.slice(startIndex,endIndex)
        setPageinatedTodos(allShownTodos)
      });
  }, []);

  useEffect(()=>{
       let endIndex = pageSize * currentPage;
       let startIndex = endIndex - pageSize;
       let allShownTodos = todos.slice(startIndex, endIndex);
       setPageinatedTodos(allShownTodos);
  } , [currentPage])
  const changePageitante = (newPage) => {
    setCurrentPage(newPage);
  };

  const pagesCount = Math.ceil(todos.length / pageSize);
  pagesNumbers = Array.from(Array(pagesCount).keys());
  return (
    <>
      {!todos ? (
        "loading"
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {paginatedTodo.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.userId}</td>
                <td>{todo.title}</td>
                <td>
                  <p className={todo.completed ? "btn btn-success" : "btn btn-danger"}>
                    {todo.completed ? "completed" : "pending"}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <nav className="d-flex justify-content-center">
        <ul className="pagination" aria-current="page">
          {pagesNumbers.map((pageNumber) => (
            <li
              onClick={() => changePageitante(pageNumber + 1)}
              className={pageNumber + 1 === currentPage ? "page-item active" : "page-item"}
              key={pageNumber}>
              <span className="page-link">{pageNumber + 1}</span>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default App;
