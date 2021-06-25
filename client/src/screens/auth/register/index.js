import React, { useEffect, useState } from 'react';
import {
    getRole
} from '../../../apis/role';
import {
    register
} from '../../../apis/auth';
import { coreService } from '../../../core/service';

const Register = (props) => {
    const { history } = props;

    const [isSubmitting, setIsSubmitting] = useState(false);

    const formState = {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
    };
    const [user, setUser] = useState(formState);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [roles, setRoles] = useState([]);

    // eslint-disable-next-line
    useEffect(async () => {
        const rolesResponse = await getRole();
        if (!rolesResponse?.data && rolesResponse?.response?.data?.statusCode !== 200) {
            setError(rolesResponse?.response?.data?.message);
            return;
        }
        setRoles(rolesResponse?.data);
        // eslint-disable-next-line
    }, [])

    const submit = async (e) => {
        e.preventDefault();
        setError('');
        if (!user.username 
            || !user.password
            || !user.firstName
            || !user.lastName) {
            setError('fields with * are is mandatory');
            return;
        }

        const payload = {
            ...user,
            isActive: true,
            role: {
                id: roles[0]?.id
            }
        };
        setIsSubmitting(true);
        const response = await register(payload);

        if (!response) {
            setIsSubmitting(false);
            setError('wrong username or password!');
            return;
        }
    
        if (!response?.data && response?.response?.data?.statusCode !== 200) {
            setIsSubmitting(false);
            setError(response?.response?.data?.message);
            return;
        }
        
        setSuccess('Registration successfully. Will be redirecting to login page...');

        coreService.removeItem('isLoggedIn')
        coreService.removeItem('accessToken')
        setTimeout(() => {
            setIsSubmitting(false);
            window.location.replace('/auth/login');
        }, 2000)
    }
    return (
        <React.Fragment>
            <main className="form-signin">
                {error ? 
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div> : null
                }
                {success ? 
                    <div className="alert alert-success" role="alert">
                        {success}
                    </div> : null
                }
                <form>
                    <h1 className="h3 mb-3 fw-normal">Please Register</h1>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="firstName" placeholder="First Name" 
                        value={user['firstName']}
                        onChange={(e) => setUser({
                            ...user, firstName: e.target.value
                        })}
                        disabled={isSubmitting}
                        />
                        <label htmlFor="firstName">First Name <span className="required"></span></label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="lastName" placeholder="Last Name" 
                        value={user['lastName']}
                        onChange={(e) => setUser({
                            ...user, lastName: e.target.value
                        })}
                        disabled={isSubmitting}
                        />
                        <label htmlFor="password">Last Name <span className="required"></span></label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="username" placeholder="Username" 
                        value={user['username']}
                        onChange={(e) => setUser({
                            ...user, username: e.target.value
                        })}
                        disabled={isSubmitting}
                        />
                        <label htmlFor="username">Username <span className="required"></span></label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="password" placeholder="Password" 
                        value={user['password']}
                        onChange={(e) => setUser({
                            ...user, password: e.target.value
                        })}
                        disabled={isSubmitting}
                        />
                        <label htmlFor="password">Password <span className="required"></span></label>
                    </div>
                    <div className="checkbox mb-3">
                    <label>
                        {'already have an account? '} 
                        <a href=" #" onClick={(e) => {
                            e.preventDefault();
                            history.push('/auth/login')
                        }}>
                            Login Now.
                        </a>
                    </label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit"
                    onClick={(e) => submit(e)}
                    disabled={isSubmitting}
                    >Register</button>
                </form>
            </main>
        </React.Fragment>
    );
}

export default Register;