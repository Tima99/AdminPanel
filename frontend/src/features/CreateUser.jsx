import { useSubmitForm } from "../hooks/useSubmitForm";
import {
    useOutletContext,
    useNavigate,
    useLocation,
} from "react-router-dom";
import { useState } from "react";
import req, { createUser, editUser } from "../api/request";
import { useEffect } from "react";
import { useLayoutEffect } from "react";

export function CreateUser() {
    const { state } = useLocation();
    const { setUsers } = useOutletContext();
    const navigate = useNavigate();
    const [user, setUser] = useState(state?.editUser);
    const [departments, setDepartments] = useState();

    const [SubmitForm, msg, response] = useSubmitForm({
        data: { adminEmail: state.email, user },
        api: createUser,
    });
    const [SubmitEditForm, editMsg, editResponse] = useSubmitForm({
        data: { adminEmail: state.email, editUserEmail: state?.editUser?.email , user },
        api: editUser,
    });

    useLayoutEffect(() => {
        (async() => {
            try {
                const res = await req.get('/departments')
                setDepartments(res.data.departments)
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])

    useEffect(() => {
        if(state?.editUser?.email){
            return setUsers(editResponse?.users || state.users);
        }
        
        setUsers(response?.users || state.users);
    }, [response, editResponse]);

    function Back() {
        navigate(-1);
    }

    function changeHandler(e) {
        setUser((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    }

    return (
        <form action="" className="abs top-0 full-display">
            <div onClick={Back} className="pointer">
                Back
            </div>
            <h1>
                {
                    state?.editUser?.email 
                    ? 'Edit User'
                    : "Create User"
                }
            </h1>
            <h5>&nbsp;{msg || editMsg}&nbsp;</h5>
            <div>
                <label htmlFor="typeemail">Email</label>
                <input
                    required
                    type="text"
                    name="email"
                    id="typeemail"
                    onChange={changeHandler}
                    value={user?.email || ''}
                />
            </div>
            <div>
                <label htmlFor="phone">Phone</label>
                <input
                    required
                    type="number"
                    name="phone"
                    id="phone"
                    onChange={changeHandler}
                    value={user?.phone || ''}
                />
            </div>
            <div>
                <label htmlFor="phone">Department</label>
                <select name="department" id="department" required onChange={changeHandler}
                    value={user?.department}
                >
                    <option value="">Select</option>
                    {
                        Array.isArray(departments) && departments.map( d => {
                            return (
                                <option key={d.code}>
                                    {d.name}
                                </option>
                            )
                        })
                    }
                </select>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    required
                    type="password"
                    name="password"
                    id="password"
                    onChange={changeHandler}
                    value={user?.password || ''}
                />
            </div>

            {
                state?.editUser?.email 
                ? <button onClick={SubmitEditForm}>Edit User</button>
                : <button onClick={SubmitForm}>Create</button>
            
            }
        </form>
    );
}
