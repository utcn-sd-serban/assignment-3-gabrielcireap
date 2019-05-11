import React from "react";
import QuestionsTable from "./question/QuestionsTable";
import UsersTable from "./user/UsersTable";

const Main = ({ questions, users, loggedUser, onAskQuestion, onSearchQuestionTitle, onSearchQuestionTag, onAnswer, onDeleteQuestion, onUpvoteQuestion, onDownvoteQuestion, onBan, userToString, tagToString }) => (
    <div className="container" className="has-background-light">
        <h1 className="title">
            Assignment 2
        </h1>

        <button className="button is-light" onClick={onAskQuestion}> Ask Question </button>
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