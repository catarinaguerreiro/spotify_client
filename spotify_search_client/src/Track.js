import React from 'react';
import { Card } from 'react-bootstrap';
import _ from 'lodash';
const Track = ({ tracks }) => {
  return (
    <div>
      {Object.keys(tracks).length > 0 && (
        <div className="tracks">
          {tracks.items.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <Card style={{ width: '18rem' }}>
                  <a
                    target="_blank"
                    href={item.external_urls.spotify}
                    rel="noopener noreferrer"
                    className="card-image-link"
                  >
                    {!_.isEmpty(item.album.images) ? (
                      <Card.Img variant="top" src={item.album.images[0].url} alt="" />
                    ) : (
                      <a/>
                    )}
                  </a>
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    
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
export default Track;

