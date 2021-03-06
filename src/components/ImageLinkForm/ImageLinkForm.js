import React from 'react';

// CSS
import './ImageLinkForm.css';

class ImageLinkForm extends React.Component {

	// Constructor
	constructor(props) {
		super(props);
		this.state = {
			showFileChooser: false
		};
	}

	onClickShowFileChooser = (event) => {
		this.setState({ showFileChooser: true });
	}

	onClickShowUrl = (event) => {
		this.setState({ showFileChooser: false });
	}

	render() {
		const { onInputChange, onButtonSubmit, input, onInputClear, first_name, entries, imageUrl, box } = this.props;
		return (

			<div className="card-wrap">
				<div class="card card-image1">
					<div>
						<p>COPY URL / UPLOAD FILE</p>
						<div>
							<div>
								<div className="button-wrapper">
									<div className="url-wrapper" onClick={this.onClickShowUrl}>
										<img src="./images/UrlBtn.png" alt=""/>
										<p className="urlText">URL</p>
									</div>

									<div className="upload-wrapper" onClick={this.onClickShowFileChooser}>
										<img src="./images/UploadBtn.png" alt=""/>
										<p className="uploadText">UPLOAD</p>
									</div>
								</div>

								{this.state.showFileChooser ?

									<div className="uploadLocal">
										<label style={{color: "white", margin: "30px 20px 0px 20px"}}>Choose a file</label>
										<input
											style={{margin: "15px 20px 30px 20px"}}
											type="file" 
											id="image" 
											name="image" 
											accept="image/*" 
											onChange={onInputChange} 
										/>
									</div>
									: 
									<div>
										<input 
											type="text"
											className='textInput'
											value={input}
											onChange={onInputChange}
											onCut={onInputChange}
											onPaste={onInputChange}
											onInput={onInputChange} 
											placeholder="Enter your URL" />
									</div>
									}
								<div className="detect-btn">
									<button id="button-detect" onClick={onButtonSubmit}>Detect Face</button>
									<button id="button-clear" onClick={onInputClear}>Clear</button>
								</div>
							</div>
						</div>

						<div className="rank">
							<div className="info" style={{textAlign: "center", fontSize:"20px"}}>
								{`Hey ${first_name}, your current rank is :  `}
							</div>
							<div className="entries" style={{textAlign: "center", fontSize:"40px"}}>
								{entries}
							</div>
						</div>

					</div>
				</div>

				<div className="card card-image2">
					<p>RESULT</p>
					<div className="wrapper">
						<img className="wrapper-img" id="inputimage" alt='' src={imageUrl} width="500px" height="auto"/>
						{
							box.length === 0 
							? <p>No human faces found!</p>
							: box.map( (s, i) => {
								return (<div key={"div_face_" + i} className="bounding-box"
										style={{top: s.topRow, 
														right: s.rightCol, 
														bottom: s.bottomRow,
														left: s.leftCol
										}}
								></div>);
							})
						}
					</div>
				</div>

			</div>

			
		);
	}
}

export default ImageLinkForm;