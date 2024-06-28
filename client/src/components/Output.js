import React, { useState, useEffect } from 'react'

export const Output = (props) => {
    const [packingList, setPackingList] = useState({
      "Important": [],
      "Clothing": [],
      "Personal care": [],
      "Electronics": [],
      "Food": [],
      "Entertainment": [],
      "Miscellaneous": []
    });

    useEffect(() => {
      let newPackingList = structuredClone(packingList);
      let durationDividedBy2 = 0;
      let durationDividedBy4 = 0;

      durationDividedBy2 = Math.round(props.sharedData.duration / 2);
      durationDividedBy4 = Math.round(props.sharedData.duration / 4);
  
      newPackingList["Clothing"].push(`${durationDividedBy2} x Tops`, `${durationDividedBy2} x Jeans`, `${props.sharedData.duration} x Underwear`, `${props.sharedData.duration} x Socks`, `${durationDividedBy4} x Pyjamas`, `Jacket`, `Dress`, `Shoes`, `Belt`);
      newPackingList["Personal care"].push("Toiletries", "Personal Medications", "General Medications (e.g. painkillers, travel sickness)", "First Aid Kit", "Hairbrush/comb", "Makeup", "Shaving kit", "Deodorant", "Perfume/aftershave", "Moisturiser", "Toothbrush", "Toothpaste", "Shampoo", "Conditioner");
      newPackingList["Important"].push("Passport", "Travel documents (transport, accommodation etc)", "Travel insurance documents", "Money", "Debit/credit cards", "Phone", "Phone Charger", "Maps/Directions", "Travel Guides");
      newPackingList["Electronics"].push("Adapter", "Camera", "Headphones", "Laptop", "Tablet", "Chargers for all electronics", "Power bank");
      newPackingList["Food"].push("Snacks for the journey", "Drinks for the journey");
      newPackingList["Entertainment"].push("Book(s)", "Pack of Cards", "Games");
  
      if (props.sharedData.holidayType === "beach") {
        newPackingList["Clothing"].push("Swimwear", "Sunglasses", "Sun Hat", "Beachwear", "Beach shoes / sandals");
        newPackingList["Personal care"].push("Sunscreen");
        newPackingList["Miscellaneous"].push("Beach towels");
      } else if (props.sharedData.holidayType === "adventure") {
        newPackingList["Clothing"].push("Hiking boots", "Warm clothing");
        newPackingList["Important"].push("Trekking poles");
      } else if (props.sharedData.holidayType === "camping") {
        newPackingList["Important"].push("Tent", "Tent poles", "Sleeping bag");
        newPackingList["Clothing"].push("Hiking boots", "Warm clothing", "Trekking poles");
      } else if (props.sharedData.holidayType === "city") {
        newPackingList["Clothing"].push("Smart dress");
      } else if (props.sharedData.holidayType === "multiDestination") {
        newPackingList["Clothing"].push("Swimsuits", "Hiking boots", "Warm clothing", "Smart dress");
        newPackingList["Personal care"].push("Sunscreen");
        newPackingList["Miscellaneous"].push("Beach towels");
      }
  
      newPackingList["Miscellaneous"].push("House keys", "Car keys", "Travel pillow", "Umbrella");
  
      setPackingList(newPackingList);
    }, [props.sharedData.duration, props.sharedData.holidayType]);

    // const handleSelect = (event) => {
    // };

    return (
      <div className="outputPage">
        <button 
        type="button"
        className="backButton" 
        onClick={props.goHome}
        >
            Go back
        </button>
        <div className="output">
          <h1>Packing Checklist for {props.sharedData.destination}</h1>
          {props.sharedData.holidayMakers.map((holidayMaker, index) => (
            <div className="output-individual-packing-list" key={index}>
              <h2>Checklist for {holidayMaker.name}:</h2>
              <div className="output-category-list">
                {Object.keys(packingList).map(category => (
                  <div className="output-category" key={category}>
                    <h3>{category}:</h3>
                    <div className="output-list-container">
                      {packingList[category].map((item, index) => (
                        <div className="output-item" key={index}>
                          <input
                            type="checkbox"
                            name={item}
                            id={index} 
                            value={item}
                            // onChange={handleSelect}
                          />
                          <label htmlFor={index}>{item}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}
