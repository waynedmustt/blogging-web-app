import React from 'react';

const BlogListCard = (props) => {
    const { blogData, history } = props;
    return (
        <React.Fragment>
            {blogData?.length === 0 ? <h1>Oops .., you have an empty blog.</h1> : null}
            {blogData?.map((blog, i) => (
                <div key={i} className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
                    <div className="col-md-6 px-0">
                    <h1 className="display-4 fst-italic">{blog.title}</h1>
                    <p className="lead my-3 truncate-text">{blog.content}</p>
                    <p className="lead mb-0"><a href="# " className="text-white fw-bold"
                    onClick={(e) => {
                        e.preventDefault();
                        history.push(`/app/blog/detail/${blog.code}`)
                    }}
                    >Continue reading...</a></p>
                    </div>
                </div>
            ))}
        </React.Fragment>
    );
}

export default BlogListCard;