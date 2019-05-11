import React from "react";

const UsersTable = ({ users, onBan }) => (
    <div>
        <table className="table" border="1">
            <thead>
                <tr>
                    <th> Id </th>
                    <th> Username </th>
                    <th> Password </th>
                    <th> Email </th>
                    <th> Score </th>
                    <th> Is Admin </th>
                    <th> Is Banned </th>
                    <th>  </th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, index) => (
                        <tr key={index}>
                            <td> {user.id} </td>
                            <td> {user.username} </td>
                            <td> {user.password} </td>
                            <td> {user.email} </td>
                            <td> {user.score} </td>
                            <td> {user.isAdmin === true ? "admin" : "non-admin"} </td>
                            <td> {user.isBanned === true ? "banned" : "not banned"} </td>
                            <td><button className="button is-dark" onClick={() => onBan(user.id)}> Ban </button></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
);

export default UsersTable;