import React, {Component} from 'react'
import {DropzoneArea} from 'material-ui-dropzone'
import "../../css/AddBook.css"

class DropzoneAreaExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: []
        };
    }

    handleChange(files) {
        this.setState({
            files: files
        });
    }

    render() {
        return (
            <DropzoneArea filesLimit={1} acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                          showPreviews={true}
                          maxFileSize={5000000}
                          dropzoneText="Select Or Drop Image Here"
                          showFileNames
                          dropzoneClass="tp"
                          onChange={this.handleChange.bind(this)}
            />
        )
    }
}

export default DropzoneAreaExample;