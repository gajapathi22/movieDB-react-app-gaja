import { Modal,show, Container, Row, Col} from 'react-bootstrap';
import React, {useState} from 'react';
const API_IMG="https://image.tmdb.org/t/p/w500/";

const MovieBox =({title, poster_path, vote_average, release_date, overview})=>{
    
    const [show, setShow]=useState(false);

    const handleShow=()=>setShow(true);
    const handleClose=()=>setShow(false);
    
    return(
        <div className="card text-center bg-white mb-3">
            <div className="card-body position-relative">
              <div style={{position:'absolute',backgroundColor:'white',borderRadius:'50%',margin:'2px',border:' 2px solid black'}}>
                <p style={{color:'black'}}>{vote_average}</p>
              </div>
              <img className="card-img-top" src={API_IMG+poster_path} />
              <div className="card-body">
                  <button type="button" className="btn btn-white" onClick={handleShow} >{title}</button>
                  <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title><h3>{title}</h3></Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                      <Container>
                        <Row>
                            <Col>
                            <img className="card-img-top" style={{width:'14rem',float:'left'}}src={API_IMG+poster_path} />
                            </Col>
                            <Col>
                            <h6>Release Date: {release_date}</h6>
                            <br></br>
                            <p style={{fontSize:'12px'}}>{overview}</p>
                            <h6>{vote_average}</h6>
                            </Col>
                        </Row>
                      </Container>
                      </Modal.Body>
                      
                  </Modal>
              </div>
            </div>
        </div>
    )
}

export default MovieBox;