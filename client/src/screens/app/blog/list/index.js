import React, { useEffect, useState } from 'react';
import BlogListCard from '../../../../components/blog-list';
import {
    getBlogs
} from '../../../../apis/blog';
import { coreService } from '../../../../core/service';

const BlogList = (props) => {
    const { me, history } = props;
    const [blogs, setBlogs] = useState([]);
    
    // eslint-disable-next-line
    useEffect( async () => {
        coreService.scrollUp();
        const blogResponse = await getBlogs();
        if (!blogResponse?.data && blogResponse?.response?.data?.statusCode !== 200) {
            return;
        }

        setBlogs(blogResponse?.data);
        // eslint-disable-next-line
    }, []);
    return (
        <React.Fragment>
            <h1>Welcome, {me?.username}!</h1>
            <h6>Blog Entries:</h6>
            <BlogListCard 
            blogData={blogs}
            history={history}
            />
        </React.Fragment>
    );
}

export default BlogList;