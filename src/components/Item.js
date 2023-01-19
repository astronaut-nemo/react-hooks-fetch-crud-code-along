import React from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {

  // Event Handlers
  function handleAddToCart() {
    // console.log("clicked item: ", item);

    // PATCH request
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        isInCart: !item.isInCart, //Toggle the value of isInCart for the item
      }),
    })
    .then((response) => response.json())
    .then((updatedItem) => onUpdateItem(updatedItem))
  }

  function handleDeleteClick() {
    // console.log(item);
    
    // DELETE request
    fetch(`http://localhost:4000/items/${item.id}`,{
      method:"DELETE",
    })
    .then((response) => response.json())
    .then(() => onDeleteItem(item));
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button
        className={item.isInCart ? "remove" : "add"}
        onClick={handleAddToCart}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>

      <button
        className="remove"
        onClick={handleDeleteClick}
      >
        Delete
      </button>
    </li>
  );
}

export default Item;
