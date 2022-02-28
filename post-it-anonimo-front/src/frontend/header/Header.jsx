const headerStyle = {
  borderStyle: "solid",
  padding: 10,
  borderRadius: 5,

};

const links = {
  display: "inline",
  margin: 10,
};

function Header(props) {
  return (
    <header id="postItHeader" style={headerStyle}>
      <div style={links}>
        <a href="/">Home</a>
      </div>

      <div style={links}>
        <a href="/newPostIt">Criar novo post-it</a>
      </div>
    </header>
  );
}

export default Header;
