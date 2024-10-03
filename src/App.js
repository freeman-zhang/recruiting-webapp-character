import { useState, useEffect } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';

import AttributesList from "./AttributesList.js";
import ClassesList from "./ClassesList.js"

function App() {
    const [attrVals, setAttrVals] = useState(setInitAttrVals(10));
    const [attrMods, setAttrMods] = useState(
        setInitAttrVals(0)
    );
    const [classesAvailable, setClassAvailable] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");
    const maxStats = 70;

    // Retrive data from API on first load
    useEffect(() => {
        fetch(
            "https://recruiting.verylongdomaintotestwith.ca/api/{freeman-zhang}/character"
        )
            .then((response) => response.json())
            .then((data) => {
                setAttrVals(data.body.attrVals);
                setAttrMods(data.body.attrMods);
                setClassAvailable(data.body.classesAvailable);
            });
    }, []);

    function handleSave(e) {
        e.preventDefault();
        let data = {
            attrVals,
            attrMods,
            classesAvailable,
        };
        fetch(
            "https://recruiting.verylongdomaintotestwith.ca/api/{freeman-zhang}/character",
            {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            }
        );
    }

    //init function for attribute vals (and attribute mod)
    function setInitAttrVals(initialValue) {
        var initialObj = {};
        return ATTRIBUTE_LIST.reduce((obj, curr) => {
            return Object.assign(obj, { [curr]: initialValue });
        }, initialObj);
    }

    function handleAttrVals(attr, type) {
        const totalStats = Object.values(attrVals).reduce((curTotal, cur) => {
            return curTotal + cur;
        }, 0);
        if (type === '+') {
            if (totalStats >= maxStats) {
                return;
            }
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

        //check classes available
        for (let className in CLASS_LIST) {
            let requiredAttr = 0;

            // Count attributes reqs
            for (let attr in CLASS_LIST[className]) {
                if (attrVals[attr] >= CLASS_LIST[className][attr]) {
                    requiredAttr += 1;
                }
            }

            // Update classesAvailable state with classes that meet reqs
            let newClassesAvailable = classesAvailable;
            if (requiredAttr === 6 && !classesAvailable.includes(className)) {
                newClassesAvailable.push(className);
                setClassAvailable(newClassesAvailable);
                // Remove from classesAvailable if no longer meets reqs
            } else if (
                requiredAttr < 6 &&
                classesAvailable.includes(className)
            ) {
                newClassesAvailable = classesAvailable.filter((c) => c != className);
                setClassAvailable(newClassesAvailable);
            }
        }

        //change attr mods
        let newMods = attrMods;
        ATTRIBUTE_LIST.forEach((attr) => {
            newMods[attr] = Math.floor((attrVals[attr] - 10) / 2)
        });
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Character Sheet</h1>
            </header>
            <div>
                <button onClick={(e) => { handleSave(e); }} className="save-button">Save</button>
            </div>
            <section className="App-section">
                <AttributesList
                    attributes={attrVals}
                    handleAttrVals={handleAttrVals}
                    attributeMods={attrMods}
                />
                <ClassesList
                    classesAvailable={classesAvailable}
                    selectedClass={selectedClass}
                    setSelectedClass={setSelectedClass}
                />
            </section>
        </div>
    );
}

export default App;
