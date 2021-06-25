import React, { useEffect, useState } from 'react';
import { coreService } from '../../../core/service';
import {
    login
} from '../../../apis/auth';

const Login = (props) => {
    const { history } = props;

    const [isSubmitting, setIsSubmitting] = useState(false);

    const formState = {
        username: '',
        password: ''
    };
    const [user, setUser] = useState(formState);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const isLoggedIn = coreService.getItem('isLoggedIn')
        if (isLoggedIn) {
            history.push('/app/blog/list');
        }
        // eslint-disable-next-line
    }, [])

    const submit = async (e) => {
        e.preventDefault();
        setError('');
        if (!user.username || !user.password) {
            setError('fields with * are mandatory');
            return;
        }

        setIsSubmitting(true);
        const response = await login(user);

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
        
        setSuccess('login successfully. Will be redirecting to app...');

        coreService.setItem('accessToken', response?.data.accessToken);
        coreService.setItem('isLoggedIn', true);
        setTimeout(() => {
            setIsSubmitting(false);
            const activeMenu = coreService.getItem('activeMenu');
            window.location.replace(`/app/blog/${activeMenu ?? 'list'}`);
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
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

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
                        {'do not have an account? '} 
                        <a href=" #" onClick={(e) => {
                            e.preventDefault();
                            history.push('/auth/register')
                        }}>
                            Register Now.
                        </a>
                    </label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit"
                    onClick={(e) => submit(e)}
                    disabled={isSubmitting}
                    >Sign in</button>
                </form>
            </main>
        </React.Fragment>
    );
}

export default Login;