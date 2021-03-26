//recentlyInfo

import React, { Component } from 'react';
import _ from 'lodash';
import RecentTracks from './RecentTracks';


class  FirstInfo extends Component{

  constructor(props){
    super(props);

    this.state={
        token: this.props.token,
        albums: "",
        artists: "",
        tracks: "",
        recent_tracks: "",
        selectedCategory: "albums"

    };
  }


    //const {recent_tracks } = props;

    render (){
      return (
          <div >
            {recent_tracks && <RecentTracks items={recent_tracks} />}
          </div>
      );

    }
};
export default FirstInfo;

