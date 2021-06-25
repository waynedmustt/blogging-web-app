import React from 'react';

const TableBlog = (props) => {
    const {
        error,
        success,
        takeAction,
        blogData
     } = props;
    return (
        <React.Fragment>
            <div className="d-flex flex-column">
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
                <button className="btn btn-lg btn-primary mt-2 w-25 my-3" type="submit"
                onClick={(e) => takeAction(e, 'create', null)}
                style={{marginLeft: 'auto'}}
                >
                <span className="px-2" style={{fontSize: 14}}>+ Create Blog</span>
                </button>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Content</th>
                                <th scope="col">View</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogData?.length === 0 ? 
                            <tr>
                                <td colSpan="4">Data is not available</td>
                            </tr> 
                            : null}
                            {blogData.map((blog, i) => (
                                <tr key={i}>
                                    <td>{blog.title}</td>
                                    <td><div className="truncate-text" style={{width: '50vw'}}>{blog.content}</div></td>
                                    <td>{blog.view}</td>
                                    <td>
                                        <a className="px-1" href="# " onClick={(e) => takeAction(e, 'update', blog)}>Update</a>
                                        <a className="px-1" href="# " onClick={(e) => takeAction(e, 'delete', blog)}>Delete</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    );
}

export default TableBlog;