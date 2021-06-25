import React, { useEffect, useState } from 'react';
import { 
    getBlogs,
    deleteBlog,
    createOrUpdateBlog 
} from '../../../../apis/blog';
import Modal from '../../../../components/modal';
import TableBlog from '../../../../components/table-blog';
import { coreService } from '../../../../core/service';

const BlogManage = (props) => {
    const { me } = props;
    const [blogs, setBlogs] = useState([]);
    const [opendialogForm, setOpenDialogForm] = useState(false);
    const [currentAction, setCurrentAction] = useState('');
    const [selectedBlog, setSelectedBlog] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [reloading, setReloading] = useState(false);
    const formState = {
        title: '',
        content: ''
    };
    const [blogForm, setBlogForm] = useState(formState);

    // eslint-disable-next-line
    useEffect(() => {
        coreService.scrollUp();
        callGetBlogs();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (!reloading) {
            return;
        }

        callGetBlogs();
        setReloading(false);
        // eslint-disable-next-line
    }, [reloading])

    const callGetBlogs = async () => {
        const blogResponse = await getBlogs();
        if (!blogResponse?.data && blogResponse?.response?.data?.statusCode !== 200) {
            return;
        }

        setBlogs(blogResponse?.data);
    }

    const reset = () => {
        setOpenDialogForm(false);
        setSelectedBlog({});
        setIsSubmitting(false);
        setCurrentAction('');
        setTimeout(() => {
            setError('');
            setSuccess('');
        }, 2000)
    }

    const renderModalBody = () => {
        return (
            <React.Fragment>
                {error ? 
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div> : null
                }
                <form>
                    <div className="mb-3">
                        <label className="col-form-label">Title: <span className="required"></span></label>
                        <input type="text" className="form-control"
                        value={blogForm['title']}
                        onChange={(e) => setBlogForm({
                            ...blogForm, title: e.target.value
                        })}
                        disabled={isSubmitting}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label">Content: <span className="required"></span></label>
                        <textarea className="form-control"
                        value={blogForm['content']}
                        onChange={(e) => setBlogForm({
                            ...blogForm, content: e.target.value
                        })}
                        style={{resize: 'none', height: '15vh'}}
                        disabled={isSubmitting}
                        ></textarea>
                    </div>
                </form>
            </React.Fragment>
        );
    }

    const renderModalFooter = () => {
        return (
            <React.Fragment>
                <button type="button" className="btn btn-secondary" // eslint-disable-next-line
                data-bs-dismiss="modal" onClick={e => setOpenDialogForm(false)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={e => submit(e)}>
                    <span style={{textTransform: 'capitalize'}}>{currentAction}</span>
                </button>
            </React.Fragment>
        );
    }

    const submit = async (e) => {
        e.preventDefault();
        setError('');
        if (!blogForm.title || !blogForm.content) {
            setError('fields with * are mandatory');
            return;
        }

        const payload = {
            ...blogForm,
            status: 'active',
            user: {
                id: me?.id
            }
        }
        setIsSubmitting(true);
        const response = await createOrUpdateBlog(payload, selectedBlog?.code);

        if (!response) {
            setIsSubmitting(false);
            setError('something wrong when blog submission!');
            return;
        }
    
        if (!response?.data && response?.response?.data?.statusCode !== 200) {
            setIsSubmitting(false);
            setError(response?.response?.data?.message);
            return;
        }

        setSuccess(`successfully ${currentAction}d blog.`);
        setReloading(true);
        reset();
    }

    const deleteBlogAction = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        setError('');
        const deleteBlogResponse = await deleteBlog(selectedBlog?.id);
        if (!deleteBlogResponse?.data && deleteBlogResponse?.response?.data?.statusCode !== 200) {
            setError(deleteBlogResponse?.response?.data?.message);
            return;
        }

        setSuccess('successfully deleted blog.');
        setReloading(true);
        reset();
    }

    const takeAction = (e, action, blog) => {
        e.preventDefault();
        setOpenDialogForm(true);
        setBlogForm({
            title: '',
            content: ''
        });
        if (blog) {
            setSelectedBlog(blog);
        }
        if (action === 'update' && blog) {
            setBlogForm({
                title: blog.title,
                content: blog.content
            });
        }
        setCurrentAction(action);
    }

    return (
        <React.Fragment>
            <TableBlog 
            error={error}
            success={success}
            takeAction={takeAction}
            blogData={blogs}
            />
            <Modal
                id="BlogDialogModal"
                title={`${currentAction} Blog`}
                isOpen={opendialogForm}
                setIsOpen={setOpenDialogForm}
                renderBody={currentAction === 'delete' ? () => (
                    <p>Are you sure you want to delete 
                        <span style={{fontWeight: 700}}>{' ' + selectedBlog?.title}</span> ? 
                    </p>
                ) : renderModalBody}
                renderFooter={currentAction === 'delete' ? () => (
                    <React.Fragment>
                        <button type="button" className="btn btn-secondary" // eslint-disable-next-line
                        data-bs-dismiss="modal" 
                        onClick={e => setOpenDialogForm(false)}
                        disabled={isSubmitting}
                        >Cancel</button>
                        <button type="button" className="btn btn-danger" 
                        onClick={e => deleteBlogAction(e)}
                        disabled={isSubmitting}
                        >Delete</button>
                    </React.Fragment>
                ) : renderModalFooter}
                options={{
                    disabled: isSubmitting
                }}
            />
        </React.Fragment>
    );
}

export default BlogManage;