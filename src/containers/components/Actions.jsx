import { memo } from "react";

import '../style.css';
import ShareIcon from '../../images/share.svg';
import CopyIcon from '../../images/copy.svg';

const navigatorHasShare = navigator.share;
const URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';

const Actions = ({ post, subject }) => {
  const { id, title } = post;

  const shareInfo = () => navigator?.share({
    title: `PWA DIO News - ${subject}`,
    text: title,
    url: URL,
  })

  const copyInfo = () => navigator?.clipboard.writeText(`${title} - *Learn more about in* ${URL}/${subject}/${id}`);

  const renderActions = () => {
    const action = navigatorHasShare ? shareInfo : copyInfo;
    const icon = navigatorHasShare ? ShareIcon : CopyIcon;

    return <img src={icon} alt="icon to action" className="share-icon" onClick={action} />
  };

  return (
    <div className="share">
      {renderActions()}
    </div>
  );
};

export default memo(Actions);
