import React from 'react';
import { SiGooglehangoutschat as Logo } from 'react-icons/si';
import Card from '@material-ui/core/Card';

export default function Alert({ friendsNumber }) {
  return (
    <div className="alert">
      <Card className="alert__content">
        <h2 className="header-secondary">Alert</h2>
        <hr />
        <Logo className="alert__logo" />
        {friendsNumber < 3 ? (
          <>
            <p>
              Problem:{' '}
              {friendsNumber > 0 && friendsNumber < 4
                ? `You just have ${friendsNumber} `
                : `You have no `}
              {friendsNumber === 1 ? 'friend' : 'friends'}
            </p>
            {friendsNumber < 4 && (
              <p>
                Need to win some friends go to this{' '}
                <a
                  target="_blank"
                  href="https://www.wikihow.com/Make-Friends"
                  rel="noreferrer"
                >
                  ARTICLE
                </a>
              </p>
            )}
          </>
        ) : null}
        <p>Please select any chat</p>
      </Card>
    </div>
  );
}
