import React from 'react';
import './tile.scss';

 /* 1. Find the first the tile
  * 2. Find the tile number
  * 3. Find the tile position of row and column
  * 4. Find the tile from which row# to which row#
  * 5. Find the tile from which col# to which col#
  * 6. Find if moving or not
  * 7. Find if this tile is new or not
  * 8. Finally merge them if same value
  */

const Tile = ({tile}) => {

    let classNameArray = ["tile"];
    classNameArray.push("tile"+ tile.value);

    if(!tile.mergedInto){
        classNameArray.push(`position_${tile.row}_${tile.column}`);
    }

    if(tile.hasMoved()){
        classNameArray.push(`row_from_${tile.fromRow()}_to_${tile.toRow()}`);
        classNameArray.push(`column_from_${tile.fromColumn()}_to_${tile.toColumn()}`);
        classNameArray.push("isMoving");
    }

    if(tile.isNew()){classNameArray.push('new');}

    if(tile.mergedInto){classNameArray.push('merged');}

    let classNames = classNameArray.join(" ");

    return (
        <span className={classNames}></span>
    );
};

export default Tile;