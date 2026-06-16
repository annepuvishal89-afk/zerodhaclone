import {useState,useEffect} from "react"
import Card from "./Card";
function Products() {
    const [products, setproducts] = useState([])
   //fetch the product dat from the fakestore Api
    useEffect(() => {

      fetch('https://fakestoreapi.com/products')
      fetch('http://localhost:3000/products')
    .then(response => response.json())
    .then(data => setproducts(data));


    }, [])





  return (
    <>
    <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around",gap:'20px'}}   >

    {
        products.map((p)=>{
       return <Card image={p.image} title={p.title}  price={p.price}  />
        })
    }

    </div>
    </>
  )
}
