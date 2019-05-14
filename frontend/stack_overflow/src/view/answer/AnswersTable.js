import React from "react";

const AnswersTable = ({ answers, onEditAnswer, onDeleteAnswer, onUpvoteAnswer, onDownvoteAnswer, userToString, questionToString }) => (
    <div>
        <table className="table" border="1">
            <thead>
                <tr>
                    <th> Id </th>
                    <th> User </th>
                    <th> Question </th>
                    <th> Text </th>
                    <th> Creation Date </th>
                    <th> Vote Count </th>
                    <th>  </th>
                    <th>  </th>
                    <th>  </th>
                    <th>  </th>
                </tr>
            </thead>
            <tbody>
                {
                    answers.map((answer, index) => (
                        <tr key={index}>
                            <td className="has-text-centered"> {answer.id} </td>
                            <td className="has-text-centered"> {userToString(answer.user)} </td>
                            <td className="has-text-centered"> {questionToString(answer.question)}</td>
                            <td className="has-text-centered"> {answer.text} </td>
                            <td className="has-text-centered"> {answer.creationDate} </td>
                            <td className="has-text-centered"> {answer.voteCount} </td>
                            <td><button class="button is-link" onClick={() => onEditAnswer(answer.id)}> Edit </button></td>
                            <td><button class="button is-warning" onClick={() => onDeleteAnswer(answer.id)}> Delete </button></td>
                            <td><button class="button is-success" onClick={() => onUpvoteAnswer(answer.id)}> Upvote </button></td>
                            <td><button class="button is-danger" onClick={() => onDownvoteAnswer(answer.id)}> Downvote </button></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
);

export default AnswersTable;