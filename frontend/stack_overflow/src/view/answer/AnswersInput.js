import React from "react";

const AnswersInput = ({ text, currentQuestion, onChange, onCreate }) => (
    <div className="container" className="has-background-light">

        <div className="column is-one-quarter">
            <label className="label"> Text </label>
            <input className="input" value={text} onChange={e => onChange("text", e.target.value)}  type="text" placeholder="Text input" />
        </div>

        <div className="control">
            <button className="button is-link" onClick={() => onCreate(currentQuestion)}> Create </button>
        </div>
        <br />
    </div>
);

export default AnswersInput;