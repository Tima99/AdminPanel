import { useLayoutEffect } from "react";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { deleteUser } from "../api/request";

export function Home() {
    const { state } = useLocation();
    const { email } = state;
    const [users, setUsers] = useState();

    useLayoutEffect(()=>{
        setUsers(state?.users)
    }, [])

    return (
        <div className="relative">
            <div className="show-users">
                {users?.length >= 0 ? (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Department</th>
                                    <th>Password</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((_user) => {
                                    if (!_user.email) return;
                                    const editUser = {..._user}
                                    return (
                                        <tr key={_user.email}>
                                            <td>{_user.email}</td>
                                            <td>{_user.phone || "..."}</td>
                                            <td>{_user.department}</td>
                                            <td>{_user.password}</td>
                                            <td>
                                                <Link to={'/home/createUser'} state={{email, users, editUser}}>E</Link>
                                            </td>
                                            <td className="pointer"
                                                onClick={async () => {
                                                    try {
                                                        const data = await deleteUser({adminEmail: email,deleteUserEmail: editUser.email})
                                                        // console.log(data);
                                                        const newusers = [...data.users]
                                                        setUsers([])
                                                        setUsers(newusers)

                                                    } catch (error) {
                                                        console.log(error);
                                                    }
                                                }}
                                            >
                                                D
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <button>
                            <Link to="/home/createUser" state={{ email , users}}>
                                Create New User
                            </Link>
                        </button>
                    </>
                ) : (
                    <div>
                        <h3>No Users Found</h3>
                        <Link to="/home/createUser" state={{ users, email}}>
                            Create First One
                        </Link>
                    </div>
                )
                }
            </div>

            <Outlet context={{ setUsers }} />
        </div>
    );
}
