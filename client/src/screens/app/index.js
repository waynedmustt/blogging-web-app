import React, { Suspense, useEffect, useState } from 'react';
import {
    Route,
    Switch,
    Redirect
  } from 'react-router-dom';
import AppLayout from '../../components/app-layout';
import {
    getMe
} from '../../apis/user';
import { coreService } from '../../core/service';

const BlogList = React.lazy(() =>
  import(/* webpackChunkName: "app-blog-list" */ './blog/list')
);
const BlogManage = React.lazy(() =>
  import(/* webpackChunkName: "app-blog-manage" */ './blog/manage')
);
const BlogDetail = React.lazy(() =>
  import(/* webpackChunkName: "app-blog-detail" */ './blog/detail')
);
const App = ({ match, history }) => {

    const [me, setMe] = useState()

    // eslint-disable-next-line
    useEffect(async () => {
        if (!coreService.getItem('isLoggedIn')) {
            history.push('/auth/login');
            return;
        }

        const meResponse = await getMe();
        if (!meResponse?.data && meResponse?.response?.data?.statusCode !== 200) {
            return;
        }
        setMe(meResponse?.data);
        // eslint-disable-next-line
    }, [])

    return (
        <AppLayout
        >
            <div className="container blog-container pt-5-3">
                <Suspense fallback={<div>Loading ...</div>}>
                    <Switch>
                        <Redirect exact from={`${match.url}/`} to={`${match.url}/blog/list`} />
                        <Route
                            path={`${match.url}/blog/list`}
                            render={props => <BlogList {...props} me={me} />}
                        />
                        <Route
                            path={`${match.url}/blog/manage`}
                            render={props => <BlogManage {...props} me={me} />}
                        />
                        <Route
                            path={`${match.url}/blog/detail/:blogCode`}
                            render={props => <BlogDetail {...props} me={me} />}
                        />
                        <Redirect to="/error" />
                    </Switch>
                </Suspense>
            </div>
        </AppLayout>
    );
}

export default App;