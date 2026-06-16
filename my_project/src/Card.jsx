function Card({ image, title, price }) {
  return (
    <div style={{
      border: "1px red solid",
      width: "400px",
      textAlign: "center",
      borderRadius: "10px",
      padding: "15px" // Optional padding for better spacing
    }}>
      <img height={250} width={250} src={image} alt={title || "Product Image"} style={{ objectFit: "contain" }} />
      <h1>{title}</h1>
      <h2>${price}</h2>
    </div>
  );
}

export default Card;