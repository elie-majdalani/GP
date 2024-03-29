import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { AddRecord } from "./AddRecord";


export const Modal = (props) => {
  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>

          <div className="modal-body">
            <AddRecord setAdd={props.setAdd} onClose={props.onClose} />
          </div>

        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

