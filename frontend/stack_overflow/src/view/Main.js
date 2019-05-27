import React from "react";
import QuestionsTable from "./question/QuestionsTable";
import UsersTable from "./user/UsersTable";

const Main = ({ questions, users, loggedUser, onAskQuestion, onSearchQuestionTitle, onSearchQuestionTag, onAnswer, onDeleteQuestion,
    onUpvoteQuestion, onDownvoteQuestion, onBan, userToString, tagToString, onUndo, onRedo }) => (

    <div className="has-background-light">

        <nav className="navbar is-transparent" role="navigation" aria-label="main navigation">
            <div className="navbar-start">
                <h1 className="title">
                    Assignment 2
                </h1>
            </div>
            <div className="navbar-end">
                <div className="navbar-item">
                    <div className="buttons">
                        <a data-cy="undo" className="button is-light" onClick={onUndo}>
                            Undo
                        </a>
                        <a data-cy="redo" className="button is-light" onClick={onRedo}>
                            Redo
                        </a>
                    </div>
                </div>
            </div>
            </nav>

        <button data-cy="askQuestion" className="button is-light" onClick={onAskQuestion}> Ask Question </button>
        <button className="button is-light" onClick={onSearchQuestionTitle}> Search Questions by Title </button>
        <button className="button is-light" onClick={onSearchQuestionTag}> Search Questions by Tag </button>
        <br />
        <br />

        <h2 className="subtitle">
            Questions
        </h2>
        <QuestionsTable
            questions={questions}
            onAnswer={onAnswer}
            onDeleteQuestion={onDeleteQuestion}
            onUpvoteQuestion={onUpvoteQuestion}
            onDownvoteQuestion={onDownvoteQuestion}
            userToString={userToString}
            tagToString={tagToString}
        />
        <br />

        {
            loggedUser.isAdmin === true ? (
                <div>
                    <h2 className="subtitle">
                        Users
                    </h2>
                    <UsersTable
                        users={users}
                        onBan={onBan}
                    />
                </div>
            ) : (<div></div>)
        }
    </div>
);

export default Main;