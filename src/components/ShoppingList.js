import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  // Fetch Requests
  useEffect(() => {
    fetch("http://localhost:4000/items")
    .then((response) => response.json())
    .then((items) => setItems(items))
  }, []);

  // Event Handlers
  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleAddItem(newItem){
    // console.log("In shopping list: ", newItem);
    setItems([...items, newItem]);
  }

  function handleUpdateItem(updatedItem){
    // console.log("In ShoppingCart: ", updatedItem);

    const updatedItems = items.map((item) => {
      if(item.id === updatedItem.id){
        // Replace the updated item in the list of items
        return updatedItem;
      } else {
        // While keeping all other items the same
        return item;
      }
    });
    
    // Set the items state with the array containing the item that has been updated
    setItems(updatedItems);
  }

  function handleDeleteItem(deletedItem){
    // console.log("In ShoppingCart: ", deletedItem);
    // Create a new array with only the items that DO NOT match the id of the deleted items
    const updatedItems = items.filter((item) => item.id !== deletedItem.id); 
    setItems(updatedItems);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateItem} onDeleteItem={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
