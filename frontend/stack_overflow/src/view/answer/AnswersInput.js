import React from "react";

const AnswersInput = ({ text, currentQuestion, onChange, onCreate, onUndo, onRedo }) => (
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
            <label className="label"> Text </label>
            <input data-cy="atext" className="input" value={text} onChange={e => onChange("text", e.target.value)}  type="text" placeholder="Text input" />
        </div>

        <div className="control">
            <button data-cy="createAnswer" className="button is-link" onClick={() => onCreate(currentQuestion)}> Create </button>
        </div>
        <br />
    </div>
);

export default AnswersInput;