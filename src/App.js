import "./styles.css";
import { useState, useEffect } from "react";
import AddUser from "./components/AddUser";
import User from "./components/User";
export default function App() {
  const [users, setUsers] = useState([]);
  const fetchData = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      console.log("data::", data);
      setUsers([...data]);
    } catch (err) {
      console.log("err::", err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onAdd = async (name, email) => {
    await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((res) => {
        if (res.status !== 201) {
          return;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setUsers((users) => [...users, data]);
      })
      .catch((err) => {
        console.log("err::", err);
      });
  };

  const onEdit = async (id, name, email) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: name,
        email: email
      }),
      headers: {
        "Content-type": "aplication/json; charset=UTF-8"
      }
    })
      .then((res) => {
        if (res.status !== 200) {
          return;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        const updatedUser = users.map((user) => {
          if (user.id === id) {
            user.name = name;
            user.email = email;
          }
          return user;
        });
        setUsers((users) => updatedUser);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  };
  const onDelete = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE"
    })
      .then((res) => {
        if (res.status !== 200) {
          return;
        } else {
          setUsers(
            users.filter((user) => {
              return user.id !== id;
            })
          );
        }
      })
      .catch((err) => {
        console.log("err::", err);
      });
  };
  return (
    <div className="App">
      <h4>USER </h4>
      <AddUser onAdd={onAdd} />
      {users.map((user, i) => {
        return (
          <div key={i}>
            <User
              name={user.name}
              email={user.email}
              onEdit={onEdit}
              onDelete={onDelete}
              id={user.id}
            />
          </div>
        );
      })}
    </div>
  );
}
