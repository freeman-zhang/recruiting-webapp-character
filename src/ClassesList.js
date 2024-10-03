import React from "react";
import { CLASS_LIST } from "./consts";

const ClassesList = ({
    classesAvailable,
    selectedClass,
    setSelectedClass,
}) => {
    return (
        <div>
            <h3>Classes</h3>
            <div>
                {Object.keys(CLASS_LIST).map((className, i) => {
                    return (
                        <h4
                            onClick={() => {
                                setSelectedClass(className);
                            }}
                        >
                            {className} {classesAvailable.includes(className) ? 'O' : 'X'}
                        </h4>
                    );
                })}
            </div>
            <div>
                <h3>View Stat Requirements</h3>
                <div>
                    {selectedClass == "" ? (
                        <div>Click a class to see stats</div>
                    ) : (
                        <div>
                            <u>{selectedClass}</u>
                            {Object.keys(CLASS_LIST[selectedClass]).map((attribute, i) => {
                                return (
                                    <div key={i}>
                                        {attribute}: {CLASS_LIST[selectedClass][attribute]}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default ClassesList