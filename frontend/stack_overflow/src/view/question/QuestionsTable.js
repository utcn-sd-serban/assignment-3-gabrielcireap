import React from "react";

const QuestionsTable = ({ questions, onAnswer, onDeleteQuestion, onUpvoteQuestion, onDownvoteQuestion, userToString, tagToString }) => (
    <div>
        <table className="table" border="1">
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
                        <tr key={index}>
                            <td className="has-text-centered"> {question.id} </td>
                            <td className="has-text-centered"> {userToString(question.user)} </td>
                            <td> {question.title} </td>
                            <td> {question.text} </td>
                            <td className="has-text-centered"> {question.creationDate} </td>
                            <td className="has-text-centered"> {question.voteCount} </td>
                            <td> {tagToString(question.tags)} </td>
                            <td><button className="button is-link" onClick={() => onAnswer(index)}> Answer </button></td>
                            <td><button className="button is-warning" onClick={() => onDeleteQuestion(question.id)}> Delete </button></td>
                            <td><button className="button is-success" onClick={() => onUpvoteQuestion(question.id)}> Upvote </button></td>
                            <td><button className="button is-danger" onClick={() => onDownvoteQuestion(question.id)}> Downvote </button></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
);

export default QuestionsTable;