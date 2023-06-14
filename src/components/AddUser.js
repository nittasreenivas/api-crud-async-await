const AddUser = ({ onAdd }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(e.target.name.value, e.target.email.value);
    e.target.name.value = "";
    e.target.email.value = "";
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="name" name="name" /> <br />
        <input type="text" placeholder="email" name="email" /> <br />
        <button onSubmit={handleSubmit}> Add</button>
      </form>
      <hr />
    </div>
  );
};

export default AddUser;
