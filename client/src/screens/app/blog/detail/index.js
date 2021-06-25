import React, { useEffect, useState } from 'react';
import {
    getBlogByCode,
    updateViewBlog
} from '../../../../apis/blog';
import {
    sendComment
} from '../../../../apis/comment';
import { coreService } from '../../../../core/service';
import { useParams } from 'react-router-dom';

const BlogDetail = (props) => {
    const { me } = props;
    let { blogCode } = useParams();
    const [blog, setBlog] = useState({});
    const [error, setError] = useState(false);
    const [notAvailable, setNotAvailable] = useState(false);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [reloading, setReloading] = useState(false);
    const [success, setSuccess] = useState('');

    // eslint-disable-next-line
    useEffect(() => {
        coreService.scrollUp();
        callGetBlog(true);
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (!reloading) {
            return;
        }

        callGetBlog(false);
        setReloading(false);
        // eslint-disable-next-line
    }, [reloading])

    const callUpdateViewBlog = async (view) => {
        const payload = {
            view: view + 1
        }
        const updateViewBlogResponse = await updateViewBlog(blogCode, payload);
        if (!updateViewBlogResponse?.data && updateViewBlogResponse?.response?.data?.statusCode !== 200) {
            setNotAvailable(true);
            return;
        }

        setReloading(true);
    }

    const callGetBlog = async (isFirstTime) => {
        const blogResponse = await getBlogByCode(blogCode);
        if (!blogResponse?.data && blogResponse?.response?.data?.statusCode !== 200) {
            return;
        }

        if (blogResponse?.data?.length === 0) {
            setNotAvailable(true);
            return;
        }

        if (isFirstTime) {
            callUpdateViewBlog(blogResponse?.data[0].view);
            return;
        }

        setBlog(blogResponse?.data[0]);
    }

    const parseDate = (date) => {
        const parsedDate = Date.parse(date);
        const newDate = new Date(parsedDate).toDateString();
        return newDate;
    }

    const submit = async (e) => {
        e.preventDefault();
        setError('');
        if (!comment) {
            setError('please leave the comment');
            return;
        }

        const payload = {
            comment: comment,
            user: {
                id: me?.id
            },
            blog: {
                id: blog?.id
            }
        }

        setIsSubmitting(true);
        const response = await sendComment(payload)
        if (!response?.data && response?.response?.data?.statusCode !== 200) {
            setIsSubmitting(false);
            setError(response?.response?.data?.message);
            return;
        }

        setComment('');
        setIsSubmitting(false);
        setSuccess(response?.data?.message);
        setReloading(true);
    }

    return (
        <React.Fragment>
            {notAvailable ? 
                <h1>Blog might be deleted or moved.</h1> : null
            }
            {!coreService.isEmptyObject(blog) ?
            <React.Fragment>
                <article className="blog-post">
                    <h2 className="blog-post-title">{blog.title}</h2>
                    <p className="blog-post-meta">{parseDate(blog.createdAt)} by <a href="# ">{blog?.user?.username}</a></p>
                    <h6 style={{fontStyle: 'italic'}}>{`this article is viewed ${blog.view} ${blog.view > 1 ? 'times' : 'time'}`}</h6>
                    <p>{blog.content}</p>
                </article>
                <article className="blog-post mt-5 mb-5">
                    <h3>Leave a Comment</h3>
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
                        <div className="form-floating">
                            <textarea className="form-control" id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            disabled={isSubmitting}
                            style={{resize: 'none', height: '30vh'}}
                            ></textarea>
                            <label htmlFor="comment">Comment <span className="required"></span></label>
                        </div>
                        <button className="btn btn-lg btn-primary mt-2" type="submit"
                        onClick={(e) => submit(e)}
                        disabled={isSubmitting}
                        style={{float: 'right'}}
                        >Send</button>
                    </form>
                </article>
                {!reloading ? 
                <article className="blog-post">
                    <h3>Comments</h3>
                    {blog?.comment?.length === 0 ?
                    <p>No comment here yet.</p> 
                    :
                    blog.comment.map((data, id) => (
                        <React.Fragment key={id}>
                            <div className="p-3 bg-light rounded-3 mt-3 mb-3" style={{minHeight: '15vh'}}>
                                <h6>From: {data?.user?.username}</h6>
                                <span style={{fontSize: 10}}>On {parseDate(data?.createdAt)}</span>
                                <p style={{fontStyle: 'italic'}}>{data.comment}</p>
                            </div>
                        </React.Fragment>
                    ))
                    }
                </article> : 'Loading Comment ...'
                }
            </React.Fragment>
            : 'Loading Blog ...'
            }
        </React.Fragment>
    );
}

export default BlogDetail;