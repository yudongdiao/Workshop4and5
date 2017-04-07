import React from 'react';
import {unixTimeToString} from '../util';
import {Link} from 'react-router';

export default class Comment extends React.Component {
  /**
   * Returns 'true' if the user liked the item.
   * Returns 'false' if the user has not liked the item.
   */
  didUserLike() {
    var likeCounter = this.props.likeCounter;
    var liked = false;
    // Look for a likeCounter entry with userId 4 -- which is the
    // current user.
    for (var i = 0; i < likeCounter.length; i++) {
      if (likeCounter[i]._id === 4) {
        liked = true;
        break;
      }
    }
    return liked;
  }

  handleLikeClick(clickEvent) {
    clickEvent.preventDefault();
    // 0 represents the 'main mouse button' -- typically a left click
    // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
    if (clickEvent.button === 0) {
      this.props.onLikeClick(this.didUserLike());
    }
  }

  render() {
    var likeButtonText = "Like";
    if (this.didUserLike()) {
      likeButtonText = "Unlike";
    }
    return (
      <div>
        <div className="media-left media-top">
          PIC
        </div>
        <div className="media-body">
          <Link to={"/profile/" + this.props.author._id}>{this.props.author.fullName}</Link>{' ' + this.props.children}
          <br /><a href="#" onClick={(e) => this.handleLikeClick(e)}>{likeButtonText}</a> · <a href="#">Reply</a> ·
            {' ' + unixTimeToString(this.props.postDate)} ·
            <a href="#">{' ' + this.props.likeCounter.length} people</a> like this
        </div>
      </div>
    )
  }
}
