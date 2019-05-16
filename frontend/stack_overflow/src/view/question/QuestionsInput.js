import React from "react";

const QuestionsInput = ({ title, text, tags, onChange, onCreate, onEditQuestion }) => (
    <div className="container is-fluid" className="has-background-light">

        <div className="column is-one-quarter">
            <label className="label"> Title </label>
            <input value={title} onChange={e => onChange("title", e.target.value)} className="input" type="text" placeholder="Text input" />
        </div>

        <div className="column is-one-quarter">
            <label className="label"> Text </label>
            <input value={text} onChange={e => onChange("text", e.target.value)} className="input" type="text" placeholder="Text input" />
        </div>

        <div className="column is-one-quarter">
            <label className="label"> Tags/Id </label>
            <input value={tags} onChange={e => onChange("tags", e.target.value)} className="input" type="text" placeholder="Text input" />
        </div>
        
        <div className="control">
            <button className="button is-link" onClick={onCreate}> Create </button>
            <button className="button is-link" onClick={onEditQuestion}> Edit </button>
        </div>
        <br />
    </div>
);

export default QuestionsInput;