import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Gallery = () => {
    const [gallery, setGallery] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/auth/gallery")
            .then((res) => {
                console.log(res.data);
                setGallery(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            <header className="masthead">
                <div className="container-fluid h-100">
                    <div className="row h-100 align-items-center justify-content-center text-center">
                        <div className="col-lg-8 align-self-end mb-4 page-title">
                            <h3 className="text-white">Gallery</h3>
                            <hr className="divider my-4" />

                            <div className="col-md-12 mb-2 justify-content-center">
                            </div>
                        </div>

                    </div>
                </div>
            </header>
            <div className="container-fluid mt-3 pt-2">

                <div className="row-items">
                    <div className="col-lg-12">
                        <div className="row">
                            {gallery.map((g, index) => (
                                <div className="col-md-6 padzero" key={index}>
                                    <div className="card gallery-list"  >
                                        <div className="">
                                            <img src={`http://localhost:3000/${g.image_path}`} style={{ objectFit: "cover" }} className='card-img-top img-fluid galleryimg' alt="img" />
                                        </div>
                                        <div className="card-body">
                                            <div className="row align-items-center justify-content-center text-center h-100">
                                                <div className="">
                                                    <div>
                                                        <span className="truncate" style={{ fontSize: "30px" }}><small>{g.about}</small></span>
                                                        <br />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>))}
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Gallery