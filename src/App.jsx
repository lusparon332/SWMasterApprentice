import React, { useState } from 'react'
import jedi from "./jedi.json"

let imageUrls = []

function findJediById(id) {
  return jedi.find(item => item.id === id);
}

function App() {

  const [showElements, setShowElements] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);


  const handleItemClick = (item) => {
    setSelectedItem(item);

    imageUrls = []
    let cur_jedi = findJediById(item)
    let cur_jedi_id = item
    imageUrls.push(`${cur_jedi_id}.png`)
    while(cur_jedi.apprentice !== '-1')
    {
      cur_jedi = findJediById(cur_jedi.apprentice)
      cur_jedi_id = cur_jedi.id
      imageUrls.push(`${cur_jedi_id}.png`)
    }

    if (!showElements)
      setShowElements(!showElements);
  };

  return (
    <div style={{ display: 'flex' }}>
      <ListComponent 
      selectedItem={selectedItem}
      handleItemClick={handleItemClick}/>
      <div>
        <ImagesConnectedByLine
        imageUrls={imageUrls}
        showElements={showElements}/>
      </div>
    </div>
  )
}

const ListComponent = (props) => {

  const containerStyle = {
    width: '200px',
    height: '150px',
    overflow: 'auto',
    border: '1px solid black'
  };

  return (
      <div>
        <h2>Джедаи</h2>
        <ul style={containerStyle}>
          {jedi.map(item => (
            <li key={item.id} onClick={() => props.handleItemClick(item.id)} style={{ backgroundColor: props.selectedItem === item.id ? 'lightblue' : 'white', cursor: 'pointer' }}>
              {item.name}
            </li>
          ))}
        </ul>
        <div>
          <p>{props.selectedItem === null ? 'Никто не выбран' : 'Наведите на фото, чтобы узнать информацию о джедае'}</p>
        </div>
      </div>
  );
};

const ImagesConnectedByLine = ({imageUrls, showElements}) => {
  return (
    <svg width="100%" height={imageUrls.length * 100}>
      {imageUrls.map((imageUrl, index) => {
        const x = 50;
        const y = index * 100 + 50;
        let cur_id = imageUrl.slice(0, -4)
        return (
          <g key={index}>
            {index !== imageUrls.length - 1 && showElements && (
              <line
                x1={x}
                y1={y}
                x2={x}
                y2={y + 100}
                stroke="black"
              />
            )}
            {showElements && (<image
              href={imageUrl}
              x={x - 35}
              y={y - 35}
              width="70"
              height="70"
            ><title>{findJediById(cur_id).name}, {findJediById(cur_id).title}</title></image>)}
          </g>
        );
      })}
    </svg>
  );
};

export default App;