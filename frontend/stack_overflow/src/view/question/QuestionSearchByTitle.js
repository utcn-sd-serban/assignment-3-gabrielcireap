import React from "react";

const QuestionSearchByTitle = ({ title, onChange, onSearch, onUndo, onRedo }) => (
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
            <label class="label"> Title </label>
            <input data-cy="qtitle" value={title} onChange={e => onChange("title", e.target.value)} class="input" type="text" placeholder="Text input" />
        </div>
        <div class="control">
            <button data-cy="searchQuestion" class="button is-link" onClick={onSearch}> Search </button>
        </div>
        
    </div>
);

export default QuestionSearchByTitle;