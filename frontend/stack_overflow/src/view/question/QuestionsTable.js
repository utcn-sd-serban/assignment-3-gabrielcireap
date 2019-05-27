import React from "react";

const QuestionsTable = ({ questions, onAnswer, onDeleteQuestion, onUpvoteQuestion, onDownvoteQuestion, userToString }) => (
    <div className="container is-fluid">
        <table data-cy="qtable" className="table" border="1">
            <thead>
                <tr>
                    <th> Id </th>
                    <th> User </th>
                    <th> Title </th>
                    <th> Text </th>
                    <th> Creation Date </th>
                    <th> Vote Count </th>
                    <th> Tags </th>
                    <th>  </th>
                    <th>  </th>
                    <th>  </th>
                    <th>  </th>
                </tr>
            </thead>
            <tbody>
                {
                    questions.map((question, index) => (
                        <tr key={index} data-cy="question">
                            <td className="has-text-centered"> {question.id} </td>
                            <td className="has-text-centered"> {userToString(question.user)} </td>
                            <td> {question.title} </td>
                            <td> {question.text} </td>
                            <td className="has-text-centered"> {question.creationDate} </td>
                            <td className="has-text-centered"> {question.voteCount} </td>
                            <td> {question.tags} </td>
                            <td><button data-cy={"addAnswer" + index} className="button is-link" onClick={() => onAnswer(question.id)}> Answer </button></td>
                            <td><button data-cy={"deleteQuestion" + index} className="button is-warning" onClick={() => onDeleteQuestion(question.id)}> Delete </button></td>
                            <td><button data-cy={"upvoteQuestion" + index} className="button is-success" onClick={() => onUpvoteQuestion(question.id)}> Upvote </button></td>
                            <td><button data-cy={"downvoteQuestion" + index} className="button is-danger" onClick={() => onDownvoteQuestion(question.id)}> Downvote </button></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
);

export default QuestionsTable;