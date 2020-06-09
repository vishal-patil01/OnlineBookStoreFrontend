import React, {Component} from "react";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";

export default class CustomDialogBox extends Component {

    render() {
        return (
            <Dialog
                fullWidth={true}
                id="mainDialogBox"
                style={{maxWidth: "none"}}
                onClose={this.props.close}
                aria-labelledby="customized-dialog-title"
                open={this.props.isDialogBoxVisible}>
                <DialogContent className="dialogueContent">
                    {this.props.component}
                </DialogContent>
            </Dialog>
        );
    }
}