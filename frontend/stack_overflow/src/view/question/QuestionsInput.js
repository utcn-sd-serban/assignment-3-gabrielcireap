import React from "react";

const QuestionsInput = ({ title, text, tags, onChange, onCreate, onEditQuestion, onUndo, onRedo }) => (
    <div className="container is-fluid">

        <nav className="navbar is-transparent" role="navigation" aria-label="main navigation">
            <div className="navbar-start">
                <h1 className="title">
                    Assignment 2
                </h1>
            </div>
            <div className="navbar-end">
                <div className="navbar-item">
                    <div className="buttons">
                        <a className="button is-light" onClick={onUndo}>
                            Undo
                        </a>
                        <a className="button is-light" onClick={onRedo}>
                            Redo
                        </a>
                    </div>
                </div>
            </div>
        </nav>

        <div className="column is-one-quarter">
            <label className="label"> Title </label>
            <input data-cy="qtitle" value={title} onChange={e => onChange("title", e.target.value)} className="input" type="text" placeholder="Text input" />
        </div>

        <div className="column is-one-quarter">
            <label className="label"> Text </label>
            <input data-cy="qtext" value={text} onChange={e => onChange("text", e.target.value)} className="input" type="text" placeholder="Text input" />
        </div>

        <div className="column is-one-quarter">
            <label className="label"> Tags/Id </label>
            <input data-cy="qtags" value={tags} onChange={e => onChange("tags", e.target.value)} className="input" type="text" placeholder="Text input" />
        </div>
        
        <div className="control">
            <button data-cy="createQuestion" className="button is-link" onClick={onCreate}> Create </button>
            <button data-cy="editQuestion" className="button is-link" onClick={onEditQuestion}> Edit </button>
        </div>
        <br />
    </div>
);

export default QuestionsInput;