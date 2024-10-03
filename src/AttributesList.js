import React from "react";

const AttributesList = ({
    attributes,
    handleAttrVals,
    attributeMods,
}) => {
    return (
        <div>
            <h3>Attributes</h3>
            {Object.keys(attributes).map((attr, i) => {
                return (
                    <div key={i} className="attribute">
                        <h4>{attr}</h4>
                        <div> Mod: {attributeMods[attr]}</div>
                        <div className="attribute buttons">
                            <p>{attributes[attr]}</p>
                            <button onClick={() => { handleAttrVals(attr, '+') }}>+</button>
                            <button onClick={() => { handleAttrVals(attr, '-') }}>-</button>
                        </div>
                    </div>

                )
            })
            }
        </div>
    );
};

export default AttributesList;


