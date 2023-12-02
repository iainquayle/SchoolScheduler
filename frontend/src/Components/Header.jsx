const Header = (props) => {
    return (
      <div>
        <h1>School Scheduler</h1>
        <button onClick={props.onLogout}>Logout</button>
      </div>
    );
  };
  
  export default Header;
  