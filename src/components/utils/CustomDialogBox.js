import React, {Component} from "react";
import DialogContent from "@material-ui/core/DialogContent";
import Signup from "../user/Signup";
import Dialog from "@material-ui/core/Dialog";

export default class CustomDialogBox extends Component {

    closeDialog = () => {
        this.props.close();
    }

    render() {
        return (
            <Dialog
                fullWidth={true}
                id="mainDialogBox"
                style={{maxWidth: "none"}}
                onClose={this.closeDialog}
                aria-labelledby="customized-dialog-title"
                open={this.props.isDialogBoxVisible}>
                <DialogContent className="dialogueContent">
                    <Signup closeDialog={this.closeDialog}/>
                </DialogContent>
            </Dialog>
        );
    }
}