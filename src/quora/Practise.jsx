import React from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';

const ShareComponent = () => {
  const shareUrl = 'http://example.com';
  const title = 'Example Title';

  return (
    <div>
      <FacebookShareButton
        url={shareUrl}
        quote={title}
        className="Demo__some-network__share-button"
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <TwitterShareButton
        url={shareUrl}
        title={title}
        className="Demo__some-network__share-button"
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <LinkedinShareButton
        url={shareUrl}
        windowWidth={750}
        windowHeight={600}
        className="Demo__some-network__share-button"
      >
        <LinkedinIcon size={32} round />
      
      </LinkedinShareButton>
      <WhatsappShareButton
        url={window.location.href}
        windowWidth={750}
        windowHeight={600}
        className="Demo__some-network__share-button"
      >
        <WhatsappIcon size={32} round />
        </WhatsappShareButton>
    </div>
  );
};

export default ShareComponent;