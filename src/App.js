import React, {Component} from 'react';

// Components
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';

// const url = "http://localhost:3000";
const url = "https://serene-spire-22376.herokuapp.com";

const initialState = {
  input: '',
  imageUrl: '',
  box: [{}],
  route: 'signin',
  isSignedIn: localStorage.getItem('isSignedIn') || false,
  disableFind: true,
  user: JSON.parse(localStorage.getItem('user')) || {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    institution: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {

  // Constructor
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id : data.id,
      first_name : data.first_name,
      last_name : data.last_name,
      email : data.email,
      institution : data.institution,
      entries : data.entries,
      joined : data.joined
    }});
    localStorage.setItem('user', JSON.stringify(this.state.user))
  }

  calculateFaceLocation = (data) => {
    if (data === -1 || Object.keys(data.outputs[0].data).length === 0) { return []; }

    var a = data.outputs[0].data.regions;
    var faces = [];

    for (var i = 0; i < a.length; i++) {
      faces.push(a[i].region_info.bounding_box);
    }

    var image = document.getElementById("inputimage");
    var width = Number(image.width);
    var height = Number(image.height);

    var boxes = faces.map(s => {
      return {
        leftCol: s.left_col * width,
        topRow: s.top_row * height,
        rightCol: width - (s.right_col * width),
        bottomRow: height - (s.bottom_row * height)
      }
    });
    return boxes;
  }

  displayFaceBox = (box) => {
    this.setState({box: box || []});
  }

  onInputChange = (event) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const formData = new FormData();
      files.forEach((file, i) => {
        formData.append(i, file)        
      })
      fetch(`${url}/image-upload`, {
        method: 'POST',
        body: formData
      })
        .then(res => res.json())
        .then(images => {
          this.setState({ input: images[0].url, disableFind: false});
        })
    } else {
      this.setState({input: event.target.value, disableFind: false});
    }
    this.setState({ box: [{}] });
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch(url + '/imageurl', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch(url + '/image', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onInputClear = () => {
    this.setState({input: '', box: [{}], disableFind: false});
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState(initialState)
      localStorage.removeItem('isSignedIn');
    } else if (route === 'home') {
        this.setState({isSignedIn: true})
        localStorage.setItem('isSignedIn', true)
    }
    this.setState({route: route});
  }
    
  render() {
    const { input, isSignedIn, route, box, disableFind } = this.state;
    return(
      <div className="App">
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
      {route === 'home' 
        ? <div>
            <ImageLinkForm 
              input={input}
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit}
              disableFind={disableFind}
              onInputClear={this.onInputClear}
              first_name={this.state.user.first_name}
              entries={this.state.user.entries}
              box={box}
              imageUrl={input}
            />
          </div>
        : (
            route === 'signin' || route === 'signout'
            ? <Signin 
                loadUser={this.loadUser} 
                onRouteChange={this.onRouteChange}
                url = {url}
              />
            : <Register 
                loadUser={this.loadUser} 
                onRouteChange={this.onRouteChange} 
                url = {url}
              />
          ) 
      }
    </div>
    );
  }
}

export default App;