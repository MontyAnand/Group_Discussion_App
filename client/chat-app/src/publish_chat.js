import React, { useEffect, useState } from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBBtn,
    MDBTypography,
    MDBTextArea,
    MDBCardHeader,
} from "mdb-react-ui-kit";

function publish_chat({ messageList }) {
    return (
        <MDBTypography listUnStyled className="text-white">
            {messageList.map((messageContent) => {
                return (
                    <li className="d-flex justify-content-between mb-4">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                            alt="avatar"
                            className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                            width="60"
                        />
                        <MDBCard className="mask-custom">
                            <MDBCardHeader
                                className="d-flex justify-content-between p-3"
                                style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                            >
                                <p className="fw-bold mb-0">{messageContent.author}</p>
                                <h5>&#160;&#160;&#160;</h5>
                                <p className="text-light small mb-0">
                                    <MDBIcon far icon="clock" /> {messageContent.time}
                                </p>
                            </MDBCardHeader>
                            <MDBCardBody>
                                <p className="mb-0">
                                    {messageContent.message}
                                </p>
                            </MDBCardBody>
                        </MDBCard>
                    </li>
                )
            })}
        </MDBTypography>
    );
}

export default publish_chat;


