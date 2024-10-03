import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';

import AttributesList from "./AttributesList.js";

function App() {
    const [attrVals, setAttrVals] = useState(setInitAttrVals(10));

    function setInitAttrVals(initialValue) {
        var initialObj = {};
        return ATTRIBUTE_LIST.reduce((obj, curr) => {
            return Object.assign(obj, { [curr]: initialValue });
        }, initialObj);
    }

    function handleAttrVals(attr, type) {
        if (type == '+') {
            setAttrVals({
                ...attrVals,
                [attr]: (attrVals[attr] += 1),
            });
        }
        else {
            if (attrVals[attr] <= 0) {
                return;
            }
            setAttrVals({
                ...attrVals,
                [attr]: (attrVals[attr] -= 1),
            });
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Character Sheet</h1>
            </header>
            <section className="App-section">
                <AttributesList attributes={attrVals} handleAttrVals={handleAttrVals} />
            </section>
        </div>
    );
}

export default App;
