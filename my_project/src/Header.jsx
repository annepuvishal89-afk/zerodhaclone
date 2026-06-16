mport {Link} from "react-router-dom"
function Header() {

  let togglemode=()=>{
     <header style={{display:"flex",justifyContent:"space-evenly"}}   >
    <img  height={30} width={100}      src="https://zerodha.com/static/images/logo.svg" alt="logo" />

    <input type="text" placeholder="search products..." />

    <nav style={{display:"flex",gap:"20px",alignItems:"center"}}>
    <a href="">Signup</a>
    <a href="">About</a>
    <a href="">Pricing</a>
    <a href="">Products</a>
    <a href="">Support</a>
  <Link to={'/register'}  > <a href="">Signup</a></Link>
  <Link to={'/about'}  ><a href="">About</a></Link>
  <Link to={'/products'}    ><a href="">Products</a></Link>
  <Link to={'/login'}     ><a href="">signin</a></Link>


    <button onClick={togglemode} >dark/light</button>
    </nav>

    </header>
    </>
  )
}
