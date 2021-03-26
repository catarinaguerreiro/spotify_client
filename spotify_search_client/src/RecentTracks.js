import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import _ from 'lodash';
import $ from "jquery";


class RecentTracks extends Component{

    constructor(props){
        super(props);
    
        this.state={
            token: this.props.token,
            recent_tracks: {}
    
        };
    }
    

    
    componentDidMount() {
        this.getRecentTracks(this.state.token) ;
    }


    getRecentTracks(token) {
        $.ajax({
          url: "https://api.spotify.com/v1/me/player/recently-played?limit=4",
          type: "GET",
          beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
          },
          success: (data) => {
              
            this.setState({
                recent_tracks: data.items
            });
            
           //return data.items;
          }
        });
    }


    render(){
        return (
            <div>
            
                {Object.keys(this.state.recent_tracks).length > 0 && (
                    <div className="tracks">
                    {this.state.recent_tracks.map((item, index) => {
                        return (
                        <React.Fragment key={index}>
                            <Card style={{ width: '18rem' }}>
                            <a
                                target="_blank"
                                href={item.track.external_urls.spotify}
                                rel="noopener noreferrer"
                                className="card-image-link"
                            >

                                {!_.isEmpty(item.track.album.images) ? (
                                    <Card.Img
                                        variant="top"
                                        src={item.track.album.images[0].url}
                                        alt=""
                                    />
                                ) : (
                                    <a/>
                                )}
                            </a>
                            <Card.Body>
                                <Card.Title>{item.track.name}</Card.Title>
                                
                            </Card.Body>
                            </Card>
                        </React.Fragment>
                        );
                    })}
                    </div>
                )}
            </div>
        );
    };

}

export default RecentTracks;

