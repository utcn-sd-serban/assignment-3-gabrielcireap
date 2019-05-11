import React from "react";

const QuestionSearchByTitle = ({ title, onChange, onSearch }) => (
    <div>
        <div className="column is-one-quarter">
            <label class="label"> Title </label>
            <input value={title} onChange={e => onChange("title", e.target.value)} class="input" type="text" placeholder="Text input" />
        </div>
        <div class="control">
            <button class="button is-link" onClick={onSearch}> Search </button>
        </div>
        
    </div>
);

export default QuestionSearchByTitle;