import { useState } from "react";

const User = ({ id, name, email, onEdit, onDelete }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleonEditSubmit = (e) => {
    e.preventDefault();
    onEdit(id, e.target.name.value, e.target.email.value);
    setIsEdit(!isEdit);
  };
  return (
    <div>
      {isEdit ? (
        <form onSubmit={handleonEditSubmit}>
          <input placeholder="name" name="name" defaultValue={name} />
          <input placeholder="email" name="email" defaultValue={email} />
          <button onSubmit={handleonEditSubmit}> Update</button>
        </form>
      ) : (
        <div className="user">
          <span className="user-name">{name} </span>
          <span className="user-email">{email} </span>
          <div>
            <button onClick={handleEdit}> Edit </button>
            <button onClick={handleDelete}> Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
