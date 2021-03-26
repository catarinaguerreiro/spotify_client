import { Component } from 'react';
import $ from "jquery";
import Header from './Header';
import HeaderRecently from './HeaderRecently';
import RecentTracks from './RecentTracks';
import SearchForm from './SearchForm';
import SearchResult from './SearchResult';
import { Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route,Switch, Redirect} from 'react-router-dom'

class Dashboard extends Component {

    constructor(props){
        super(props);
    
        this.state={
            token: props.token,
            albums: "",
            artists: "",
            tracks: "",
            selectedCategory: "albums"
    
        };
    }


      setCategory = (category) => {

        this.setState({
            selectedCategory: category
        });
      };

  
      
      handleSearch = (searchTerm) => {
          
          this.initiateGetResult(this.state.token,searchTerm);
      };


    //API METHODS
    initiateGetResult(token, searchTerm) {
        // Make a call using the token
        $.ajax({
          url: `https://api.spotify.com/v1/search?query=${encodeURIComponent(searchTerm)}&type=album,track,artist`,
          type: "GET",
          beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
          },
          success: (data) => {
            this.setState({
                albums: data.albums,
                artists: data.artists,
                tracks: data.tracks
            });
            this.setCategory('albums'); 
          }
        });
    }

    
    
    
    goToRecentTracks = () => {
        this.props.history.push('/recentTracks');
    }

    render(){
        const { albums, artists, tracks, recent_tracks } = this.props;
        const result = { albums:this.state.albums, artists:this.state.artists, tracks:this.state.tracks };
  
          return (
              <div>
                  <div>
                    <Header />
                    <SearchForm handleSearch={this.handleSearch} />
                    <SearchResult
                      result={result}
                      setCategory={this.setCategory}
                      selectedCategory={this.state.selectedCategory}
                    />
                  </div>
                  <div>

                    <Button color="primary" className="px-4"
                        onClick={this.goToRecentTracks}
                    >
                        Click to see what you have listen 
                    </Button>
                    <Route path="/recentTracks" component={ () => <RecentTracks token={this.state.token}/> }/>
                      
                  </div>
                </div>
          );
    }
  
    
};




  export default () => (
    <div>
        <Router>
            <Route component={Dashboard} />
        </Router>
    </div>

  );

  /*

<HeaderRecently/>
                      <RecentTracks 
                          recent_tracks = {this.state.recent_tracks}
                      />
  */